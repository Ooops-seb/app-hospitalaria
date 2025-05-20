"use client";

import { usePacientes } from "@/hooks/usePacientes/usePacientes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";

export default function PacienteList() {
  const { pacientes, loading } = usePacientes();

  if (loading) return <p className="text-gray-500">Cargando pacientes...</p>;
  if (pacientes.length === 0) return <p>No hay pacientes registrados.</p>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Cédula</TableHead>
            <TableHead>F. Nacimiento</TableHead>
            <TableHead>Teléfono</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pacientes.map((p) => (
            <TableRow key={p.cedula}>
              <TableCell>{p.nombres}</TableCell>
              <TableCell>{p.apellidos}</TableCell>
              <TableCell>{p.cedula}</TableCell>
              <TableCell>{p.fecha_nacimiento.slice(0, 10)}</TableCell>
              <TableCell>{p.telefono}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
