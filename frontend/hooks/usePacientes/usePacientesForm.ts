import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const pacienteSchema = z.object({
  nombres: z.string().min(1),
  apellidos: z.string().min(1),
  cedula: z.string().length(10),
  fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  telefono: z.string().length(10),
});

export type PacienteForm = z.infer<typeof pacienteSchema>;

export const usePacienteForm = () =>
  useForm<PacienteForm>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      cedula: "",
      fecha_nacimiento: "",
      telefono: "",
    },
  });
