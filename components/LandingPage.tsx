"use client";
import { useData } from "@/context/DataContext";

export default function LandingPage() {
  const { labels } = useData();

  return (
    <div className="flex justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Healthcare Cost Explorer</h1>
      <ul className="space-y-2">
        {labels.map((label) => (
          <li key={label.id}>
            {label.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
