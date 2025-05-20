"use client";

import { useFacturas } from "@/hooks/useFactura/useFacturas";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/shadcn/ui/table";

export default function FacturaList() {
  const { facturas, loading } = useFacturas();

  if (loading) return <p className="text-gray-500">Cargando facturas...</p>;
  if (facturas.length === 0) return <p>No hay facturas registradas.</p>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Clave de Acceso</TableHead>
            <TableHead>ID Documento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facturas.map((factura) => (
            <tr key={factura.id}>
              <td>{factura.id}</td>
              <td>{factura.clave_acceso}</td>
              <td>
                <Link
                  href={`/platform/facturas/${factura.id}`} // ✅ aquí sí puedes usar dinámico
                  className="text-blue-500 underline"
                >
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
