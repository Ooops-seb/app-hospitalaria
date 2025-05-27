/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/shadcn/ui/table";
import { useEffect, useState } from "react";
import { obtenerDescargos } from "@/lib/api/descargos";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import Link from "next/link";

export default function DescargosList() {
  const [descargos, setDescargos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescargos = async () => {
      try {
        const data = await obtenerDescargos();
        setDescargos(data);
      } catch (error) {
        console.error("Error al cargar descargos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDescargos();
  }, []);

  if (loading) return <p>Cargando descargos...</p>;
  if (!descargos.length) return <p>No hay descargos registrados.</p>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Listado de Descargos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Líneas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {descargos.map((descargo) => (
                <TableRow key={descargo.id}>
                  <TableCell>{descargo.id}</TableCell>
                  <TableCell>{descargo.fecha}</TableCell>
                  <TableCell>{descargo.cliente}</TableCell>
                  <TableCell>{descargo.direccion}</TableCell>
                  <TableCell>
                    {descargo.paciente
                      ? `${descargo.paciente.nombres} ${descargo.paciente.apellidos}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      let servicios = 0;
                      let productos = 0;
                      descargo.lineas?.forEach((linea: any) => {
                        if (linea.servicio && linea.servicio.id) servicios++;
                        if (linea.producto && linea.producto.id) productos++;
                      });
                      return (
                        <span>
                          {servicios > 0 && (
                            <span>{servicios} servicio(s)</span>
                          )}
                          {servicios > 0 && productos > 0 && <span> • </span>}
                          {productos > 0 && (
                            <span>{productos} producto(s)</span>
                          )}
                        </span>
                      );
                    })()}
                  </TableCell>
                  <TableCell>{descargo.estado}</TableCell>
                  <TableCell>
                    <Link
                      href={`/platform/descargos/${descargo.id}`}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                    >
                      Ver detalle
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
