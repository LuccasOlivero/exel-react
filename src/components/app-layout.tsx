import Table from "./table";

export default function AppLayout() {
  return (
    <div className="relative h-full w-full bg-slate-200">
      <h1 className="text-2xl text-green-600 font-normal text-start p4">
        🟩 Exel-React
      </h1>

      <div>
        <Table />
      </div>
    </div>
  );
}
