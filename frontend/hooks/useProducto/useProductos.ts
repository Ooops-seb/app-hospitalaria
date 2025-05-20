import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const productoSchema = z.object({
  descripcion: z.string().min(1),
  precio: z.coerce.number().positive(),
});

export type ProductoForm = z.infer<typeof productoSchema>;

export const useProductoForm = () =>
  useForm<ProductoForm>({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      descripcion: "",
      precio: 0,
    },
  });
