import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Button,
  ModalFooter,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import Router from 'next/router'
import { IoMdClose } from 'react-icons/io'
import { supabase } from '@/libs/utils/supabaseClient'

export const DeleteConfirm = ({ isOpen, onClose, corp_id }: any) => {
  const toast = useToast()

  const onDelete = async () => {
    try {
      const { data, error } = await supabase.from('corps').delete().eq('corp_id', corp_id)
    } catch {
      toast({
        title: 'エラー',
        description: '新規登録に失敗しました。\n 入力項目に間違いがないか確認してください。',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      Router.reload()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={5}>
          <VStack mt={'30px'}>
            <Text fontWeight={'bold'} fontSize={'24px'}>
              活動の削除
            </Text>
          </VStack>
          <VStack paddingTop={'3%'} paddingBottom={'2%'}>
            <p>活動情報も消えてしまいます。 本当に削除しますか？</p>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center" paddingBottom={'4%'}>
          <Button
            w={'40%'}
            onClick={onDelete}
            marginRight={'2%'}
            backgroundColor={'red.300'}
            color={'white'}
          >
            削除
          </Button>
          <Button w={'40%'} onClick={onClose} marginLeft={'2%'}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
