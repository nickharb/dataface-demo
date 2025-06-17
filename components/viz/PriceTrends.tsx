"use client";
import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { extent } from "d3-array";
import type { Cost } from "@/types/types";

type PriceTrendsProps = {
  records: Cost[];
};

export default function PriceTrends({ records }: PriceTrendsProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  console.log(records);

  useEffect(() => {
    if (!plotRef.current) return;

    // Sort by year ascending
    const data = [...records]
      .filter((r) => r.year && r.percent50)
      .sort((a, b) => a.year - b.year)
      .map((r) => ({
        year: r.year,
        median: r.percent50,
      }));

    const plot = Plot.plot({
      width: 900,
      height: 220,
      x: {
        type: "linear",
        label: null,
        ticks: data.map((d) => d.year),
        tickFormat: (d) => String(d),
        domain: extent(data, (d) => d.year),
      },
      y: {
        label: null,
        tickFormat: (d) => `$${d}`,
      },
      marks: [
        Plot.line(data, {
          x: "year",
          y: "median",
          stroke: "#003049",
          strokeWidth: 3,
          curve: "natural",
        }),
      ],
    });

    // Clear existing chart and render new one
    plotRef.current.innerHTML = "";
    plotRef.current.appendChild(plot);
  }, [records]);

  return (
    <div className="px-4">
      <div ref={plotRef} />
    </div>
  );
}
