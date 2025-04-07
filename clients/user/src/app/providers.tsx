"use client"

import { HeroUIProvider } from '@heroui/react'
import {ThemeProvider as NextThemesProvider} from "next-themes"; // NextThemesProvider is a client component
import { IconContext } from 'react-icons';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <HeroUIProvider>
        <IconContext.Provider value={{ size: 30, className: "cursor-pointer" }}>
          {children}
        </IconContext.Provider>
      </HeroUIProvider>
    </NextThemesProvider>
  )
}