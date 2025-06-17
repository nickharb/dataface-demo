"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getLabels, getCosts } from "@/lib/data";
import type { Label, Cost } from "@/types/types";

type MergedProcedureData = {
  label: Label;
  costRecords: Cost[];
} | null;

type DataContextType = {
  labels: Label[];
  costs: Cost[];
  getMergedProcedureData: (procedureSlug: string, state: string) => MergedProcedureData;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [costs, setCosts] = useState<Cost[]>([]);

  useEffect(() => {
    async function loadData() {
      const [labelsData, costsData] = await Promise.all([getLabels(), getCosts()]);
      setLabels(labelsData);
      setCosts(costsData);
    }
    loadData();
  }, []);

  const getMergedProcedureData = (procedureSlug: string, state: string) => {
    const label = labels.find((l) => l.slug === procedureSlug);
    if (!label) return null;

    const costRecords = costs.filter(
      (c) =>
        c.id === label.id &&
        c.geo_level.toLowerCase() === state.toLowerCase()
    );

    return { label, costRecords };
  };

  return (
    <DataContext.Provider value={{ labels, costs, getMergedProcedureData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
