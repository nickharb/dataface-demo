"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import type { Cost } from "@/types/types";

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
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">City</th>
            <th className="px-4 py-2 border-b">Insurance Type</th>
            <th className="px-4 py-2 border-b">Source</th>
            <th className="px-4 py-2 border-b">Year</th>
            <th className="px-4 py-2 border-b">Cost (50%)</th>
          </tr>
        </thead>
        <tbody>
          {costRecords.map((record: Cost, idx: number) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{record.geo_level}</td>
              <td className="px-4 py-2 border-b">{record.insurance_type}</td>
              <td className="px-4 py-2 border-b">{record.source}</td>
              <td className="px-4 py-2 border-b">{record.year}</td>
              <td className="px-4 py-2 border-b">${record.percent50}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
