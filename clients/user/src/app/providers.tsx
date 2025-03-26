"use client"

import { HeroUIProvider } from '@heroui/react'
import {ThemeProvider as NextThemesProvider} from "next-themes"; // NextThemesProvider is a client component

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <HeroUIProvider>
          {children}
      </HeroUIProvider>
    </NextThemesProvider>
  )
}