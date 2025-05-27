import api from "@/lib/api";

export interface ServicioFormData {
  descripcion: string;
  registro: Date;
  precio: number;
  estado?: Estado;
  tipo_examen?: string;
  tipo_servicio?: string;
  medico_asignado?: string;
  procedimiento?: string;
  tipo_suministro?: string;
  zona_cuerpo?: string;
}

export interface ServicioList {
  id: number;
  registro: Date;
  descripcion: string;
  precio: number;
  estado: Estado;
  tipo_examen?: string;
  tipo_servicio: ServicioType;
  zona_cuerpo?: string;
  medico_asignado?: null;
  procedimiento?: string;
  tipo_suministro?: string;
}

export enum Estado {
  Default = "default",
  Facturado = "facturado",
  Descargado = "descargado",
}

export const crearServicioExamenes = async (data: ServicioFormData) => {
  const response = await api.post("/servicios/examenes", data);
  return response.data;
};

export const crearServicioImagen = async (data: ServicioFormData) => {
  const response = await api.post("/servicios/imagen", data);
  return response.data;
};

export const crearServicioAtencion = async (data: ServicioFormData) => {
  const response = await api.post("/servicios/atencion", data);
  return response.data;
};

export const crearServicioProcedimiento = async (data: ServicioFormData) => {
  const response = await api.post("/servicios/procedimiento", data);
  return response.data;
};

export const crearServicioSuministro = async (data: ServicioFormData) => {
  const response = await api.post("/servicios/suministro", data);
  return response.data;
};

export const obtenerServicios = async (): Promise<ServicioList[]> => {
  const response = await api.get("/servicios/list");
  return response.data;
};

export enum TipoServicio {
  Examenes = "examenes",
  Imagen = "imagen",
  Atencion = "atencion",
  Procedimiento = "procedimiento",
  Suministro = "suministro",
}

export type ServicioType =
  | "examenes"
  | "imagen"
  | "atencion"
  | "procedimiento"
  | "suministro"
  | "";
