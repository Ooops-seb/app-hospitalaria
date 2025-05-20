"use client";

import { useDocumentoForm } from "@/hooks/useDocTransaccional/useDocForm";
import { crearDocumentoTransaccional } from "@/lib/api/doctransaccional";
import { usePacientes } from "@/hooks/usePacientes/usePacientes";
import type { Paciente } from "@/hooks/usePacientes/usePacientes";

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

export default function CreateDocumentoForm() {
  const form = useDocumentoForm();
  const { pacientes } = usePacientes();

  const onSubmit = async (data: {
    nro: number;
    fecha: string;
    valor: number;
    paciente_id: number;
  }) => {
    try {
      const res = await crearDocumentoTransaccional(data);
      console.log("Documento creado:", res);
      form.reset();
    } catch (error) {
      console.error("Error creando documento:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paciente_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paciente</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border rounded px-2 py-1"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  <option value="">Seleccione un paciente</option>
                  {pacientes.map((p: Paciente) => (
                    <option key={p.id} value={p.id}>
                      #{p.id} - {p.nombres} {p.apellidos}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Crear Documento</Button>
      </form>
    </Form>
  );
}
