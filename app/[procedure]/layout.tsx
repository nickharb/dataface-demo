import { ReactNode } from "react";

export default function ProcedureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[960px]">{children}</div>
    </div>
  );
}
