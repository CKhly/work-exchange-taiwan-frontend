import { Heading, Avatar,  Box,  Container,  Divider,  Text,  Stack,  Button,  Link,  Badge,  useColorModeValue,  Wrap,  Flex,  Input,  Tabs,  Tab,  TabList,  TabPanels,  TabPanel} from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatTime } from '../lib/utils';
import HostCard from '../components/HostCard';
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

export default function Profile({profile, setProfile}) {
  console.log("profile: ", profile)
  useEffect(() =>  {
    console.log("profile")
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
          console.log(json)
        })
    }
  },[])
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem('jwtToken');
    const formData = new FormData;
    formData.append("avatar", data.avatar[0]);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/avatar`,
    {
      body: formData,
      headers: new Headers({
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${jwtToken}`
      }),
      method: 'POST',
    }).then(
      router.push("/")
    )
  };
  const signOutHandler = ()=>{
    localStorage.removeItem('jwtToken');
    setProfile(null)
    router.push("/")
  }
  return (
    <Container py={6} maxW='1080px' height={'80vh'}>
      {
        profile ? 
        <Flex spacing={'20px'}>
          <Box
          maxW={'320px'}
          w={'320px'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          height={'480px'}>
          <Avatar
            size={'xl'}
            src={
              `${profile.data.picture}`
            }
            alt={'Avatar Alt'}
            mb={4}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {profile.data.name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {profile.data.email}
          </Text>
          {/* <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
              {
                profile.data.introduction ? <Text> {profile.data.introduction} </Text> : <form onSubmit={handleSubmit(onSubmit)}><Input type="file" name="avatar" id="avatar"  {...register("avatar")} /><Input type="submit" value={"新增頭貼"}/> </form>
              }
          </Text> */}
          <Divider mt={'30px'} mb={'30px'}/>
          <Button onClick={signOutHandler}>登出</Button>
        </Box> 
        <Container w={'1000px'} boxShadow={'xl'}>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>我的收藏</Tab>
              <Tab>我的留言</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              <Swiper
                slidesPerView={1.5}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode, Pagination]}
              >
                {profile.data.likes[0] && profile.data.likes.map(host=>(
                  <SwiperSlide key={host.host_id} >
                    <HostCard host={host} />
                  </SwiperSlide>
                  
                ))}
              </Swiper>
              </TabPanel>
              <TabPanel>
                {profile.data.comments.map(comment=>(
                  <Link href={'/hosts/' + comment.host_id} >
                    <Box key={comment.comment_id}> {formatTime(comment.create_time)} -  {comment.content}</Box>
                  </Link>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>          
        </Container>
      </Flex> :
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
      }
    </Container>  
  ) 
}
