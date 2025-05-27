/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Button } from "@/components/shadcn/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";

import { useServicioForm } from "@/hooks/useServicioForm";

export default function CrearServicioPage() {
  const {
    formData,
    submitted,
    handleInputChange,
    handleSubmit,
    servicioType,
    setServicioType,
  } = useServicioForm();

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Servicio</CardTitle>
            <CardDescription>
              Complete el formulario para crear un servicio
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

              {/* Selector de tipo de servicio */}
              <div className="space-y-2">
                <Label htmlFor="service-type">Tipo de Servicio *</Label>
                <Select
                  value={servicioType}
                  onValueChange={(value) => setServicioType(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="examenes">Exámenes</SelectItem>
                    <SelectItem value="imagen">Imagen</SelectItem>
                    <SelectItem value="atencion">Atención</SelectItem>
                    <SelectItem value="procedimiento">Procedimiento</SelectItem>
                    <SelectItem value="suministro">Suministro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Parámetros específicos de Exámenes */}
              {servicioType === "examenes" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Examen
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="tipo_examen">Tipo de Examen</Label>
                    <Input
                      id="tipo_examen"
                      value={formData.tipo_examen || ""}
                      onChange={(e) =>
                        handleInputChange("tipo_examen", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zona_cuerpo">Zona del Cuerpo</Label>
                    <Input
                      id="zona_cuerpo"
                      value={formData.zona_cuerpo || ""}
                      onChange={(e) =>
                        handleInputChange("zona_cuerpo", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Parámetros específicos de Imagen */}
              {servicioType === "imagen" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Imagen
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="zona_cuerpo">Zona del Cuerpo</Label>
                    <Input
                      id="zona_cuerpo"
                      value={formData.zona_cuerpo || ""}
                      onChange={(e) =>
                        handleInputChange("zona_cuerpo", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Parámetros específicos de Atención */}
              {servicioType === "atencion" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Atención
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="medico_asignado">Médico Asignado</Label>
                    <Input
                      id="medico_asignado"
                      value={formData.medico_asignado || ""}
                      onChange={(e) =>
                        handleInputChange("medico_asignado", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Parámetros específicos de Procedimiento */}
              {servicioType === "procedimiento" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Procedimiento
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="procedimiento">Procedimiento</Label>
                    <Input
                      id="procedimiento"
                      value={formData.procedimiento || ""}
                      onChange={(e) =>
                        handleInputChange("procedimiento", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medico_asignado">Médico Asignado</Label>
                    <Input
                      id="medico_asignado"
                      value={formData.medico_asignado || ""}
                      onChange={(e) =>
                        handleInputChange("medico_asignado", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Parámetros específicos de Suministro */}
              {servicioType === "suministro" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Suministro
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="tipo_suministro">Tipo de Suministro</Label>
                    <Input
                      id="tipo_suministro"
                      value={formData.tipo_suministro || ""}
                      onChange={(e) =>
                        handleInputChange("tipo_suministro", e.target.value)
                      }
                    />
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
              <Button type="submit" className="w-full" disabled={!servicioType}>
                Crear Producto
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
