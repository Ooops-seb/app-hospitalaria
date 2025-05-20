import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const facturaSchema = z.object({
  clave_acceso: z.string().min(10),
  documento_id: z.coerce.number().int().positive(),
});

export type FacturaForm = z.infer<typeof facturaSchema>;

export const useFacturaForm = () =>
  useForm<FacturaForm>({
    resolver: zodResolver(facturaSchema),
    defaultValues: {
      clave_acceso: "",
      documento_id: 1,
    },
  });
