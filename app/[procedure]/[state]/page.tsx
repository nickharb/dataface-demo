"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import DataCards from "@/components/DataCards";
import FilterSelect from "@/components/ui/FilterSelect";

export default function ProcedurePage() {
  const params = useParams();
  const procedure = params?.procedure as string;
  const state = params?.state as string;

  const { getMergedProcedureData } = useData();
  const data = getMergedProcedureData(procedure, state);

  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Fallbacks for hook safety
  const label = data?.label;
  const costRecords = useMemo(() => data?.costRecords ?? [], [data]);

  const insuranceOptions = useMemo(() => {
    return Array.from(new Set(costRecords.map((r) => r.insurance_type))).sort();
  }, [costRecords]);

  const sourceOptions = useMemo(() => {
    return Array.from(new Set(costRecords.map((r) => r.source))).sort();
  }, [costRecords]);

  const filteredRecords = useMemo(() => {
    return costRecords.filter((record) => {
      return (
        (!selectedInsurance || record.insurance_type === selectedInsurance) &&
        (!selectedSource || record.source === selectedSource)
      );
    });
  }, [costRecords, selectedInsurance, selectedSource]);

  if (!data || !label) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Procedure not found</h1>
        <p className="text-gray-600">We couldn’t find data for that combination.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{label.label} Costs in {state}</h1>
      <div className="flex gap-4 mb-6">
        <FilterSelect
          label="Insurance"
          options={insuranceOptions}
          value={selectedInsurance}
          onChange={setSelectedInsurance}
        />
        <FilterSelect
          label="Source"
          options={sourceOptions}
          value={selectedSource}
          onChange={setSelectedSource}
        />
      </div>
      <DataCards state={state} records={filteredRecords} />
    </div>
  );
}
