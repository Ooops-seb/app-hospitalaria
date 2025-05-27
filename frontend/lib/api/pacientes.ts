import api from "@/lib/api";

export interface PacienteDto {
  nombres: string;
  apellidos: string;
  cedula: string;
  fecha_nacimiento: Date;
  telefono: string;
}

export const crearPaciente = async (data: PacienteDto) => {
  const response = await api.post("/pacientes", data);
  return response.data;
};

export const obtenerPacientes = async () => {
  const response = await api.get("/pacientes");
  return response.data;
};
