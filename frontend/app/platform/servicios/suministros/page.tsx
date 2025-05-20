import CreateSuministroForm from "@/components/forms/CreateSuministrosForm";

export default function SuministroPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Registrar Suministro de Medicamento
      </h1>
      <CreateSuministroForm />
    </div>
  );
}
