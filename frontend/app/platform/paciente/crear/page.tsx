import CreatePacienteForm from "@/components/forms/CreatePacienteForm";

export default function PacientesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registrar Paciente</h1>
      <CreatePacienteForm />
    </div>
  );
}
