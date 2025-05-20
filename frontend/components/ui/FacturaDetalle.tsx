"use client";

import { useFacturaDetalle } from "@/hooks/useFactura/useFacturaDetalle";

export default function FacturaDetalle({ id }: { id: number }) {
  const { factura, loading } = useFacturaDetalle(id);

  if (loading) return <p>Cargando factura...</p>;
  if (!factura) return <p>Factura no encontrada.</p>;

  const total =
    factura.lineas?.reduce(
      (acc, l) => acc + l.cantidad * l.precio_unitario,
      0,
    ) ?? 0;

  const paciente = factura.documento?.paciente;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Factura #{factura.id}</h1>
      <p>Clave de acceso: {factura.clave_acceso}</p>

      <hr className="my-4" />

      <h2 className="text-lg font-semibold">Paciente</h2>
      {paciente ? (
        <p>
          {paciente.nombres} {paciente.apellidos} – Cédula: {paciente.cedula}
        </p>
      ) : (
        <p className="text-gray-500 italic">Paciente no disponible</p>
      )}

      <h2 className="text-lg font-semibold mt-6">Líneas</h2>

      {factura.lineas?.length ? (
        <table className="w-full border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Descripción</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Precio Unitario</th>
              <th className="p-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {factura.lineas.map((linea, idx) => (
              <tr key={linea.id} className="text-center">
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">
                  {linea.producto
                    ? "Producto"
                    : linea.servicio
                      ? "Servicio"
                      : "N/A"}
                </td>
                <td className="p-2 border">
                  {linea.producto?.descripcion ||
                    linea.servicio?.descripcion ||
                    "Sin descripción"}
                </td>
                <td className="p-2 border">{linea.cantidad}</td>
                <td className="p-2 border">
                  ${linea.precio_unitario.toFixed(2)}
                </td>
                <td className="p-2 border">
                  ${(linea.precio_unitario * linea.cantidad).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 italic mt-2">No hay líneas registradas.</p>
      )}

      <div className="text-right font-bold mt-4">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
