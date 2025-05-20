import api from "@/lib/api";

export interface DocumentoTransaccionalDto {
  nro: number;
  fecha: string;
  valor: number;
  paciente_id: number;
}

export const crearDocumentoTransaccional = async (
  data: DocumentoTransaccionalDto,
) => {
  const response = await api.post("/documento_transaccional", data);
  return response.data;
};
// lib/api/documentoTransaccional.ts
export const obtenerDocumentosTransaccionales = async () => {
  const response = await api.get("/documento_transaccional");
  return response.data;
};
