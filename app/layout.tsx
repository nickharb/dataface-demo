import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Healthcare Cost Explorer",
  description: "A simple healthcare cost explorer application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <Header />
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
