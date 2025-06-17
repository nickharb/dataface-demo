"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
// import type { Cost } from "@/types/types";
import DataCards from "@/components/DataCards";

export default function ProcedurePage() {
  const params = useParams();
  const procedure = params?.procedure as string;
  const state = params?.state as string;

  const { getMergedProcedureData } = useData();
  const data = getMergedProcedureData(procedure, state);
  console.log(data);

  if (!data) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Procedure not found</h1>
        <p className="text-gray-600">We couldn’t find data for that combination.</p>
      </div>
    );
  }

  const { label, costRecords } = data;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{label.label} Costs in {state}</h1>
      <DataCards state={state} costRecords={costRecords} />
    </div>
  );
}
