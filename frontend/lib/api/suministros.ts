import api from "@/lib/api";

export interface SuministroMedicamento {
  descripcion: string;
  registro: string;
  precio: number;
  tipo_suministro: string;
}

export const crearSuministro = async (data: SuministroMedicamento) => {
  const response = await api.post("/servicios/suministro-medicamento", data);
  return response.data;
};
