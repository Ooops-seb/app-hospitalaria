"use client";

import { useComidas } from "@/hooks/useProducto/useComidas";

export default function ComidaList() {
  const { comidas, loading } = useComidas();

  if (loading) return <p>Cargando comidas...</p>;
  if (!comidas.length) return <p>No hay comidas registradas.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listado de Comidas</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Precio</th>
            {/* <th className="p-2 border">Valor Nutritivo</th> */}
            <th className="p-2 border">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {comidas.map((comida) => (
            <tr key={comida.id}>
              <td className="p-2 border">{comida.id}</td>
              <td className="p-2 border">{comida.descripcion}</td>
              <td className="p-2 border">${comida.precio.toFixed(2)}</td>
              {/* <td className="p-2 border">{comida.valorNutritivo}</td> */}
              <td className="p-2 border">{comida.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
