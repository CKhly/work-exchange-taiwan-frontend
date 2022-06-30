import { FaFacebook } from 'react-icons/fa';
import { Button, Center, Text } from '@chakra-ui/react';
import FacebookLogin from "react-facebook-login";
import { useRouter} from 'next/router';
export default function FacebookButton({setProfile}) {
  const router = useRouter();
  const responseFacebook = async (response) => {
    console.log(response);
    const data = {
      provider: 'facebook',
      access_token: response.accessToken,
    }
    await fetch('http://localhost:4000/api/1.0/user/login',
      {
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
          return fetch('http://localhost:4000/api/1.0/user/profile',
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
  // const  responseFacebook = data => {
  //   console.log(data);
  // };
  return (
    <Center>
      <FacebookLogin
        appId="595338441463499"
        autoLoad={false}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
      />
      {/* <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v14.0&appId=595338441463499&autoLogAppEvents=1" nonce="mtGgPIUu"></script>
      <div class="fb-login-button" data-width="" data-size="medium" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
    </Center>
  );
}