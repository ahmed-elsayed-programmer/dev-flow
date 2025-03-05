"use client";
import {
  ThemeProviderProps,
  ThemeProvider as NextThemeProvider,
} from "next-themes";
import React from "react";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}

export default ThemeProvider;
