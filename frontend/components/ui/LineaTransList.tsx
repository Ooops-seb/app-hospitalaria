"use client";

import { useLineasTransaccion } from "@/hooks/useLineaTrans/useLineasTrans";

export default function LineaTransaccionList() {
  const { lineas, loading } = useLineasTransaccion();

  if (loading) return <p>Cargando líneas de transacción...</p>;
  if (!lineas.length) return <p>No hay líneas registradas.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Listado de Líneas de Transacción
      </h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Precio Unitario</th>
            <th className="p-2 border">Subtotal</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Factura</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((linea) => (
            <tr key={linea.id}>
              <td className="p-2 border">{linea.id}</td>
              <td className="p-2 border">{linea.cantidad}</td>
              <td className="p-2 border">
                ${linea.precio_unitario.toFixed(2)}
              </td>
              <td className="p-2 border">
                ${(linea.cantidad * linea.precio_unitario).toFixed(2)}
              </td>
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
              <td className="p-2 border">
                #{linea.factura?.id ?? "?"} -{" "}
                {linea.factura?.clave_acceso ?? "?"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
