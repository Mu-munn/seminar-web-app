import useAuthUser from '@/hooks/useAuthUser'
import { supabase } from '@/libs/utils/supabaseClient'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Button,
  FormControl,
  Input,
  ModalFooter,
  Text,
  FormLabel,
  IconButton,
} from '@chakra-ui/react'
import Router from 'next/router'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Corp } from 'src/types/types'

interface AddActiveModalProps {
  isOpen: any
  onClose: any
  corp: Corp
}
export const AddActiveModal = (props : AddActiveModalProps) => {
  const {isOpen,onClose,corp} = props
  const [corpName, setCorpName] = useState('')
  const { user } = useAuthUser()

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('corps')
      .insert([{ corp_name: corpName, user_id: user?.id }])

    if (error) {
      alert(JSON.stringify(error))
    } else {
      onClose()
      Router.reload()
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalButton
          icon={<IoMdClose />}
          onClick={onClose}
          pos="absolute"
          right={'20'}
          top={'10'}
        ></ModalButton>
        
        <ModalBody pb={6}>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>会社名</FormLabel>
                <Text fontWeight={'bold'} fontSize={'24px'}>
                  {corp.corp_name}
                </Text>
            </FormControl>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>活動種類</FormLabel>
              <Input
                variant="filled"
                placeholder="例：会社説明会"
                w={'400px'}
                onChange={(e) => setCorpName(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>実施日時</FormLabel>
              <Input
                variant="filled"
                placeholder="例：2022/12/22"
                w={'400px'}
                onChange={(e) => setCorpName(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>実施場所</FormLabel>
              <Input
                variant="filled"
                placeholder="例：本社"
                w={'400px'}
                onChange={(e) => setCorpName(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>公欠願書提出日</FormLabel>
              <Input
                variant="filled"
                placeholder="例：2022/12/10"
                w={'400px'}
                onChange={(e) => setCorpName(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center" mb={'70px'} mt={'30px'}>
          <Button colorScheme="blue" mr={3} size={'lg'} onClick={handleSubmit}>
            活動を追加する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function ModalButton({ icon, ...rest }: any) {
  return (
    <IconButton
      w={'60px'}
      h={'60px'}
      fontSize="30px"
      icon={icon}
      bg="white"
      shadow={'4px 4px 10px #bfbfbf'}
      rounded={'full'}
      {...rest}
    />
  )
}
