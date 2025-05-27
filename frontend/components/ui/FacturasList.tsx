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
import { obtenerFacturas } from "@/lib/api/facturas";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import Link from "next/link";

export default function FacturasList() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await obtenerFacturas();
        // Ordenar por id descendente
        setFacturas(data.sort((a: any, b: any) => a.id - b.id));
      } catch (error) {
        console.error("Error al cargar facturas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFacturas();
  }, []);

  if (loading) return <p>Cargando facturas...</p>;
  if (!facturas.length) return <p>No hay facturas registradas.</p>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Listado de Facturas</CardTitle>
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
                <TableHead>Clave Acceso</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facturas.map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell>{factura.id}</TableCell>
                  <TableCell>{factura.fecha}</TableCell>
                  <TableCell>{factura.cliente}</TableCell>
                  <TableCell>{factura.direccion}</TableCell>
                  <TableCell>
                    {factura.paciente
                      ? `${factura.paciente.nombres} ${factura.paciente.apellidos}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      let servicios = 0;
                      let productos = 0;
                      factura.lineas?.forEach((linea: any) => {
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
                  <TableCell>{factura.estado}</TableCell>
                  <TableCell>{factura.clave_acceso}</TableCell>
                  <TableCell>${factura.total?.toFixed(2) ?? 0}</TableCell>
                  <TableCell>
                    <Link
                      href={`/platform/facturas/${factura.id}`}
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
