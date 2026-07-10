"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  twGradient: string;
  setTwGradient: (v: string) => void;
};

const GraduateProgramFormVisualContext = createContext<Ctx | null>(null);

export function GraduateProgramFormVisualProvider({
  children,
  defaultTwGradient,
}: {
  children: ReactNode;
  defaultTwGradient: string;
}) {
  const [twGradient, setTwGradientState] = useState(
    () => defaultTwGradient.trim() || "from-[#254151] to-[#6096b4]",
  );
  const setTwGradient = useCallback((v: string) => {
    setTwGradientState(v);
  }, []);
  const value = useMemo(
    () => ({ twGradient, setTwGradient }),
    [twGradient, setTwGradient],
  );
  return (
    <GraduateProgramFormVisualContext.Provider value={value}>
      {children}
    </GraduateProgramFormVisualContext.Provider>
  );
}

export function useGraduateProgramFormVisual(): Ctx {
  const ctx = useContext(GraduateProgramFormVisualContext);
  if (!ctx) {
    throw new Error(
      "useGraduateProgramFormVisual must be used within GraduateProgramFormVisualProvider",
    );
  }
  return ctx;
}
