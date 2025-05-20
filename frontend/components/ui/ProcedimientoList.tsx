"use client";

import { useProcedimientos } from "@/hooks/useServicio/useProcedimientos";

export default function ProcedimientoList() {
  const { procedimientos, loading } = useProcedimientos();

  if (loading) return <p>Cargando procedimientos...</p>;
  if (!procedimientos.length) return <p>No hay procedimientos registrados.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Listado de Procedimientos Médicos
      </h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Fecha</th>
            {/* <th className="p-2 border">Médico</th> */}
            <th className="p-2 border">Procedimiento</th>
            <th className="p-2 border">Precio</th>
          </tr>
        </thead>
        <tbody>
          {procedimientos.map((proc) => (
            <tr key={proc.id}>
              <td className="p-2 border">{proc.id}</td>
              <td className="p-2 border">{proc.descripcion}</td>
              <td className="p-2 border">{proc.registro}</td>
              {/* <td className="p-2 border">{proc.medico_asignado}</td> */}
              <td className="p-2 border">{proc.procedimiento}</td>
              <td className="p-2 border">${proc.precio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
