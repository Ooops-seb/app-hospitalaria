import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const procedimientoSchema = z.object({
  descripcion: z.string().min(1),
  registro: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  precio: z.coerce.number().positive(),
  medico_asignado: z.string().min(1),
  procedimiento: z.string().min(1),
});

export type ProcedimientoForm = z.infer<typeof procedimientoSchema>;

export const useProcedimientoForm = () =>
  useForm<ProcedimientoForm>({
    resolver: zodResolver(procedimientoSchema),
    defaultValues: {
      descripcion: "",
      registro: new Date().toISOString().slice(0, 10),
      precio: 0,
      medico_asignado: "",
      procedimiento: "",
    },
  });
