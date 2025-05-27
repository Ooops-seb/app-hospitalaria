/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { useParams } from "next/navigation";
import {
  obtenerFacturaById,
  facturar,
  actualizarFactura,
} from "@/lib/api/facturas";

const getServiceTypeColor = (tipo: string) => {
  const colors = {
    examen: "bg-blue-100 text-blue-800",
    imagen: "bg-green-100 text-green-800",
    atencion: "bg-purple-100 text-purple-800",
    procedimiento: "bg-red-100 text-red-800",
    suministro: "bg-yellow-100 text-yellow-800",
    servicio: "bg-gray-100 text-gray-800",
  };
  return colors[tipo as keyof typeof colors] || colors.servicio;
};

const calculateAge = (fechaNacimiento: string) => {
  const today = new Date();
  const birthDate = new Date(fechaNacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export default function FacturaDetail() {
  const params = useParams();
  const facturaId = Number(params.id);
  const [factura, setFactura] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [facturaModalOpen, setFacturaModalOpen] = useState(false);
  const [facturaLoading, setFacturaLoading] = useState(false);
  const [editLineas, setEditLineas] = useState<any[]>([]);
  const [successModal, setSuccessModal] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    if (!facturaId || isNaN(facturaId)) return;
    setLoading(true);
    obtenerFacturaById(facturaId)
      .then((data) => {
        setFactura(data);
        setEditLineas(
          (data.lineas || []).map((l: any) => ({
            ...l,
            cantidad: l.cantidad ?? 1,
            iva: l.iva ?? 0,
            descuento: l.descuento ?? 0,
          })),
        );
      })
      .catch((err) => {
        setErrorModal({
          open: true,
          message: err?.message || "Error al cargar factura",
        });
      })
      .finally(() => setLoading(false));
  }, [facturaId]);

  const calcularTotal = (lineas: any[]) => {
    return lineas
      .reduce((acc, l) => acc + Number(calcularSubtotal(l)), 0)
      .toFixed(2);
  };

  const handleFacturar = async () => {
    setFacturaLoading(true);
    try {
      await facturar(facturaId);
      setFacturaModalOpen(false);
      const data = await obtenerFacturaById(facturaId);
      setFactura({ ...data, total: calcularTotal(data.lineas || []) });
      setSuccessModal({
        open: true,
        message: "Factura facturada correctamente",
      });
    } catch (error: any) {
      setErrorModal({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error al facturar",
      });
    } finally {
      setFacturaLoading(false);
    }
  };

  const handleLineaChange = (index: number, field: string, value: number) => {
    setEditLineas((prev) =>
      prev.map((linea, i) =>
        i === index ? { ...linea, [field]: value } : linea,
      ),
    );
  };

  const calcularSubtotal = (linea: any) => {
    const precio = linea.servicio?.precio ?? linea.producto?.precio ?? 0;
    const cantidad = Number(linea.cantidad) || 1;
    const iva = Number(linea.iva) || 0;
    const descuento = Number(linea.descuento) || 0;
    return ((precio * (1 + iva / 100) - descuento) * cantidad).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalCalculado = editLineas
      .reduce((acc, l) => acc + Number(calcularSubtotal(l)), 0)
      .toFixed(2);
    const updated = {
      fecha: factura.fecha,
      direccion: factura.direccion,
      cliente: factura.cliente,
      paciente_id: factura.paciente?.id,
      total: totalCalculado,
      lineas: editLineas.map((l) => ({
        id: l.id,
        cantidad: l.cantidad,
        iva: l.iva,
        descuento: l.descuento,
        subtotal: calcularSubtotal(l),
        servicio_id: l.servicio?.id,
        producto_id: l.producto?.id,
        nota_venta: l.nota_venta || "",
        estado: l.estado,
      })),
    };
    try {
      await actualizarFactura(facturaId, updated);
      // Refrescar datos
      const data = await obtenerFacturaById(facturaId);
      setFactura({ ...data, total: calcularTotal(data.lineas || []) });
      setEditLineas(
        (data.lineas || []).map((l: any) => ({
          ...l,
          cantidad: l.cantidad ?? 1,
          iva: l.iva ?? 0,
          descuento: l.descuento ?? 0,
        })),
      );
      setSuccessModal({
        open: true,
        message: "Factura actualizada correctamente",
      });
    } catch (error) {
      let msg = "Error al actualizar factura";
      if (typeof error === "object" && error !== null) {
        if (
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
        ) {
          msg = String(error.response.data.message);
        } else if ("message" in error) {
          msg = String((error as any).message);
        }
      }
      setErrorModal({ open: true, message: msg });
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando factura...</div>;
  }
  if (!factura) {
    return <div className="p-8 text-center">Factura no encontrada</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Success Modal */}
      <Sheet
        open={successModal.open}
        onOpenChange={(open) => setSuccessModal((v) => ({ ...v, open }))}
      >
        <SheetContent className="max-w-md w-full">
          <SheetHeader>
            <SheetTitle>Éxito</SheetTitle>
            <SheetDescription>{successModal.message}</SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-6 flex gap-2">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cerrar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* Error Modal */}
      <Sheet
        open={errorModal.open}
        onOpenChange={(open) => setErrorModal((v) => ({ ...v, open }))}
      >
        <SheetContent className="max-w-md w-full">
          <SheetHeader>
            <SheetTitle>Error</SheetTitle>
            <SheetDescription>{errorModal.message}</SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-6 flex gap-2">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cerrar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* Botón Facturar */}
      <div className="mb-4">
        <Sheet open={facturaModalOpen} onOpenChange={setFacturaModalOpen}>
          <SheetTrigger asChild>
            <Button type="button" variant="secondary">
              Facturar
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="max-w-md w-full">
            <SheetHeader>
              <SheetTitle>Confirmar facturación</SheetTitle>
              <SheetDescription>
                ¿Está seguro que desea facturar esta factura?
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="mt-6 flex gap-2">
              <Button
                type="button"
                onClick={handleFacturar}
                disabled={facturaLoading}
              >
                {facturaLoading ? "Facturando..." : "Confirmar"}
              </Button>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalle de Factura</CardTitle>
          <CardDescription>
            Visualiza la información y líneas de la factura
          </CardDescription>
          <div className="mt-2 flex gap-2 items-center">
            <Badge className="text-base">Estado: {factura.estado}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Información General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Fecha:</span> {factura.fecha}
                </div>
                <div>
                  <span className="font-semibold">Cliente:</span>{" "}
                  {factura.cliente}
                </div>
                <div>
                  <span className="font-semibold">Dirección:</span>{" "}
                  {factura.direccion}
                </div>
                <div>
                  <span className="font-semibold">Clave de Acceso:</span>{" "}
                  {factura.clave_acceso}
                </div>
                <div>
                  <span className="font-semibold">Total:</span> ${factura.total}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Paciente:</span>{" "}
                  {factura.paciente?.nombres} {factura.paciente?.apellidos}
                </div>
                <div>
                  <span className="font-semibold">Cédula:</span>{" "}
                  {factura.paciente?.cedula}
                </div>
                <div>
                  <span className="font-semibold">Fecha de nacimiento:</span>{" "}
                  {factura.paciente?.fecha_nacimiento}
                  {factura.paciente?.fecha_nacimiento && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({calculateAge(factura.paciente.fecha_nacimiento)} años)
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-semibold">Teléfono:</span>{" "}
                  {factura.paciente?.telefono}
                </div>
              </div>
            </div>
            {/* Líneas de Factura */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Líneas de Factura</h3>
              {editLineas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No hay líneas en esta factura.
                </div>
              )}
              {editLineas.map((linea: any, index: number) => (
                <Card key={linea.id || index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-5 space-y-2">
                      {linea.servicio && (
                        <div>
                          <span className="font-semibold">Servicio:</span>{" "}
                          {linea.servicio.descripcion}
                          <span
                            className={`ml-2 text-xs px-2 py-1 rounded ${getServiceTypeColor(
                              linea.servicio.tipo_examen ||
                                linea.servicio.tipo_servicio ||
                                "servicio",
                            )}`}
                          >
                            {linea.servicio.tipo_examen ||
                              linea.servicio.tipo_servicio}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            ${linea.servicio.precio}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      {linea.producto && (
                        <div>
                          <span className="font-semibold">Producto:</span>{" "}
                          {linea.producto.descripcion}
                          <span className="ml-2 text-sm text-gray-500">
                            ${linea.producto.precio}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <Badge className="text-xs">Estado: {linea.estado}</Badge>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Cantidad:</span>
                        <input
                          type="number"
                          min={1}
                          className="border rounded px-2 py-1 w-16"
                          value={linea.cantidad}
                          onChange={(e) =>
                            handleLineaChange(
                              index,
                              "cantidad",
                              Number(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>IVA (%):</span>
                        <input
                          type="number"
                          min={0}
                          className="border rounded px-2 py-1 w-16"
                          value={linea.iva}
                          onChange={(e) =>
                            handleLineaChange(
                              index,
                              "iva",
                              Number(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Descuento:</span>
                        <input
                          type="number"
                          min={0}
                          className="border rounded px-2 py-1 w-16"
                          value={linea.descuento}
                          onChange={(e) =>
                            handleLineaChange(
                              index,
                              "descuento",
                              Number(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        Subtotal:{" "}
                        <span className="font-semibold">
                          ${calcularSubtotal(linea)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {/* Total */}
            <Card className="p-4 bg-gray-50 mt-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>
                  $
                  {editLineas
                    .reduce((acc, l) => acc + Number(calcularSubtotal(l)), 0)
                    .toFixed(2)}
                </span>
              </div>
            </Card>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button type="submit" className="w-full md:w-auto">
                Guardar cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
