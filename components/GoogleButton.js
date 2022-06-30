import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';
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
    await fetch('http://54.238.19.98:4000/api/1.0/user/login', {
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
      return fetch('http://54.238.19.98:4000/api/1.0/user/profile',
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
      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_ID,
        callback: handleCallbackResponse
      })
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      )
    },100)
  },[])

  return (
      <Center>
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" async defer />
        <div id={"signInDiv"}></div> 
      </Center>
  );
}