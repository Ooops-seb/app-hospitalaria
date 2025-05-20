"use client";

import { useComidaForm } from "@/hooks/useProducto/useComidaForm";
import { crearComida } from "@/lib/api/producto";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

export default function CreateComidaForm() {
  const form = useComidaForm();

  const onSubmit = async (data: {
    descripcion: string;
    precio: number;
    valorNutri: string;
    tipo: string;
  }) => {
    try {
      const res = await crearComida({
        ...data,
        type: "Comida",
      });

      console.log("Comida creada:", res);
      form.reset();
    } catch (error) {
      console.error("Error creando comida:", error);
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
        <FormField
          name="valorNutri"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Nutritivo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="tipo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de comida</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registrar Comida</Button>
      </form>
    </Form>
  );
}
