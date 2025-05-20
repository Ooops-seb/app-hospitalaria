"use client";

import { useProcedimientoForm } from "@/hooks/useServicio/useProcedimientoForm";
import { crearProcedimientoMedico } from "@/lib/api/servicios";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/ui/form";

export default function CreateProcedimientoForm() {
  const form = useProcedimientoForm();

  const onSubmit = async (data: {
    descripcion: string;
    registro: string;
    precio: number;
    medico_asignado: string;
    procedimiento: string;
  }) => {
    try {
      const res = await crearProcedimientoMedico(data);
      console.log("Procedimiento médico creado:", res);
      form.reset();
    } catch (error) {
      console.error("Error creando procedimiento médico:", error);
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
          name="medico_asignado"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médico a Cargo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="procedimiento"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Procedimiento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registrar Procedimiento</Button>
      </form>
    </Form>
  );
}
