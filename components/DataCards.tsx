"use client";
import type { Cost } from "@/types/types";
import { formatDollar } from "@/lib/utils";

interface DataCardsProps {
  state: string;
  costRecords: Cost[];
}

export default function DataCards({ state, costRecords }: DataCardsProps) {
  return (
    <div className="grid grid-rows-2 gap-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Average Price */}
        <div className="col-span-1 flex flex-col justify-between p-4 border border-gray-200 h-48">
          <h2 className="text-md">Average Price</h2>
          <p className="text-6xl">{formatDollar(costRecords[costRecords.length-1].percent50)}</p>
          <h3 className="text-gray-600">{state}</h3>
        </div>
        {/* Price range chart */}
        <div className="col-span-2 flex flex-col justify-between p-4 border border-gray-200 h-48">
          <h2 className="text-md">Typical Price Range</h2>
          <h3 className="text-gray-600">{state}</h3>
        </div>
      </div>
      {/* Price trends line chart */}
      <div className="flex flex-col justify-between p-4 border border-gray-200 h-72">
        <h2 className="text-md">Price Trends</h2>
        <h3 className="text-gray-600">{state}</h3>
      </div>
    </div>
  );
}
