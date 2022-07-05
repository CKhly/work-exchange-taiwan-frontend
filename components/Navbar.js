import NextLink from 'next/link'
import Image from 'next/image'
import { Icon, Container, Link, Flex, UnorderedList, ListItem, HStack } from '@chakra-ui/react'
import { MdManageSearch, MdOutlinePostAdd } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { BiLogIn} from "react-icons/bi";

export default function Navbar({profile}) {
  return (
    <Container maxW={'1050px'} margin={"0 auto"}>
      <Flex margin={"20px auto"} alignItems={"center"}>
        <NextLink href="/">
          <Link>
            <Image src="/logo2.png" width={75} height={72} />
          </Link>
        </NextLink>
        <NextLink href="/">
          <Link>
            <Image src="/name.png" width={110} height={72} />
          </Link>
        </NextLink>
        <UnorderedList ml={"auto"} listStyleType={"none"} display={"flex"}>
          <HStack spacing={"20px"}>
          <ListItem display={"inlineBlock"}><NextLink href="/create"><Link><Icon as={MdOutlinePostAdd} w={7} h={7} color='black' _hover={{color: "blue.700" }}/></Link></NextLink></ListItem>
          <ListItem display={"inlineBlock"}> <NextLink href="/search"><Link><Icon as={MdManageSearch} w={8} h={8} color='black' _hover={{color: "blue.700" }}/></Link></NextLink></ListItem>
          {
            profile  
            ? <ListItem display={"inlineBlock"}><NextLink href="/profile"><Link><Icon as={CgProfile} w={7} h={7} color='black' _hover={{color: "blue.700" }}/></Link></NextLink></ListItem>
            : <ListItem display={"inlineBlock"}><NextLink href="/login"><Link><Icon as={BiLogIn} w={7} h={7} color='black' _hover={{color: "blue.700" }}/></Link></NextLink></ListItem>
          }
          </HStack>
        </UnorderedList>
      </Flex>
    </Container>
  )
}
