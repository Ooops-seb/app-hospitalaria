// hooks/useDocumentoForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const documentoSchema = z.object({
  nro: z.number().int().positive(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  valor: z.number().positive(),
  paciente_id: z.number().int().positive(),
});

export type DocumentoForm = z.infer<typeof documentoSchema>;

export const useDocumentoForm = () =>
  useForm<DocumentoForm>({
    resolver: zodResolver(documentoSchema),
    defaultValues: {
      nro: 0,
      fecha: new Date().toISOString().slice(0, 10),
      valor: 0,
      paciente_id: 1, // lo puedes cambiar dinámicamente
    },
  });
