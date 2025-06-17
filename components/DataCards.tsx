"use client";
import type { Cost } from "@/types/types";
import { formatDollar } from "@/lib/utils";
import { MapPin } from "lucide-react";
import PriceRange from "@/components/viz/PriceRange";
import PriceTrends from "@/components/viz/PriceTrends";

interface DataCardsProps {
  state: string;
  records: Cost[];
}

export default function DataCards({ state, records }: DataCardsProps) {
  if (!records || records.length === 0) {
    return (
      <div className="py-8">
        <h1 className="text-xl font-bold">Procedure not found</h1>
        <p className="text-gray-600">We couldn’t find data for that combination.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Average Price */}
        <div className="col-span-1 flex flex-col justify-between p-4 border border-gray-200 h-48">
          <h2 className="text-md">Average Price</h2>
          <p className="text-6xl">{formatDollar(records[records.length-1].percent50)}</p>
          <h3 className="text-gray-600 flex gap-1 items-center"><MapPin className="w-4 h-4 text-sky-700" />{state}</h3>
        </div>
        {/* Price range chart */}
        <div className="col-span-2 flex flex-col justify-between p-4 border border-gray-200 h-48">
          <h2 className="text-md">Typical Price Range</h2>
          <PriceRange
            percent25={records[records.length-1].percent25}
            percent50={records[records.length-1].percent50}
            percent75={records[records.length-1].percent75}
          />
          <h3 className="text-gray-600 flex gap-1 items-center"><MapPin className="w-4 h-4 text-sky-700" />{state}</h3>
        </div>
      </div>
      {/* Price trends line chart */}
      <div className="flex flex-col justify-between p-4 border border-gray-200 h-72">
        <h2 className="text-md">Price Trends</h2>
        <PriceTrends records={records} />
        <h3 className="text-gray-600 flex gap-1 items-center"><MapPin className="w-4 h-4 text-sky-700" />{state}</h3>
      </div>
    </div>
  );
}
