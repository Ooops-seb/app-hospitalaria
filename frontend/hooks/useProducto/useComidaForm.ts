import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const comidaSchema = z.object({
  descripcion: z.string().min(1),
  precio: z.coerce.number().positive(),
  valorNutri: z.string().min(1), // ✅ corregido
  tipo: z.string().min(1),
});

export type ComidaForm = z.infer<typeof comidaSchema>;

export const useComidaForm = () =>
  useForm<ComidaForm>({
    resolver: zodResolver(comidaSchema),
    defaultValues: {
      descripcion: "",
      precio: 0,
      valorNutri: "",
      tipo: "",
    },
  });
