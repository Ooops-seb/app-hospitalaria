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
import { crearDescargo } from "@/lib/api/descargos";

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
    try {
      await crearDescargo(formData);
      setFormData({
        fecha: format(new Date(), "yyyy-MM-dd"),
        direccion: "",
        cliente: "",
        paciente_id: 0,
        lineas: [],
      });
      setSelectedDate(new Date());
    } catch (error) {
      console.error("Error al crear descargo:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Crear Descargo Médico</CardTitle>
          <CardDescription>
            Complete la información del descargo y agregue los servicios
            correspondientes
          </CardDescription>
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
                        if (date) {
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
                  disabled={pacientesLoading}
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
                            updateLinea(
                              index,
                              "servicio_id",
                              Number.parseInt(value),
                            )
                          }
                          disabled={serviciosLoading}
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
                            updateLinea(
                              index,
                              "producto_id",
                              Number.parseInt(value),
                            )
                          }
                          disabled={productosLoading}
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
                            updateLinea(index, "nota_venta", e.target.value)
                          }
                          placeholder="Observaciones adicionales"
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLinea(index)}
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

            <Button
              type="submit"
              className="w-full"
              disabled={formData.lineas.length === 0}
            >
              Crear Descargo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
