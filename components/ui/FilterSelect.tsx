"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";

type FilterSelectProps = {
  label: string;
  options: string[];
  value: string | null;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function FilterSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col space-y-1 w-[200px]">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <Select onValueChange={onChange} value={value ?? ""}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder || `Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
