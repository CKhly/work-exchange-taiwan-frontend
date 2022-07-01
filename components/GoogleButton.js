import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text,Box,  Input } from '@chakra-ui/react';
import { GoogleLogin } from 'react-google-login'
import Script from 'next/script'
import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter} from 'next/router';



export default function GoogleButton({setProfile}) {
  const handleCallbackResponse = async (response) => {
    const data = {
      provider: 'google',
      access_token: response.credential,
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/login`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    })
    .then((res)=>{
      console.log(res)
      return res.json()
    })
    .then((json)=>{
      console.log("json: ",json)
      window.localStorage.setItem('jwtToken', json.data.access_token);
      return json.data.access_token
    })
    .then((jwtToken)=>{
      console.log("jwtToken", jwtToken)
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/profile`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        }),
      })
    })
    .then((res)=>{
      return res.json()
    })
    .then((json)=>{
      setProfile(json)
    })
    .then(
      router.push('/')
    )
  }

  const router = useRouter();
  useEffect(() =>{
    setTimeout(()=>{
      // console.log(process.env.NEXT_PUBLIC_GOOGLE_ID)
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
        callback: handleCallbackResponse
      })
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      )
    },300)
  },[])

  return (
      <Center>
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" async defer />
        <Box width={"100%"} id={"signInDiv"}></Box> 
      </Center>
  );
}