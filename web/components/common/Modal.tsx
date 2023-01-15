import useAuthUser from '@/hooks/useAuthUser'
import { useCorps } from '@/hooks/useCorps'
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
  useToast,
} from '@chakra-ui/react'
import router, { Router, useRouter } from 'next/router'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Corp } from 'src/types/corp'

interface CorpListItemProps {
  corp: Corp
}

export const OriginalModal = ({ isOpen, onClose }: any) => {
  const [corpName, setCorpName] = useState('')
  const router = useRouter()
  const { user } = useAuthUser()
  // const { id } = router.query
  const userId = 'd230d5d8-405f-4555-baf6-d66bef8aa343'
  // const { corps, fetchCorps } = useCorps(userId)

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('corps')
      .insert([{ corp_name: corpName, user_id: user?.id }])

    if (error) {
      alert(JSON.stringify(error))
    } else {
      // fetchCorps(userId)
      onClose()
      router.reload()
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
          <VStack mt={'30px'}>
            <Text fontWeight={'bold'} fontSize={'24px'}>
              新しい会社を追加する
            </Text>
          </VStack>

          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>会社名</FormLabel>
              <Input
                variant="filled"
                placeholder="会社名を入力してください"
                w={'400px'}
                onChange={(e) => setCorpName(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center" mb={'70px'} mt={'30px'}>
          <Button colorScheme="blue" mr={3} size={'lg'} onClick={handleSubmit}>
            会社を追加する
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
