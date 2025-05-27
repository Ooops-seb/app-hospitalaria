import api from "@/lib/api";

export interface LineaDescargo {
  servicio_id?: number;
  producto_id?: number;
  nota_venta: string;
  id?: number;
  estado?: string;
}

export interface DescargoFormData {
  fecha: string;
  direccion: string;
  cliente: string;
  paciente_id: number;
  lineas: LineaDescargo[];
}

export const facturar = async (id: number) => {
  const response = await api.post(`/documentos/factura/${id}/facturar`);
  return response.data;
};

export const actualizarFactura = async (id: number, data: DescargoFormData) => {
  const response = await api.patch(`/documentos/factura/${id}`, data);
  return response.data;
};

export const obtenerFacturas = async () => {
  const response = await api.get("/documentos/factura");
  return response.data;
};

export const obtenerFacturaById = async (id: number) => {
  const response = await api.get(`/documentos/factura/${id}`);
  return response.data;
};
