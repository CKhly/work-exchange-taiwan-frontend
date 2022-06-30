import { Box, Link, AspectRatio, Image, Container } from "@chakra-ui/react"
import NextLink from "next/link"
export default function CategoryCard({cat}) {
  return (
    <Box minW='xs' maxW='3xs' borderRadius='lg' >
      <NextLink href={'/search'}>
        <Link >
          <AspectRatio maxW='400px' ratio={4/3}>
            <Image src={cat.photo} borderRadius='xl'/>
          </AspectRatio>
          <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              noOfLines={1}
          >
            {cat.name}
          </Box>
          <Box as='span' color='gray.600' fontSize='sm'>
          {cat.count} 個換宿機會
          </Box>
        </Link> 
      </NextLink>
    </Box>
  )
}