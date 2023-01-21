import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Button,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { supabase } from '@/libs/utils/supabaseClient'
import { mutate } from 'swr'
import useAuthUser from '@/hooks/useAuthUser'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const EditConfirm = ({ corp_id, corp_name, isOpen, onClose }: any) => {
  const toast = useToast()
  const { user } = useAuthUser()
  const [corpName, setCorpName] = useState(corp_name)

  const router = useRouter()

  const corpNameChange = (e: any) => {
    setCorpName(() => e.target.value)
    console.log({ corpName })
  }

  const onEdit = async () => {
    try {
      const { data, error } = await supabase
        .from('corps')
        .update({ corp_name: corpName })
        .eq('corp_id', corp_id)
    } catch {
      toast({
        title: 'エラー',
        description: '変更に失敗しました。\n 入力項目に間違いがないか確認してください。',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      //
      mutate(`/api/corps/${user?.id}`)
      toast({
        title: '正常に変更されました。',
        status: 'success',
        duration: 1500,
        isClosable: true,
      })
      router.reload()
      // onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={5}>
          <VStack mt={'30px'}>
            <Text fontWeight={'bold'} fontSize={'24px'}>
              会社名の変更
            </Text>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>会社名</FormLabel>
              <Input
                onChange={corpNameChange}
                variant="filled"
                defaultValue={corp_name}
                w={'400px'}
              />
            </FormControl>
          </VStack>
          {/* <VStack paddingTop={'3%'} paddingBottom={'2%'}>
            <input onChange={corpNameChange} defaultValue={corpName} autoFocus={true} au></input>
          </VStack> */}
        </ModalBody>
        <ModalFooter justifyContent="center" paddingBottom={'4%'}>
          <Button
            w={'40%'}
            onClick={onEdit}
            marginRight={'2%'}
            backgroundColor={'red.300'}
            color={'white'}
          >
            変更
          </Button>
          <Button w={'40%'} onClick={onClose} marginLeft={'2%'}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
