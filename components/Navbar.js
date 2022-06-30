import NextLink from 'next/link'
import Image from 'next/image'
import { Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Icon } from '@chakra-ui/react'
import { MdManageSearch, MdOutlinePostAdd, MdLogin } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { SiGooglemaps } from 'react-icons/si'

export default function Navbar({profile}) {

  return (
    <div className="container">
      <nav>
        <NextLink href="/">
          <Link>
            <Image src="/picwish.png" width={75} height={72} />
          </Link>
        </NextLink>
        <NextLink href="/">
          <Link>
            <Image src="/name.png" width={110} height={72} />
          </Link>
        </NextLink>
        <ul>
          {/* <li><NextLink href="/maps"><Link>綠島</Link></NextLink></li> */}
          {/* <li><Link><NextLink href="/maps"><Icon as={SiGooglemaps} w={7} h={7} color='green.600' _hover={{color: "green.200" }}/></NextLink></Link></li> */}
          <li><NextLink href="/create"><Link>Create</Link></NextLink></li>
          {/* <li><Link><NextLink href="/create"><Icon as={MdOutlinePostAdd} w={7} h={7} color='green.600' _hover={{color: "green.200" }}/></NextLink></Link></li> */}
          <li><NextLink href="/search"><Link>Search</Link></NextLink></li>
          {/* <li><Link><NextLink href="/search"><Icon as={MdManageSearch} w={7} h={7} color='green.600' _hover={{color: "green.200" }}/></NextLink></Link></li> */}
          
          {
            profile  
            ? <li><NextLink href="/profile"><Link>Profile</Link></NextLink></li>
            // ? <li><Link><NextLink href="/profile"><Icon as={CgProfile} w={7} h={7} color='green.600' _hover={{color: "green.200" }}/></NextLink></Link></li>
            : <li><NextLink href="/login"><Link>Login</Link></NextLink></li>
            // : <Link><NextLink href="/login"><Icon as={MdLogin} w={7} h={7} color='green.600' _hover={{color: "green.200" }}/></NextLink></Link>
          }
        </ul>
      </nav>
    </div>
  )
}
