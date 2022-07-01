import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import React from "react";
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [ profile, setProfile ] = useState(null)
  useEffect(() =>  {
    const jwtToken = window.localStorage.getItem('jwtToken');
    if(jwtToken){
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/profile`,
        {
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          }),
        })
        .then((res)=>{
          return res.json()
        })
        .then((json)=>{
          setProfile(json)
        })
    }
  },[])
  return (
    <ChakraProvider>
      <Navbar profile={profile}/>
      <Component {...pageProps} profile={profile} setProfile={setProfile}/>
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
