import api from "@/lib/api";

export type ProductType = "comida" | "hospedaje" | "";

export interface ProductFormData {
  descripcion: string;
  precio: number;
  valor_nutritivo?: string;
  tipo?: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
}

export interface ProductList {
  id: number;
  descripcion: string;
  precio: number;
  valor_nutritivo?: null | string;
  tipo?: string;
  tipo_producto: TipoProducto;
  fecha_ingreso?: Date;
  fecha_salida?: Date;
}

export const crearProductoComida = async (data: ProductFormData) => {
  const response = await api.post("/productos/comida", data);
  return response.data;
};

export const crearProductoHospedaje = async (data: ProductFormData) => {
  const response = await api.post("/productos/hospedaje", data);
  return response.data;
};

export const obtenerComidas = async (): Promise<ProductList[]> => {
  const response = await api.get("/productos/list");
  return response.data;
};

export enum TipoProducto {
  Comida = "comida",
  Hospedaje = "hospedaje",
}
