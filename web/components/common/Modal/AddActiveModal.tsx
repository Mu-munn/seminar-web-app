import useAuthUser from '@/hooks/useAuthUser'
import { ActiveClass } from '@/libs/active'
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
  Select,
  useToast,
} from '@chakra-ui/react'
import Router from 'next/router'
import { parse } from 'path'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Corp } from 'src/types/corp'
import { mutate } from 'swr'

interface AddActiveModalProps {
  isOpen: any
  onClose: any
  corp: Corp
}

export const AddActiveModal = (props: AddActiveModalProps) => {
  const { isOpen, onClose, corp } = props
  const { user } = useAuthUser()

  const [activeNumber, setActiveNumber] = useState<number>(0)
  const [activeName, setActiveName] = useState<string>('')
  const [activeAt, setActiveAt] = useState<any>()
  const [activePlace, setActivePlace] = useState<string>('')
  const [absenceSubmitAt, setAbsenceSubmitAt] = useState<any>()
  const [selectionResult, setSelectionResult] = useState<number>(0)

  const toast = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data, error, status } = await supabase
      .from('actives')
      .select('*')
      .eq('corp_id', corp.corp_id)

    data && setActiveNumber(data.length + 1)

    // const { data: res, error: insertErr } = await supabase.from('actives').insert([
    //   {
    //     corp_id: corp.corp_id,
    //     active_number: activeNumber,
    //     active_name: activeName,
    //     active_at: activeAt,
    //     active_place: activePlace,
    //     absence_submit_at: absenceSubmitAt,
    //     selection_result: selectionResult,
    //   },
    // ])

    // if (insertErr) {
    //   toast({
    //     title: 'エラー',
    //     description: `${JSON.stringify(insertErr)}`,
    //     status: 'error',
    //     duration: 9000,
    //     isClosable: true,
    //   })
    // }
    // mutate(`/api/actives/${corp.corp_id}`)
    // onClose()
    // // Router.reload()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'2xl'} isCentered={false}>
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
                onChange={(e) => setActiveName(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>実施日</FormLabel>
              <Input
                variant="filled"
                placeholder="Select Date"
                w={'400px'}
                onChange={(e) => setActiveAt(e.target.value)}
                type="date"
                size="md"
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
                onChange={(e) => setActivePlace(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>公欠願書提出日</FormLabel>
              <Input
                variant="filled"
                placeholder="Select Date"
                w={'400px'}
                onChange={(e) => setAbsenceSubmitAt(e.target.value)}
                type="date"
                size="md"
              />
            </FormControl>
          </VStack>
          <VStack justify={'center'} spacing="24px">
            <FormControl mt={'50px'} width={'auto'}>
              <FormLabel>結果</FormLabel>
              <Select
                variant="filled"
                w={'400px'}
                onChange={(e) => setSelectionResult(parseInt(e.target.value))}
              >
                {ActiveClass.selectionResult.map((result, index) => {
                  return (
                    <option key={result} value={index}>
                      {result}
                    </option>
                  )
                })}
              </Select>
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
