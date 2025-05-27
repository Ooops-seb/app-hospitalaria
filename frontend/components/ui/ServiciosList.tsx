"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/shadcn/ui/table";
import { useServicios } from "@/hooks/useServicio/useServicios";

export default function ServiciosList() {
  const { servicios, loading } = useServicios();

  if (loading) return <p>Cargando servicios...</p>;
  if (!servicios.length) return <p>No hay servicios registrados.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listado de Servicios</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo Servicio</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Precio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...servicios]
            .sort((a, b) => a.id - b.id)
            .filter((item) =>
              [
                "procedimiento",
                "atencion",
                "examenes",
                "imagen",
                "suministro",
              ].includes(item.tipo_servicio),
            )
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>
                  {item.registro
                    ? new Date(item.registro).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>{item.tipo_servicio}</TableCell>
                <TableCell>
                  {item.tipo_servicio === "procedimiento" ? (
                    <>
                      {item.procedimiento && (
                        <div>
                          <b>Procedimiento:</b> {item.procedimiento}
                        </div>
                      )}
                      {item.medico_asignado && (
                        <div>
                          <b>Médico:</b> {item.medico_asignado}
                        </div>
                      )}
                    </>
                  ) : item.tipo_servicio === "atencion" ? (
                    <>
                      {item.medico_asignado && (
                        <div>
                          <b>Médico:</b> {item.medico_asignado}
                        </div>
                      )}
                    </>
                  ) : item.tipo_servicio === "examenes" ? (
                    <>
                      {item.tipo_examen && (
                        <div>
                          <b>Tipo Examen:</b> {item.tipo_examen}
                        </div>
                      )}
                    </>
                  ) : item.tipo_servicio === "imagen" ? (
                    <>
                      {item.zona_cuerpo && (
                        <div>
                          <b>Zona Cuerpo:</b> {item.zona_cuerpo}
                        </div>
                      )}
                    </>
                  ) : item.tipo_servicio === "suministro" ? (
                    <>
                      {item.tipo_suministro && (
                        <div>
                          <b>Tipo Suministro:</b> {item.tipo_suministro}
                        </div>
                      )}
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell>${item.precio.toFixed(2)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
