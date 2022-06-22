import { FaFacebook } from 'react-icons/fa';
import { Button, Center, Text } from '@chakra-ui/react';

export default function FacebookButton() {
  return (
    <Center>
      <Button
        w={'full'}
        maxW={'md'}
        colorScheme={'facebook'}
        leftIcon={<FaFacebook />}>
        <Center>
          <Text>Facebook 登入</Text>
        </Center>
      </Button>
    </Center>
  );
}