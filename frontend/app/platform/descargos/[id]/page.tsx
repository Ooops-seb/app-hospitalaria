/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/shadcn/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Badge } from "@/components/shadcn/ui/badge";
import { obtenerPacientes } from "@/lib/api/pacientes";
import { obtenerServicios } from "@/lib/api/servicios";
import { obtenerProductos } from "@/lib/api/producto";
import { DescargoFormData, LineaDescargo } from "@/lib/api/descargos";
import {
  obtenerDescargosById,
  actualizarDescargo,
  clonarParaFactura,
  actualizarEstadoLineaDescargo,
  actualizarEstadoDescargo,
} from "@/lib/api/descargos";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
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

export default function DescargoForm() {
  const params = useParams();
  const router = useRouter();
  const descargoId = Number(params.id);

  const [formData, setFormData] = useState<DescargoFormData>({
    fecha: format(new Date(), "yyyy-MM-dd"),
    direccion: "",
    cliente: "",
    paciente_id: 0,
    lineas: [],
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [pacientesLoading, setPacientesLoading] = useState(true);
  const [servicios, setServicios] = useState<any[]>([]);
  const [serviciosLoading, setServiciosLoading] = useState(true);
  const [productos, setProductos] = useState<any[]>([]);
  const [productosLoading, setProductosLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [facturaModalOpen, setFacturaModalOpen] = useState(false);
  const [claveAcceso, setClaveAcceso] = useState("");
  const [facturaLoading, setFacturaLoading] = useState(false);
  const [lineaEstadoModal, setLineaEstadoModal] = useState<{
    open: boolean;
    index: number | null;
  }>({
    open: false,
    index: null,
  });
  const [cambiandoEstado, setCambiandoEstado] = useState(false);

  // Error modal state
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  // Estado del descargo
  const [descargoEstado, setDescargoEstado] = useState("pendiente");
  const [descargoEstadoModal, setDescargoEstadoModal] = useState(false);
  const [cambiandoEstadoDescargo, setCambiandoEstadoDescargo] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await obtenerPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Error al cargar pacientes", error);
      } finally {
        setPacientesLoading(false);
      }
    };
    fetchPacientes();
  }, []);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await obtenerServicios();
        setServicios(data.filter((s: any) => s.tipo_servicio !== "servicio"));
      } catch (error) {
        console.error("Error al cargar servicios", error);
      } finally {
        setServiciosLoading(false);
      }
    };
    fetchServicios();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos", error);
      } finally {
        setProductosLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Fetch descargo data by ID and pre-fill form
  useEffect(() => {
    if (!descargoId || isNaN(descargoId)) return;
    setLoading(true);
    obtenerDescargosById(descargoId)
      .then((data) => {
        setFormData({
          fecha: data.fecha?.slice(0, 10) || format(new Date(), "yyyy-MM-dd"),
          direccion: data.direccion || "",
          cliente: data.cliente || "",
          paciente_id: data.paciente?.id || data.paciente_id || 0,
          lineas: (data.lineas || []).map((l: any) => ({
            servicio_id: l.servicio?.id || l.servicio_id,
            producto_id: l.producto?.id || l.producto_id,
            nota_venta: l.nota_venta || "",
            estado: l.estado || "pendiente",
            id: l.id, // para actualizar estado
          })),
        });
        setSelectedDate(data.fecha ? new Date(data.fecha) : new Date());
        setDescargoEstado(data.estado || "pendiente");
      })
      .catch((err) => {
        toast.error("Error al cargar descargo");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [descargoId]);

  const handleInputChange = (
    field: keyof Omit<DescargoFormData, "lineas">,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addLinea = () => {
    setFormData((prev) => ({
      ...prev,
      lineas: [...prev.lineas, { nota_venta: "" }],
    }));
  };

  const removeLinea = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      lineas: prev.lineas.filter((_, i) => i !== index),
    }));
  };

  const updateLinea = (
    index: number,
    field: keyof LineaDescargo,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      lineas: prev.lineas.map((linea, i) =>
        i === index ? { ...linea, [field]: value } : linea,
      ),
    }));
  };

  const getSelectedService = (servicioId: number) => {
    return servicios.find((s) => s.id === servicioId);
  };

  const calculateTotal = () => {
    return formData.lineas.reduce((total, linea) => {
      let subtotal = 0;
      if (linea.servicio_id) {
        const servicio = getSelectedService(linea.servicio_id);
        subtotal += servicio ? servicio.precio : 0;
      }
      if (linea.producto_id) {
        const producto = productos.find((p) => p.id === linea.producto_id);
        subtotal += producto ? producto.precio : 0;
      }
      return total + subtotal;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await actualizarDescargo(descargoId, formData);
      toast.success("Descargo actualizado correctamente");
      router.push(`/platform/descargos/${descargoId}`);
    } catch (error: any) {
      setErrorModal({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error al actualizar descargo",
      });
      toast.error("Error al actualizar descargo");
      console.error("Error al actualizar descargo:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Factura handler
  const handleGenerarFactura = async () => {
    setFacturaLoading(true);
    try {
      await clonarParaFactura(descargoId, { clave_acceso: claveAcceso });
      toast.success("Factura generada correctamente");
      setFacturaModalOpen(false);
      setClaveAcceso("");
    } catch (error: any) {
      setErrorModal({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error al generar factura",
      });
      toast.error("Error al generar factura");
      console.error(error);
    } finally {
      setFacturaLoading(false);
    }
  };

  // Cambiar estado de linea
  const handleCambiarEstadoLinea = async () => {
    if (lineaEstadoModal.index === null) return;
    setCambiandoEstado(true);
    const linea = formData.lineas[lineaEstadoModal.index];
    try {
      await actualizarEstadoLineaDescargo(linea.id ?? 0);
      toast.success("Estado de línea actualizado");
      // Refrescar la línea (opcional: recargar todo el descargo)
      const data = await obtenerDescargosById(descargoId);
      setFormData((prev) => ({
        ...prev,
        lineas: (data.lineas || []).map((l: any) => ({
          servicio_id: l.servicio?.id || l.servicio_id,
          producto_id: l.producto?.id || l.producto_id,
          nota_venta: l.nota_venta || "",
          estado: l.estado || "pendiente",
          id: l.id,
        })),
      }));
    } catch (error: any) {
      setErrorModal({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error al cambiar estado de línea",
      });
      toast.error("Error al cambiar estado de línea");
      console.error(error);
    } finally {
      setCambiandoEstado(false);
      setLineaEstadoModal({ open: false, index: null });
    }
  };

  // Cambiar estado del descargo
  const handleCambiarEstadoDescargo = async () => {
    setCambiandoEstadoDescargo(true);
    try {
      await actualizarEstadoDescargo(descargoId);
      toast.success("Estado del descargo actualizado");
      // Refrescar estado
      const data = await obtenerDescargosById(descargoId);
      setDescargoEstado(data.estado || "pendiente");
    } catch (error: any) {
      setErrorModal({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error al cambiar estado del descargo",
      });
      toast.error("Error al cambiar estado del descargo");
      console.error(error);
    } finally {
      setCambiandoEstadoDescargo(false);
      setDescargoEstadoModal(false);
    }
  };

  // Recarga automática de información después de cambiar estado de línea o descargo
  useEffect(() => {
    if (!descargoId || isNaN(descargoId)) return;
    obtenerDescargosById(descargoId)
      .then((data) => {
        setFormData({
          fecha: data.fecha?.slice(0, 10) || format(new Date(), "yyyy-MM-dd"),
          direccion: data.direccion || "",
          cliente: data.cliente || "",
          paciente_id: data.paciente?.id || data.paciente_id || 0,
          lineas: (data.lineas || []).map((l: any) => ({
            servicio_id: l.servicio?.id || l.servicio_id,
            producto_id: l.producto?.id || l.producto_id,
            nota_venta: l.nota_venta || "",
            estado: l.estado || "pendiente",
            id: l.id,
          })),
        });
        setSelectedDate(data.fecha ? new Date(data.fecha) : new Date());
        setDescargoEstado(data.estado || "pendiente");
      })
      .catch((err) => {
        toast.error("Error al cargar descargo");
        console.error(err);
      });
  }, [descargoId, cambiandoEstado, cambiandoEstadoDescargo]);

  if (loading) {
    return <div className="p-8 text-center">Cargando descargo...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Error Modal */}
      <Sheet
        open={errorModal.open}
        onOpenChange={(open) => setErrorModal((v) => ({ ...v, open }))}
      >
        <SheetContent side="top" className="max-w-md w-full">
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
      {/* Confirmación cambio de estado descargo */}
      <Sheet open={descargoEstadoModal} onOpenChange={setDescargoEstadoModal}>
        <SheetContent className="max-w-md w-full">
          <SheetHeader>
            <SheetTitle>¿Está seguro?</SheetTitle>
            <SheetDescription>
              Esta acción cambiará el estado del descargo a <b>descargado</b>.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-6 flex gap-2">
            <Button
              type="button"
              onClick={handleCambiarEstadoDescargo}
              disabled={
                cambiandoEstadoDescargo || descargoEstado === "facturado"
              }
            >
              {cambiandoEstadoDescargo ? "Cambiando..." : "Confirmar"}
            </Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Card>
        <CardHeader>
          <CardTitle>Editar Descargo Médico</CardTitle>
          <CardDescription>
            Modifique la información del descargo y sus servicios/productos
          </CardDescription>
          <div className="mt-2 flex gap-2 items-center">
            <Badge className="text-base">Estado: {descargoEstado}</Badge>
            {descargoEstado !== "descargado" &&
              descargoEstado !== "facturado" && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setDescargoEstadoModal(true)}
                >
                  Descargar / Cambiar estado descargo
                </Button>
              )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      disabled={descargoEstado === "facturado"}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date && descargoEstado !== "facturado") {
                          setSelectedDate(date);
                          handleInputChange(
                            "fecha",
                            format(date, "yyyy-MM-dd"),
                          );
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Paciente *</Label>
                <Select
                  value={formData.paciente_id?.toString() || ""}
                  onValueChange={(value) =>
                    handleInputChange("paciente_id", Number.parseInt(value))
                  }
                  disabled={pacientesLoading || descargoEstado === "facturado"}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        pacientesLoading
                          ? "Cargando pacientes..."
                          : "Seleccionar paciente"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {pacientes.map((paciente) => (
                      <SelectItem
                        key={paciente.id}
                        value={paciente.id.toString()}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {paciente.nombres} {paciente.apellidos}
                          </span>
                          <span className="text-sm text-gray-500">
                            CI: {paciente.cedula} •{" "}
                            {calculateAge(paciente.fecha_nacimiento)} años
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Input
                  id="cliente"
                  value={formData.cliente}
                  onChange={(e) => handleInputChange("cliente", e.target.value)}
                  placeholder="Nombre del cliente"
                  required
                  disabled={descargoEstado === "facturado"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) =>
                    handleInputChange("direccion", e.target.value)
                  }
                  placeholder="Dirección del cliente"
                  required
                  disabled={descargoEstado === "facturado"}
                />
              </div>
            </div>

            {/* Líneas de Descargo */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Linea de Descargos</h3>
                <Button
                  type="button"
                  onClick={addLinea}
                  variant="outline"
                  size="sm"
                  disabled={descargoEstado === "facturado"}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Linea de Descargo
                </Button>
              </div>

              {formData.lineas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No hay servicios agregados. Haga clic en Agregar Servicio para
                  comenzar.
                </div>
              )}

              {formData.lineas.map((linea, index) => {
                const isLineaEditable = descargoEstado !== "facturado";
                const selectedService = linea.servicio_id
                  ? getSelectedService(linea.servicio_id)
                  : null;
                const selectedProduct = linea.producto_id
                  ? productos.find((p) => p.id === linea.producto_id)
                  : null;

                return (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      <div className="md:col-span-5 space-y-2">
                        <Label>Servicio</Label>
                        <Select
                          value={linea.servicio_id?.toString() || ""}
                          onValueChange={(value) =>
                            isLineaEditable &&
                            updateLinea(
                              index,
                              "servicio_id",
                              Number.parseInt(value),
                            )
                          }
                          disabled={serviciosLoading || !isLineaEditable}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                serviciosLoading
                                  ? "Cargando servicios..."
                                  : "Seleccionar servicio"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {servicios.map((servicio) => (
                              <SelectItem
                                key={servicio.id}
                                value={servicio.id.toString()}
                              >
                                <div className="flex items-center gap-2">
                                  <Badge
                                    className={getServiceTypeColor(
                                      servicio.tipo_servicio,
                                    )}
                                  >
                                    {servicio.tipo_servicio}
                                  </Badge>
                                  <span>{servicio.descripcion}</span>
                                  <span className="text-sm text-gray-500">
                                    ${servicio.precio}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-5 space-y-2">
                        <Label>Producto</Label>
                        <Select
                          value={linea.producto_id?.toString() || ""}
                          onValueChange={(value) =>
                            isLineaEditable &&
                            updateLinea(
                              index,
                              "producto_id",
                              Number.parseInt(value),
                            )
                          }
                          disabled={productosLoading || !isLineaEditable}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                productosLoading
                                  ? "Cargando productos..."
                                  : "Seleccionar producto"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {productos.map((producto) => (
                              <SelectItem
                                key={producto.id}
                                value={producto.id.toString()}
                              >
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-orange-100 text-orange-800">
                                    {producto.tipo_producto}
                                  </Badge>
                                  <span>{producto.descripcion}</span>
                                  <span className="text-sm text-gray-500">
                                    ${producto.precio}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-4 space-y-2">
                        <Label>Nota de Venta</Label>
                        <Textarea
                          value={linea.nota_venta}
                          onChange={(e) =>
                            isLineaEditable &&
                            updateLinea(index, "nota_venta", e.target.value)
                          }
                          placeholder="Observaciones adicionales"
                          rows={2}
                          disabled={!isLineaEditable}
                        />
                      </div>

                      <div className="md:col-span-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => isLineaEditable && removeLinea(index)}
                          className="w-full"
                          disabled={!isLineaEditable}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="text-xs">
                        Estado: {linea.estado || "pendiente"}
                      </Badge>
                      {/* Solo mostrar el botón de cambiar estado si el descargo NO está facturado */}
                      {linea.estado !== "descargado" &&
                        linea.id &&
                        descargoEstado !== "facturado" && (
                          <Sheet
                            open={
                              lineaEstadoModal.open &&
                              lineaEstadoModal.index === index
                            }
                            onOpenChange={(open) =>
                              setLineaEstadoModal({
                                open,
                                index: open ? index : null,
                              })
                            }
                          >
                            <SheetTrigger asChild>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={descargoEstado === "facturado"}
                              >
                                Descargar / Cambiar estado
                              </Button>
                            </SheetTrigger>
                            <SheetContent
                              side="right"
                              className="max-w-md w-full"
                            >
                              <SheetHeader>
                                <SheetTitle>¿Está seguro?</SheetTitle>
                                <SheetDescription>
                                  Esta acción cambiará el estado de la línea a{" "}
                                  <b>descargado</b>.
                                </SheetDescription>
                              </SheetHeader>
                              <SheetFooter className="mt-6 flex gap-2">
                                <Button
                                  type="button"
                                  onClick={handleCambiarEstadoLinea}
                                  disabled={
                                    cambiandoEstado ||
                                    descargoEstado === "facturado"
                                  }
                                >
                                  {cambiandoEstado
                                    ? "Cambiando..."
                                    : "Confirmar"}
                                </Button>
                                <SheetClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancelar
                                  </Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        )}
                    </div>

                    {(selectedService || selectedProduct) && (
                      <div className="mt-3 pt-3 border-t flex justify-between text-sm">
                        {selectedService && (
                          <>
                            <span>Precio servicio:</span>
                            <span className="font-semibold">
                              ${selectedService.precio.toFixed(2)}
                            </span>
                          </>
                        )}
                        {selectedProduct && (
                          <>
                            <span>Precio producto:</span>
                            <span className="font-semibold">
                              ${selectedProduct.precio.toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Total */}
            {formData.lineas.length > 0 && (
              <Card className="p-4 bg-gray-50">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total aproximado:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </Card>
            )}

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={
                  formData.lineas.length === 0 ||
                  submitting ||
                  descargoEstado === "facturado"
                }
              >
                {submitting ? "Actualizando..." : "Actualizar Descargo"}
              </Button>
              <Sheet open={facturaModalOpen} onOpenChange={setFacturaModalOpen}>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full md:w-auto"
                    disabled={descargoEstado === "facturado"}
                  >
                    Generar factura
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="max-w-md w-full">
                  <SheetHeader>
                    <SheetTitle>Generar factura</SheetTitle>
                    <SheetDescription>
                      Ingrese la clave de acceso para crear la factura de este
                      descargo.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 mt-4">
                    <Label htmlFor="claveAcceso">Clave de acceso</Label>
                    <Input
                      id="claveAcceso"
                      type="text"
                      value={claveAcceso}
                      onChange={(e) => setClaveAcceso(e.target.value)}
                      placeholder="Clave de acceso"
                      autoFocus
                    />
                  </div>
                  <SheetFooter className="mt-6 flex gap-2">
                    <Button
                      type="button"
                      onClick={handleGenerarFactura}
                      disabled={
                        !claveAcceso ||
                        facturaLoading ||
                        descargoEstado === "facturado"
                      }
                    >
                      {facturaLoading ? "Creando..." : "Crear factura"}
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
