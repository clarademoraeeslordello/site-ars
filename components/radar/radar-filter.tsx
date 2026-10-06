"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type RadarFilter = { standard: string | null; setStandard: (standard: string | null) => void };

const Context = createContext<RadarFilter | null>(null);

/** Shares the selected standard between the article list and the "monitored standards" chips. */
export function RadarFilterProvider({ children }: { children: ReactNode }) {
  const [standard, setStandard] = useState<string | null>(null);
  return <Context.Provider value={{ standard, setStandard }}>{children}</Context.Provider>;
}

export function useRadarFilter() {
  const value = useContext(Context);
  if (!value) throw new Error("useRadarFilter must be used inside RadarFilterProvider");
  return value;
}
