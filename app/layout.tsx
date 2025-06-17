import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";

export const metadata: Metadata = {
  title: "Healthcare Cost Explorer",
  description: "A simple healthcare cost explorer application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
