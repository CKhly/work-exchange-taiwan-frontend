import { Box, Badge, Icon, Link, AspectRatio, Image, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { formatDate } from "../lib/utils"
import { BiHomeHeart, BiHeartCircle, BiCalendar } from "react-icons/bi"
export default function HostCard({host}) {
    return (
        <Box  minW='xs' maxW='2xl' borderWidth='1px' borderRadius='lg' overflow='hidden' key={host.host_id}>
          <NextLink href={'/hosts/' + host.host_id} passHref>
            <Link >
                <AspectRatio maxW='400px' ratio={4 / 3}>
                <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/${host.host_id}/${host.host_mainImage}`} />
                </AspectRatio>
                {/* <img src={`http://localhost:4000/assets/${host.host_id}/${host.host_mainImage}`} width={100} alt="" /> */}
                <Box p='6'>
                <Box
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                ><Icon as={BiHomeHeart} w={4} h={4} color='blue.800'/>
                    { " " + host.host_name }
                </Box>
                <Stack direction='row' my={'3'}>
                    <Badge variant='outline' colorScheme='blue'>{ host.location_name }</Badge>
                    <Badge variant='outline' colorScheme='green'>{ host.category_name }</Badge>
                    <Badge variant='outline' colorScheme='red'>{ host.gender_name }</Badge>
                </Stack>
                <Stack direction='row' my={'2'}>
                    
                    <Badge variant='solid' colorScheme='telegram'><Icon as={BiHeartCircle} w={4} h={4} color='white' pt={"1"}/>{ " " + host.host_likes }</Badge>
                    <Badge variant='solid' colorScheme='teal' >
                    <Icon as={BiCalendar} w={4} h={4} color='white' pt={"1"}/>
                        { " " +formatDate(host.host_create_date) }
                    </Badge>
                </Stack>
                </Box>
            </Link>      
          </NextLink>
        </Box>
    )
}