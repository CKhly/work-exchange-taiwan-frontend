import moment from 'moment';
import NextLink from "next/link"
import { Image } from '@chakra-ui/react'
import UserStory from '../components/UserStory'
import { Icon, Center, HStack, Link, AspectRatio, Container, Divider, Wrap, Stack, Text } from '@chakra-ui/react'
import HostCard from '../components/HostCard'
import LocationCard from '../components/LocationCard'
import CategoryCard from '../components/CategoryCard'
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { BiCategory, BiMapAlt, BiHeartCircle, BiSort } from "react-icons/bi";

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/hosts/all`);
  const json = await res.json();
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/hosts/statistics`);
  const json1 = await res1.json();
  return {
    props: { 
      stats: json1
    },
    revalidate: 1,
  }
}

export default function Home({ stats }) {

  return (
    <Container maxW='1050px' mb={'50'}>
      <Center className="banner">
        {/* <Image src="/banner.jpg" width={1020} height={276} /> */}
        {/* <span>一個以整合資訊以提升台灣打工換宿環境的平台，讓小幫手可以輕易找到換宿的地方、分享換宿經驗。</span> */}
        <UserStory />
      </Center>
      <HStack mt={"25px"} mb={"10px"}>
        <Icon as={BiMapAlt} w={6} h={6}/>
        <Text fontSize='2xl' fontWeight={'bold'} mt={"7"} >探索臺灣</Text>
      </HStack>
      <Text fontSize='l' mb={"5"}>這些熱門目的地魅力無窮，等你來體驗！</Text>
      <Swiper
        slidesPerView={4.3}
        spaceBetween={30}
        freeMode={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode, Pagination]}
      >
      { stats[0] && stats[0].map(loc => (
          <SwiperSlide key={loc.name} >
            <LocationCard loc={loc} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* <HStack my={"25px"}>
        <Icon as={BiCategory} w={6} h={6}/>
        <Text fontSize='2xl' fontWeight={'bold'} my={"7"}> 依換宿類型瀏覽</Text>
      </HStack>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
      >
        { stats[1] && stats[1].map(cat => (
          <SwiperSlide key={cat.name} >
            <CategoryCard cat={cat} />
          </SwiperSlide>
        ))}
      </Swiper> */}
      <HStack my={"25px"}>
        <Icon as={BiHeartCircle} w={6} h={6}/>
        <Text fontSize='2xl' fontWeight={'bold'}>人氣收藏</Text>
      </HStack>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
      >
          {stats[2] && stats[2].map(host => (
            <SwiperSlide key={host.host_id} >
              <HostCard host={host} />
            </SwiperSlide>
          ))}
      </Swiper>
      <HStack my={"25px"}>
        <Icon as={BiSort} w={6} h={6}/>
        <Text fontSize='2xl' fontWeight={'bold'} mt={"10"}>最新發布</Text>
      </HStack>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}   
      >
          {stats[3] && stats[3].map(host => (
            <SwiperSlide key={host.host_id} margin={5}>
              <HostCard host={host} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  )
}