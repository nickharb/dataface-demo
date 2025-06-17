"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import { useRouter, usePathname } from "next/navigation";
import { useData } from "@/context/DataContext";
import { useEffect, useMemo, useState } from "react";

export default function StateSelect() {
  const { costs } = useData();
  const router = useRouter();
  const pathname = usePathname();

  const currentProcedure = pathname.split("/")[1];
  const currentState = pathname.split("/")[2];

  const [selected, setSelected] = useState(currentState);

  const stateOptions = useMemo(() => {
    return Array.from(new Set(costs.map((c) => c.geo_level))).sort();
  }, [costs]);

  useEffect(() => {
    setSelected(currentState);
  }, [currentState]);

  const handleChange = (newState: string) => {
    setSelected(newState);
    router.push(`/${currentProcedure}/${newState}`);
  };

  return (
    <Select onValueChange={handleChange} value={selected}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Select State" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {stateOptions.map((state) => (
          <SelectItem key={state} value={state}>
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
