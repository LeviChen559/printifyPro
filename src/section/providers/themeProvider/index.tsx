"use client";
import { ThemeProvider } from "@emotion/react";
import globalTheme from "@/theme";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
}