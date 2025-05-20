import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const servicioSchema = z.object({
  descripcion: z.string().min(1),
  precio: z.coerce.number().positive(),
  registro: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type ServicioForm = z.infer<typeof servicioSchema>;

export const useServicioForm = () =>
  useForm<ServicioForm>({
    resolver: zodResolver(servicioSchema),
    defaultValues: {
      descripcion: "",
      precio: 0,
      registro: new Date().toISOString().slice(0, 10),
    },
  });
