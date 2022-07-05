import { AspectRatio, Icon, Avatar, SkeletonCircle, SkeletonText, Image, Divider, Stack, Text, Heading , Box, Container, Button, Flex, Spacer } from '@chakra-ui/react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import  Comment from '../../components/Comment'
import { formatTime, formatDate } from '../../lib/utils';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { BiInfoCircle, BiSpreadsheet, BiCommentDetail, BiHomeHeart } from "react-icons/bi";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

export default function Host({host, profile}){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [ like, setLike] = useState(false)
  useEffect(()=>{
    if(!profile){
      return
    }
    console.log("useEffect")
    if(profile.data.likes[0]){
      if(profile.data.likes.map(host=> (host.host_id)).filter(id=>(id==host.info.hosts[0].host_id)).length > 0){
        console.log("true")
        setLike(true)
      }else{
        console.log("false")
        setLike(false)
      }
    }
  },[profile])
  const likeHandler = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if(!jwtToken){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '請先登入',
      })
      return
    }
    setLike(true);
    const data = {
      hostId : host.info.hosts[0].host_id
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/like`,
      {
        body: new URLSearchParams(data),
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${jwtToken}`
        }),
        method: 'POST',
      }
    )
    console.log(res)
  }
  const unlikeHandler = async () => {
    setLike(false);
    const jwtToken = localStorage.getItem('jwtToken');
    const data = {
      hostId : host.info.hosts[0].host_id
    }
    console.log(data)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/like`,
            {
                body: new URLSearchParams(data),
                headers: new Headers({
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Authorization: `Bearer ${jwtToken}`
                }),
                method: 'DELETE',
            })
    console.log(res)
  }
  if(!isLoaded) return (
    <Container maxW='960px' mb='50px'>
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    </Container>
  )
  return (
    <Container maxW='960px' mb='50px'>
      <Stack spacing={4+5} >
        <Stack>
          <Flex>
            
            <Heading as='h3' size='lg'>
            { like ? 
            <Icon as={MdFavorite} w={8} h={8} color='blue.700' pt={"1"} _hover={{color: "blue.200" }} onClick={unlikeHandler} />:
             <Icon as={MdOutlineFavoriteBorder} w={8} h={8} pt={"1"} color='blue.700' _hover={{color: "blue.200" }} onClick={likeHandler} />
            } {host.info.hosts[0].host_name}</Heading>
            <Spacer />

          </Flex> 
          <Box as='time' dateTime={host.info.hosts[0].host_create_date}>發布日期：{formatDate(host.info.hosts[0].host_create_date)}</Box>
          <Text>{host.info.hosts[0].host_description}</Text>
        </Stack>
        <Divider />
        <Flex>
          <Container maxW='480px'>
            <AspectRatio maxW='480px' ratio={4 / 3}>
              <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/${host.info.hosts[0].host_id}/${host.info.hosts[0].host_mainImage}`} />
            </AspectRatio>
          </Container>
          <Container maxW='480px'>
            <AspectRatio maxW='480px'ratio={4 / 3}>
              <GoogleMap zoom={12.5} center={{lat:host.info.hosts[0].host_lat, lng:host.info.hosts[0].host_lng}} >
                <Marker position={{lat:host.info.hosts[0].host_lat, lng:host.info.hosts[0].host_lng}}/>
              </GoogleMap>
            </AspectRatio>
          </Container>
        </Flex>
        <Divider mt={'10px'}/>
        <Heading as={'h2'} fontSize={'xl'} textAlign={'center'}><Icon as={BiInfoCircle} pt={"1"}/> 基本資訊</Heading>
        <Flex>
          <Container>
            <Stack>
              <Text >聯絡方式：{host.info.hosts[0].host_contacts}</Text>
              <Text >營業類型：{host.info.hosts[0].category_name}</Text>
              <Text >位置：{host.info.hosts[0].location_name}</Text>
              <Text >性別限制：{host.info.hosts[0].gender_name}</Text>
            </Stack>
          </Container>
          
          <Spacer />
          { host.vacants[0] && 
          <Container>
            <Text>換宿期間：</Text>
            <Text>{host.vacants[0].vacant_start_date} ~ {host.vacants[0].vacant_end_date} 需求人數：{host.vacants[0].vacant_count}</Text>
          </Container>
          }
        </Flex>
        <Divider />
        
          <Stack>
            <Heading as={'h2'} fontSize={'xl'} textAlign={'center'} mb={"15px"}><Icon as={BiSpreadsheet} pt={"1"}/> 換宿內容</Heading>
            <Flex>
              <Container maxW='960px'>
                <Text>工作內容：</Text>
                <Text>{host.info.hosts[0].host_needs}</Text>
                <Divider my={"10px"}/>
                <Text>福利：</Text>
                <Text>{host.info.hosts[0].host_benefits}</Text>
              </Container>
              { host.images[0] &&
              <Container maxW='420px'  >
                <AspectRatio maxW='420px' ratio={4 / 3}>
                  <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/${host.info.hosts[0].host_id}/${host.images[0].host_image}`} />
                </AspectRatio>
              </Container>
              }
            </Flex>
            <Container maxW='960px'>
              <Divider my={"10px"}/>
              <Text>注意事項：</Text>
              <Text>{host.info.hosts[0].host_others}</Text>
            </Container>
          </Stack>
        <Divider />
          <Heading as={'h2'} fontSize={'xl'} textAlign={'center'}><Icon as={BiCommentDetail} pt={"1"}/> 討論區</Heading>
          <Container maxW='960px'>
          { host.comments[0]  
            ? <Box>{host.comments.map(comment=> (
              <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/avatar/${comment.picture}`}
                  alt={'Author'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                  <Text fontWeight={600}>{comment.name} - {formatDate(comment.create_time)}</Text>
                  <Text color={'gray.500'} maxW='480px'>{comment.content}</Text>
                </Stack>
              </Stack>
              ) 
            )}</Box>
            : <Text>目前尚無討論，留言當第一個!</Text>
          }
          </Container>
        <Comment hostId={host.info.hosts[0].host_id}/>
      </Stack>      
    </Container>
  );
}

export async function getStaticProps(context){
  const { params } = context
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/host/${params.id}`);
  const data = await res.json();
  return {
    props: { host: data },
    revalidate: 1,
  }
}


export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/hosts/all`);
  const json = await res.json();
  const data = json.data;
  const paths = data.map(host =>{
    return {
        params: {
            id : `${host.host_id}`
        }
    }
  })
  return {
    paths,
    fallback: true,
  };
}  