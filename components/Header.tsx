"use client";

import StateSelect from "@/components/ui/StateSelect";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h1 className="text-md font-semibold">Medical Cost Explorer</h1>
      <StateSelect />
    </header>
  );
}
