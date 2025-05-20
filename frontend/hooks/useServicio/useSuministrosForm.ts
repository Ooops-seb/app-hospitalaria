import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const suministroSchema = z.object({
  descripcion: z.string().min(1, "Descripción obligatoria"),
  registro: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  precio: z.coerce.number().positive(),
  tipo_suministro: z.string().min(1, "Tipo obligatorio"),
});

export type SuministroForm = z.infer<typeof suministroSchema>;

export const useSuministroForm = () =>
  useForm<SuministroForm>({
    resolver: zodResolver(suministroSchema),
    defaultValues: {
      descripcion: "",
      registro: new Date().toISOString().slice(0, 10),
      precio: 0,
      tipo_suministro: "",
    },
  });
