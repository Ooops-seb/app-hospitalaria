"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/shadcn/ui/table";
import { useProductos } from "@/hooks/useProducto/useProductos";

export default function ProductosList() {
  const { productos, loading } = useProductos();

  if (loading) return <p>Cargando productos...</p>;
  if (!productos.length) return <p>No hay productos registrados.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listado de Productos</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Tipo Producto</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...productos]
            .sort((a, b) => a.id - b.id)
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>${item.precio.toFixed(2)}</TableCell>
                <TableCell>{item.tipo_producto}</TableCell>
                <TableCell>
                  {item.tipo_producto === "comida" ? (
                    <div>
                      <div>
                        <b>Tipo:</b> {item.tipo}
                      </div>
                      {item.valor_nutritivo && (
                        <div>
                          <b>Valor Nutritivo:</b> {item.valor_nutritivo}
                        </div>
                      )}
                    </div>
                  ) : item.tipo_producto === "hospedaje" ? (
                    <div>
                      <div>
                        <b>Ingreso:</b>{" "}
                        {item.fecha_ingreso
                          ? new Date(item.fecha_ingreso).toLocaleDateString()
                          : "-"}
                      </div>
                      <div>
                        <b>Salida:</b>{" "}
                        {item.fecha_salida
                          ? new Date(item.fecha_salida).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
