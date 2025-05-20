import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const lineaSchema = z.object({
  cantidad: z.coerce.number().int().positive(),
  precio_unitario: z.coerce.number().positive(),
  factura_id: z.coerce.number().int().positive(),
  producto_id: z.coerce.number().int().positive().optional().nullable(),
  servicio_id: z.coerce.number().int().positive().optional().nullable(),
});

export type LineaForm = z.infer<typeof lineaSchema>;

export const useLineaForm = () =>
  useForm<LineaForm>({
    resolver: zodResolver(lineaSchema),
    defaultValues: {
      cantidad: 1,
      precio_unitario: 0,
      factura_id: 1,
      producto_id: null,
      servicio_id: null,
    },
  });
