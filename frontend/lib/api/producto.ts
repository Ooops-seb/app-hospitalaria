import api from "@/lib/api";

export interface ProductoDto {
  descripcion: string;
  precio: number;
}

export const crearProducto = async (data: ProductoDto) => {
  const response = await api.post("/comida", data);
  return response.data;
};

export const obtenerProductos = async () => {
  const response = await api.get("/comida");
  return response.data;
};
export interface ComidaDto {
  descripcion: string;
  precio: number;
  type: "Comida";
  valorNutri: string;
  tipo: string;
}

export const crearComida = async (data: ComidaDto) => {
  const response = await api.post("/comida", data);
  return response.data;
};

export interface Comida {
  id: number;
  descripcion: string;
  precio: number;
  valorNutritivo: string;
  tipo: string;
}

export const obtenerComidas = async (): Promise<Comida[]> => {
  const response = await api.get("/comida");
  return response.data;
};
