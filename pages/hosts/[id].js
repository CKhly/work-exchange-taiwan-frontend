import { AspectRatio, Image, Divider, Stack, Text, Heading , Box, Container, Button, Flex, Spacer } from '@chakra-ui/react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function Host({host}){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if(!isLoaded) return  <div>Loading</div>;
  return (
    <Container maxW='960px' mb='50px'>
      <Stack spacing={3}>
        <Flex>
          <Heading as='h3' size='lg'>{host.info.hosts[0].host_name}</Heading>
          <Spacer />
          <Text as='u'>發布日期：{host.info.hosts[0].host_create_date}</Text>
        </Flex> 
        <Divider />
        <Flex>
          <Container maxW='480px'>
            <AspectRatio maxW='480px' ratio={4 / 3}>
              <Image src={`http://localhost:4000/assets/${host.info.hosts[0].host_id}/${host.info.hosts[0].host_mainImage}`} />
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
        <Divider/>
        <Heading as={'h2'} fontSize={'xl'} textAlign={'center'}>基本資訊</Heading>
        <Text>單位介紹：{host.info.hosts[0].host_description}</Text>
        <Text >聯絡方式：{host.info.hosts[0].host_contacts}</Text>
        <Text >{host.info.hosts[0].host_category}</Text>
        <Text >位置：{host.info.hosts[0].host_location}</Text>
        <Text >性別限制：{host.info.hosts[0].host_gender_needs}</Text>
        <Divider />
        <Heading as={'h2'} fontSize={'xl'} textAlign={'center'}>換宿內容</Heading>
        <Text>工作內容：</Text>
        <Text>{host.info.hosts[0].host_needs}</Text>
        <Divider />
        <Text>福利：</Text>
        <Text>{host.info.hosts[0].host_benefits}</Text>
        <Divider />
        <Text>注意事項：</Text>
        <Text>{host.info.hosts[0].host_others}</Text>
        <Divider />
        { host.vacants[0] && 
        <Box>
          <Text>換宿期間：</Text>
          <Text>{host.vacants[0].vacant_start_date} ~ {host.vacants[0].vacant_end_date} 人數：{host.vacants.vacant_count}</Text>
        </Box>
        }
        <Box>
          <Heading as={'h2'} fontSize={'xl'} textAlign={'center'}>討論區</Heading>
          { host.comments[0]  
            ? <Text>{host.comments[0].user_id} :  {host.comments[0].comment_content}</Text>
            : <Text>目前尚無留言!</Text>
          }
        </Box>
        <Button colorScheme='teal' size='md' onClick={()=>{
          console.log("comment")
        }}>我要分享換宿心得</Button>
      </Stack>      
    </Container>
  );
}

export async function getStaticProps(context){
  const { params } = context
  const res = await fetch(`http://localhost:4000/api/1.0/host/${params.id}`);
  const data = await res.json();
  return {
    props: { host: data }
  }
}


export async function getStaticPaths() {
  const res = await fetch('http://localhost:4000/api/1.0/hosts/all');
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
    fallback: false,
  };
}  