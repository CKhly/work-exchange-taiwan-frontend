import { Stack, Flex, Button, Text, VStack, useBreakpointValue} from '@chakra-ui/react';
import NextLink from "next/link"

export default function WithBackgroundImage() {
  return (
    <Flex
      w={'full'}
      h={'40vh'}
      backgroundImage={
        '/banner.jpg'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        align={'start'}
        justify={'center'}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack ml={useBreakpointValue({ base: '10', md: '120' })} maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            出發吧！來一段特別的人生體驗
          </Text>
          <Text
            color={'white'}
            fontWeight={550}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: 'l', md: 'xl' })}>
            透過資訊整合與經驗分享，提升台灣換宿環境
          </Text>
          <Stack direction={'row'}>
            <NextLink href={'/search'} passHref>
              <Button
                bg={'blue.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}>
                開始探索
              </Button>
            </NextLink>
            <NextLink href={'/create'} passHref>
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}>
                提供換宿機會
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}