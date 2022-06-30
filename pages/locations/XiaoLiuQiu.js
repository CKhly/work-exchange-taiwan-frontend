import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { AspectRatio, Link, Box, Container, Divider, Flex, Text, Stack, Wrap, Image } from '@chakra-ui/react'; 
import { useRouter } from 'next/router'
import { useState } from 'react';
import MultiFilter from '../../components/MultiFilter'
import NextLink from "next/link"
import { formatDate } from "../../lib/utils"

export default function Map({hosts}){
  const [ hover, setHover ] = useState(null)
  const [ select, setSelect ] = useState(null)
  const [ display, setDisplay ] = useState(hosts.data)
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  console.log(hosts)
  if(!isLoaded) return  <div>Loading</div>;
  else{
    return (
      <Container maxW='1200px' mb={'50px'}>
        <Flex>
          <Container width={'600px'}>
            <Box >
              <MultiFilter hosts={hosts.data} display={display} setDisplay={setDisplay}/>
            </Box>
          </Container>
          <Container >
            <AspectRatio boxShadow={'2xl'} maxW='800px' ratio={4 / 3} margin={"15px"}>
              <GoogleMap  zoom={13} center={{lat: 22.34233, lng: 120.37169}} >
                {
                 display.map(host=>(
                  <>
                    { hover == host.host_id &&
                      <InfoWindow  id={host.host_id} position={{lat: host.host_lat+0.01, lng:host.host_lng}}>
                        <Box >{host.host_name}</Box>
                      </InfoWindow>
                    }
                    <Marker key={host.host_id} onMouseOver={()=>{setHover(host.host_id )}} onMouseLeave={()=>{setHover(host.host_id )}} position={{lat: host.host_lat, lng:host.host_lng}}  animation={hover == host.host_id ? google.maps.Animation.BOUNCE : null} onClick={()=>{ router.push("/hosts/" +  host.host_id)}} />
                  </>
                    
                  ))
                }
              </GoogleMap>
            </AspectRatio>
          </Container>
        </Flex>
        <Divider mt={"10px"}/>
        <Container maxW='1080px'>
          <Stack mt={1} spacing={3}>
            <Text fontSize='xl' mt='10px' fontWeight={'bold'}>篩選結果：</Text>
            <Text>總共有 {display.length} 筆篩選節果</Text>
            <Wrap spacing='28px' pb={"100px"}>
              {display.map(host => (
                <Box  boxShadow={'2xl'} minW='xs' maxW='2xl' borderWidth='1px' borderRadius='lg' overflow='hidden' m={5} key={host.host_id} onMouseEnter={() => {setHover(host.host_id )}} onMouseLeave={() => {setHover(null)}}> 
                  <NextLink href={'/hosts/' + host.host_id} passHref>
                    <Link >
                      <AspectRatio maxW='400px' ratio={4 / 3}>
                      <Image src={`http://54.238.19.98:4000/assets/${host.host_id}/${host.host_mainImage}`} />
                      </AspectRatio>
                      {/* <img src={`http://localhost:4000/assets/${host.host_id}/${host.host_mainImage}`} width={100} alt="" /> */}
                      <Box p='6'>
                      <Box
                          mt='1'
                          fontWeight='semibold'
                          as='h4'
                          lineHeight='tight'
                          noOfLines={1}
                      >
                          { host.host_name }
                      </Box>
                      <Box>
                          { host.host_location }
                      </Box>
                      <Box as='span' color='gray.600' fontSize='sm'>
                          { formatDate(host.host_create_date) }
                      </Box>
                      </Box>
                    </Link>      
                  </NextLink>
                </Box>    
              ))}
            </Wrap>
          </Stack>
        </Container>
      </Container>
    )           
  }
}

export async function getStaticProps(context){
  const { params } = context
  const res = await fetch(`http://54.238.19.98:4000/api/1.0/hosts/XiaoLiuQiu`);
  const data = await res.json();
  console.log(data)
  return {
    props: { hosts: data }
  }
}