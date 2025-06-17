"use client";
import { formatDollar } from "@/lib/utils";

type PriceRangeProps = {
  percent25: number;
  percent50: number;
  percent75: number;
};

export default function PriceRange({
  percent25,
  percent50,
  percent75,
}: PriceRangeProps) {
  const max = percent75 || 1;

  const getPosition = (value: number) => `${(value / max) * 100}%`;

  const points = [
    { value: percent25, label: "Low" },
    { value: percent50, label: "Average" },
    { value: percent75, label: "High" },
  ];

  return (
    <div className="px-4">
      <div className="relative h-24">
        {/* Range bar */}
        <div className="absolute bottom-10 left-0 right-0 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="absolute h-2 bg-sky-100"
            style={{
              left: getPosition(percent25),
              width: `${((percent75 - percent25) / max) * 100}%`,
            }}
          />
        </div>

        {/* Markers and labels */}
        {points.map((point, index) => (
          <div
            key={index}
            className="absolute flex flex-col items-center"
            style={{ left: `calc(${getPosition(point.value)} - 8px)` }}
          >
            <div className="text-sm font-semibold text-gray-900">
              {formatDollar(point.value)}
            </div>
            <div className="text-xs text-gray-500 mb-2">{point.label}</div>
            <div className="h-4 w-4 rounded-full bg-blue-900" />
          </div>
        ))}
      </div>
    </div>
  );
}
