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
import { useProductoForm } from "@/hooks/useProductoForm";

export default function CrearProductoPage() {
  const {
    productType,
    setProductType,
    formData,
    submitted,
    handleInputChange,
    handleSubmit,
  } = useProductoForm();

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
              {/* Parámetros comunes del Producto */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información General</h3>
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
              </div>

              {/* Selector de tipo de producto */}
              <div className="space-y-2">
                <Label htmlFor="product-type">Tipo de Producto *</Label>
                <Select
                  value={productType}
                  onValueChange={(value) => setProductType(value as any)}
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
                      value={formData.valor_nutritivo || ""}
                      onChange={(e) =>
                        handleInputChange("valor_nutritivo", e.target.value)
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

              {/* Mensaje de éxito al enviar */}
              {submitted && (
                <div className="text-green-600 font-semibold text-center">
                  ¡Producto creado correctamente!
                </div>
              )}

              {/* Botón submit usando Button de shadcn */}
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
