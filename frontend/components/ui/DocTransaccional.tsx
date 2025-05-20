"use client";

import { useDocumentos } from "@/hooks/useDocTransaccional/useDoc";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/shadcn/ui/table";

export default function DocumentoList() {
  const { documentos, loading } = useDocumentos();

  if (loading) return <p className="text-gray-500">Cargando documentos...</p>;
  if (documentos.length === 0) return <p>No hay documentos registrados.</p>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead># Documento</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>ID Paciente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentos.map((doc) => (
            <TableRow key={doc.nro}>
              <TableCell>{doc.nro}</TableCell>
              <TableCell>{doc.fecha.slice(0, 10)}</TableCell>
              <TableCell>${doc.valor.toFixed(2)}</TableCell>
              <TableCell>{doc.paciente_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
