import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
