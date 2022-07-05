import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function SignupCard({setIsLogin}) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    data.role="3";
    Swal.fire({
      icon: 'success',
      title: '註冊成功，將帶您前往登入頁！',
      showConfirmButton: false,
      timer: 1500
    })
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/signup`,
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
    .then(()=>{
      router.reload()
    })
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      // bg={useColorModeValue('gray.50', 'gray.800')}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            註冊
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            加入我們，一起讓台灣打工換宿環境更好 ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>輸入稱謂</FormLabel>
              <Input type="text" {...register("name", { required: true })}/>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>輸入信箱
              </FormLabel>
              <Input type="email" {...register("email", { required: true })}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>輸入密碼</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={4} pt={2}>
              <Input
                type="submit"
                value="註冊"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} />
                <Center>
                  <GoogleButton />
                </Center>
                <FacebookButton />
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                已經是會員了嗎？ <Link color={'blue.400'} onClick={()=>{setIsLogin(true)}} >前往登入</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </form> 
  );
}