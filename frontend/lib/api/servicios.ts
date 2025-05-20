import api from "@/lib/api";

export interface ProcedimientoMedicoDto {
  descripcion: string;
  registro: string;
  precio: number;
  medico_asignado: string;
  procedimiento: string;
}

export const crearProcedimientoMedico = async (
  data: ProcedimientoMedicoDto,
) => {
  const response = await api.post("/procedimiento-medico", data);
  return response.data;
};

export interface ProcedimientoMedico {
  id: number;
  descripcion: string;
  registro: string; // ISO date
  precio: number;
  medico_asignado: string;
  procedimiento: string;
}

export const obtenerProcedimientos = async (): Promise<
  ProcedimientoMedico[]
> => {
  const response = await api.get("/procedimiento-medico");
  return response.data;
};
