import { FaFacebook } from 'react-icons/fa';
import { Center } from '@chakra-ui/react';
import FacebookLogin from "react-facebook-login";
import { useRouter} from 'next/router';
export default function FacebookButton({setProfile}) {
  const router = useRouter();
  const responseFacebook = async (response) => {
    const data = {
      provider: 'facebook',
      access_token: response.accessToken,
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/login`,
      {
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'POST',
      })
      .then((res)=>{
        return res.json()
      })
      .then((json)=>{
        window.localStorage.setItem('jwtToken', json.data.access_token);
        return json.data.access_token
      })
      .then((jwtToken)=>{
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
  };

  return (
    <Center ml={"10px"} borderRadius={"xl"}>
        <FacebookLogin
          appId={process.env.NEXT_PUBLIC_FACEBOOK_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          size={"small"}
          textButton={"以 FACEBOOK 登入"}
        />
    </Center>
  );
}