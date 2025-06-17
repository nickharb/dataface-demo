import { ReactNode } from "react";

export default function ProcedureLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
