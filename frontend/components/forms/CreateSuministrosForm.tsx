"use client";

import { useSuministroForm } from "@/hooks/useServicio/useSuministrosForm";
import { crearSuministro } from "@/lib/api/suministros";
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

export default function CreateSuministroForm() {
  const form = useSuministroForm();

  const onSubmit = async (data: {
    descripcion: string;
    precio: number;
    registro: string;
    tipo_suministro: string;
  }) => {
    try {
      const res = await crearSuministro(data);
      console.log("Suministro creado:", res);
      form.reset();
    } catch (error) {
      console.error("Error creando suministro:", error);
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
          name="registro"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Registro</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
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
          name="tipo_suministro"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Suministro</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registrar Suministro</Button>
      </form>
    </Form>
  );
}
