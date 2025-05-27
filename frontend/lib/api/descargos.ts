import api from "@/lib/api";

export interface LineaDescargo {
  servicio_id?: number;
  producto_id?: number;
  nota_venta: string;
}

export interface DescargoFormData {
  fecha: string;
  direccion: string;
  cliente: string;
  paciente_id: number;
  lineas: LineaDescargo[];
}

export const actualizarDescargo = async (
  id: number,
  data: DescargoFormData,
) => {
  const response = await api.patch(`/documentos/descargo/${id}`, data);
  return response.data;
};

export const crearDescargo = async (data: DescargoFormData) => {
  const response = await api.post("/documentos/descargo", data);
  return response.data;
};

export const obtenerDescargos = async () => {
  const response = await api.get("/documentos/descargo");
  return response.data;
};

export const obtenerDescargosById = async (id: number) => {
  const response = await api.get(`/documentos/descargo/${id}`);
  return response.data;
};
