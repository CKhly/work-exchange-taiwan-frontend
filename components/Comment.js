import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'

export default function Comment({hostId}) {
  const { register, handleSubmit } = useForm();
  const router = useRouter()
  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem('jwtToken');
    data.hostId = hostId;
    console.log(data)
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/comment`,
    {
      body: new URLSearchParams(data),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwtToken}`
      }),
      method: 'POST',
    })
    .then((res)=>{
      return res.json()
    })
    .then((json)=>{
      router.push(`/hosts/${hostId}`)
    })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button onClick={onOpen}>我要分享換宿心得</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>分享換宿心得，讓台灣打工換宿環境更好！</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>換宿心得</FormLabel>
                <Textarea ref={initialRef} placeholder='請大致分享換宿心得' type="text" {...register("content", { required: true })}/>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Input onClick={onClose} variant='filled' background={'green'}  color={'white'} width={'75px'} mr={'5'} fontWeight={'bold'} type="submit" value="分享"/>
              <Button onClick={onClose}>取消</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}