import Papa from "papaparse";
import type { Label, Cost } from "@/types/types";

export async function fetchCSV<T>(relativePath: string): Promise<T[]> {
  const res = await fetch(relativePath);
  const text = await res.text();
  const { data } = Papa.parse<T>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  return data;
}

export async function getLabels(): Promise<Label[]> {
  return await fetchCSV<Label>("/data/labels.csv");
}

export async function getCosts(): Promise<Cost[]> {
  return await fetchCSV<Cost>("/data/cost.csv");
}
