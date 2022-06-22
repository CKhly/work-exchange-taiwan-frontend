import { Box, Link, AspectRatio, Image, Container } from "@chakra-ui/react"

export default function HostCard({host}) {
    console.log(host)
    return (
        <Box minW='xs' maxW='2xl' borderWidth='1px' borderRadius='lg' overflow='hidden' mt="10" key={host.host_id}>
          <Link href={'/hosts/' + host.host_id} >
            <AspectRatio maxW='400px' ratio={4 / 3}>
            <Image src={`http://localhost:4000/assets/${host.host_id}/${host.host_mainImage}`} />
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
                { host.host_create_date }
            </Box>
            </Box>
          </Link>        
        </Box>
    )
}