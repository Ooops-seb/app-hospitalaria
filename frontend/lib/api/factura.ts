import api from "@/lib/api";

export interface FacturaDto {
  clave_acceso: string;
  documento_id: number;
}

export const crearFactura = async (data: FacturaDto) => {
  const response = await api.post("/factura", data);
  return response.data;
};
export const obtenerFacturas = async () => {
  const response = await api.get("/factura");
  return response.data;
};
// Para creación
export interface FacturaDto {
  clave_acceso: string;
  documento_id: number;
}

// Para respuesta/listado
export interface Factura extends FacturaDto {
  id: number;
}
//-----------------------------------------------------
//Detalles de la factura
export interface LineaTransaccion {
  id: number;
  cantidad: number;
  precio_unitario: number;
  servicio?: { descripcion: string };
  producto?: { descripcion: string };
}

export interface FacturaDetalle {
  id: number;
  clave_acceso: string;
  documento: {
    id: number;
    fecha: string;
    valor: number;
    paciente: {
      id: number;
      nombres: string;
      apellidos: string;
      cedula: string;
    };
  };
  lineas: LineaTransaccion[];
}

export const obtenerFacturaDetalle = async (id: number) => {
  const response = await api.get(`/factura/${id}`);
  return response.data;
};
