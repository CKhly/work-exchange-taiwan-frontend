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
    Container
  } from '@chakra-ui/react';
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'


export default function LogIn() {
    const { register, handleSubmit } = useForm();
    const [profile, setProfile] = useState();

    useEffect(() =>  {
        const jwtToken = window.localStorage.getItem('jwtToken');
        console.log("jwtToken: ",jwtToken)
        if(jwtToken){
            console.log("jwtToken: ",jwtToken)
            fetch('http://localhost:4000/api/1.0/user/profile',
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
                console.log("json:",json)
                setProfile(json.data)
            })
        }
    },[])
    const onSubmit = async (data) => {
        data.provider = 'native'
        await fetch('http://localhost:4000/api/1.0/user/login',
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
            console.log("json- ",json)
            window.localStorage.setItem('jwtToken', json.data.access_token);
            setProfile(json.data.user)
        })
        .catch((error) => window.alert(error));
    };
    return (
        <Container maxW='1030px'>
            { profile ? <div>{profile.name}</div>:   
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
                            <Link color={'blue.500'} href="/signup">還不是會員嗎？前往註冊</Link>
                        </Stack>
                        <Input type="submit" value="登入" />
                        <GoogleButton />
                        <FacebookButton />
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
                 
                
            }
        </Container>
    );
}