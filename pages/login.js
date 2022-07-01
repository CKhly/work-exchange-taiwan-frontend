import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    Container,
    Spacer
  } from '@chakra-ui/react';
import GoogleButton from '../components/GoogleButton'
import FacebookButton from '../components/FacebookButton'
import Signup from '../components/Signup'
import { useRouter} from 'next/router';

export default function LogIn({setProfile}) {
    const [ isLogin, setIsLogin ] = useState(true);
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        data.provider = 'native'
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
        .catch((error) => window.alert(error));
    };
    return (
        <Container maxW='1030px'>
            {
                isLogin ? 
                <form onSubmit={handleSubmit(onSubmit)}>
                <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                    <Flex p={4} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>登入</Heading>
                        <Heading fontSize={''}>登入即可收藏、提供換宿機會與參與評論！</Heading>
                        <FormControl id="email">
                        <FormLabel>輸入信箱</FormLabel>
                        <Input placeholder="test@gmail.com" type="email" {...register("email", { required: true })}/>
                        </FormControl>
                        <FormControl id="password"  >
                        <FormLabel>輸入密碼</FormLabel>
                        <Input type="password" {...register("password", { required: true })}/>
                        </FormControl>
                        <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Link color={'blue.500'}>忘記密碼</Link>
                            <Link color={'blue.500'} onClick={()=>{setIsLogin(false)}}>還不是會員嗎？前往註冊</Link>
                        </Stack>
                        <Input type="submit" value="登入" />
                        <Flex>
                            <GoogleButton setProfile={setProfile}/>
                            <Spacer />
                            <FacebookButton setProfile={setProfile}/>
                        </Flex>
                        
                        </Stack>
                    </Stack>
                    </Flex>
                    <Flex flex={1}>
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src="/login.jpg"
                    />
                    </Flex>
                </Stack>
                </form>
                : <Signup setIsLogin={setIsLogin} />
            }   
        </Container>
    );
}