import { Box, Link, AspectRatio, Image } from "@chakra-ui/react"
import NextLink from "next/link"
export default function LocationCard({loc}) {
  return (
    <Box minW='3xs' maxW='3xs' >
      <NextLink href={'/locations/' + loc.path_name}>
        <Link >
        <AspectRatio maxW='400px' ratio={1}>
        <Image src={loc.photo}/>
        </AspectRatio>
        <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
        >
            {loc.name}
        </Box>
        <Box as='span' color='gray.600' fontSize='sm'>
        {loc.count} 個換宿機會
        </Box>
        </Link> 
      </NextLink>
    </Box>
  )
}