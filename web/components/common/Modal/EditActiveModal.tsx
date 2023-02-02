import { ActiveClass } from '@/libs/active'
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
  HStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Active } from 'src/types/active'
import { Corp } from 'src/types/corp'
import { mutate } from 'swr'

interface AddActiveModalProps {
  isOpen: any
  onClose: any
  corp: Corp
  active: Active
}

export const EditActiveModal = (props: AddActiveModalProps) => {
  const { isOpen, onClose, corp, active } = props

  const [activeNumber, setActiveNumber] = useState<number>(active.active_number)
  const [activeName, setActiveName] = useState<string>(active.active_name)
  const [activeAt, setActiveAt] = useState<any>(active.active_at)
  const [activePlace, setActivePlace] = useState<string>(active.active_place)
  const [absenceSubmitAt, setAbsenceSubmitAt] = useState<any>(active.absence_submit_at)
  const [selectionResult, setSelectionResult] = useState<number>(active.selection_result)

  const toast = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    toast({
      title: 'あ、今はちょっとできないです。 作っていないので。',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })

    mutate(`/api/actives/${corp.corp_id}`)
    onClose()
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
                value={activeName}
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
                value={activeAt}
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
                value={activePlace}
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
                value={absenceSubmitAt}
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
                value={selectionResult}
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
          <HStack justify={'space-between'}>
            <Button colorScheme="red" mr={3} size={'lg'} onClick={handleSubmit}>
              活動を削除
            </Button>
            <Button colorScheme="blue" mr={3} size={'lg'} onClick={handleSubmit}>
              活動を編集
            </Button>
          </HStack>
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
