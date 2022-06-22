import { Image } from '@chakra-ui/react'
import { Box, Container, Divider, Wrap, Stack, Heading } from '@chakra-ui/react'
import HostCard from '../components/HostCard'
export const getStaticProps = async () => {
  const res = await fetch('http://localhost:4000/api/1.0/hosts/all');
  const json = await res.json();
  return {
    props: { hosts: json.data }
  }
}

export default function Home({ hosts }) {
  return (
    <Container maxW='1040px'>
      <Box className="banner">
        <Image src="/banner.jpg" width={1040} height={276} />
        {/* <span>一個以整合資訊以提升台灣打工換宿環境的平台，讓小幫手可以輕易找到換宿的地方、分享換宿經驗。</span> */}
      </Box>
      <Stack spacing='24px'>
        <Heading ></Heading>
        <Divider/>
        <Container maxW='1030px'>
          <Wrap>
          {hosts.map(host => (
            <HostCard host={host} key={host.host_id}/>
          ))}
          </Wrap>
        </Container>
      </Stack>
    </Container>
  )
}