import {  Box,  chakra, Container,  Stack, Text, useColorModeValue,  VisuallyHidden} from '@chakra-ui/react';
import { FaGithub, FaFacebookSquare, FaLinkedin } from 'react-icons/fa';

const SocialButton = ({children, label, href,}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2022 CKhly. All rights reserved.</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Github'} href={'https://github.com/CKhly/work-exchange-taiwan-frontend'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'Facebook'} href={'https://www.facebook.com/groups/378361455646311'}>
            <FaFacebookSquare />
          </SocialButton>
          <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/liyehhung/'}>
            <FaLinkedin />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

