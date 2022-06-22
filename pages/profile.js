import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import Login from "../components/login"

export default function Profile() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [ login, isLogin] = useState(true)

  return (
    <>
      {login && <Login />} 
      <span>
        You are not signed in
      </span>
      <a
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
      >
        Sign in
      </a>
    </>
)  
}