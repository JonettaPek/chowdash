"use client"

import { ApolloProvider } from '@apollo/client';
import { HeroUIProvider } from '@heroui/react'
import {ThemeProvider as NextThemesProvider} from "next-themes"; // NextThemesProvider is a client component
import { IconContext } from 'react-icons';
import { graphqlClient } from '../graphql/graphqlClient';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <HeroUIProvider>
          <IconContext.Provider value={{ size: 30, className: "cursor-pointer" }}>
            {children}
          </IconContext.Provider>
        </HeroUIProvider>
      </NextThemesProvider>
    </ApolloProvider>
  )
}