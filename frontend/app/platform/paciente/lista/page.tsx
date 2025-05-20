import PacienteList from "@/components/ui/PacientesList";
export default function PacientesPage() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mt-8 mb-2">Lista de Pacientes</h2>
      <PacienteList />
    </div>
  );
}
