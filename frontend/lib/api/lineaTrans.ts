import api from "@/lib/api";

export interface CreateLineaTransaccionDto {
  cantidad: number;
  precio_unitario: number;
  factura_id: number;
  producto_id?: number | null;
  servicio_id?: number | null;
}

export const crearLineaTransaccion = async (
  data: CreateLineaTransaccionDto,
) => {
  const response = await api.post("/linea-transaccion", data);
  return response.data;
};

export interface LineaTransaccion {
  id: number;
  cantidad: number;
  precio_unitario: number;
  producto?: { descripcion: string } | null;
  servicio?: { descripcion: string } | null;
  factura?: { id: number; clave_acceso: string };
}

export const obtenerLineasTransaccion = async (): Promise<
  LineaTransaccion[]
> => {
  const response = await api.get("/linea-transaccion");
  return response.data;
};
