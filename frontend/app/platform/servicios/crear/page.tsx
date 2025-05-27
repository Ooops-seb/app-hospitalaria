/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Calendar } from "@/components/shadcn/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

type ProductType = "comida" | "hospedaje" | "";
type Estado = "activo" | "inactivo" | "pendiente";

interface ProductFormData {
  // Parámetros comunes de Producto
  descripcion: string;
  precio: number;
  estado: Estado;

  // Parámetros específicos de Comida
  valorNutri?: string;
  tipo?: string;

  // Parámetros específicos de Hospedaje
  fecha_inicio?: Date;
  fecha_fin?: Date;
}

export default function CrearServicioPage() {
  const [productType, setProductType] = useState<ProductType>("");
  const [formData, setFormData] = useState<ProductFormData>({
    descripcion: "",
    precio: 0,
    estado: "activo",
  });

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del producto:", {
      tipo: productType,
      ...formData,
    });
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Producto</CardTitle>
            <CardDescription>
              Complete el formulario para crear un producto de comida o
              hospedaje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selector de tipo de producto */}
              <div className="space-y-2">
                <Label htmlFor="product-type">Tipo de Producto *</Label>
                <Select
                  value={productType}
                  onValueChange={(value: ProductType) => setProductType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comida">Comida</SelectItem>
                    <SelectItem value="hospedaje">Hospedaje</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Parámetros comunes del Producto */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información General</h3>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción *</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Ingrese la descripción del producto"
                    value={formData.descripcion}
                    onChange={(e) =>
                      handleInputChange("descripcion", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="precio">Precio *</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.precio}
                    onChange={(e) =>
                      handleInputChange(
                        "precio",
                        Number.parseFloat(e.target.value) || 0,
                      )
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value: Estado) =>
                      handleInputChange("estado", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Parámetros específicos de Comida */}
              {productType === "comida" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Comida
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="valorNutri">Valor Nutricional</Label>
                    <Textarea
                      id="valorNutri"
                      placeholder="Ingrese el valor nutricional"
                      value={formData.valorNutri || ""}
                      onChange={(e) =>
                        handleInputChange("valorNutri", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Comida</Label>
                    <Select
                      value={formData.tipo || ""}
                      onValueChange={(value) =>
                        handleInputChange("tipo", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo de comida" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desayuno">Desayuno</SelectItem>
                        <SelectItem value="almuerzo">Almuerzo</SelectItem>
                        <SelectItem value="cena">Cena</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                        <SelectItem value="bebida">Bebida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Parámetros específicos de Hospedaje */}
              {productType === "hospedaje" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Hospedaje
                  </h3>

                  <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.fecha_inicio
                            ? format(formData.fecha_inicio, "PPP")
                            : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.fecha_inicio}
                          onSelect={(date) =>
                            handleInputChange("fecha_inicio", date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Fecha de Fin</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.fecha_fin
                            ? format(formData.fecha_fin, "PPP")
                            : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.fecha_fin}
                          onSelect={(date) =>
                            handleInputChange("fecha_fin", date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={!productType}>
                Crear Producto
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
