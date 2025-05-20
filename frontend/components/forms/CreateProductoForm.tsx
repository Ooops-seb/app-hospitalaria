"use client";

import { useProductoForm } from "@/hooks/useProducto/useProductos";
import { crearProducto } from "@/lib/api/producto";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

export default function CreateProductoForm() {
  const form = useProductoForm();

  const onSubmit = async (data: { descripcion: string; precio: number }) => {
    try {
      const res = await crearProducto(data);
      console.log("Producto creado:", res);
      form.reset();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="descripcion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="precio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear Producto</Button>
      </form>
    </Form>
  );
}
