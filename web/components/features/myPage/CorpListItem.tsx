import { DeleteIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
  Box,
  Text,
  HStack,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { Corp } from 'src/types/corp'
import { supabase } from '@/libs/utils/supabaseClient'
import { DeleteConfirm } from '@/components/common/Modal/DeleteModal'
import { AddActiveModal } from '@/components/common/Modal/AddActiveModal'

interface CorpListItemProps {
  corp: Corp
}

export const CorpListItem = (props: CorpListItemProps) => {
  const { corp } = props
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isActiceOpen, onOpen: onActiveOpen, onClose: onActiveClose } = useDisclosure()

  return (
    <Box borderRadius={'xl'} w={'100%'} p={5} bg={'gray.100'}>
      <HStack mb={'20px'}>
        <Text fontWeight={'bold'} px={3}>
          {corp?.corp_name}
        </Text>
        <Spacer></Spacer>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem icon={<EditIcon />}>編集する</MenuItem>
            <MenuItem color={'red.600'} onClick={onOpen} icon={<DeleteIcon />}>
              削除する
              <DeleteConfirm
                corp_id={corp.corp_id}
                isOpen={isOpen}
                onClose={onClose}
              ></DeleteConfirm>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <TableContainer w={'100%'}>
        <Table size={'sm'}>
          <Thead>
            <Tr>
              <Th>活動種類</Th>
              <Th>参加日</Th>
              <Th>実施場所</Th>
              <Th>公欠提出日</Th>
              <Th>結果</Th>
              <Th>公欠許可</Th>
              <Th>報告書受領日</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {actions.map((action) => (
                <>
                  <Tr _hover={{ bg: 'red.100', transition: '0.2s' }}>
                    <Td>{action.actionName}</Td>
                    <Td>{action.date}</Td>
                    <Td>{action.place}</Td>
                    <Td>{action.DateOfAbsence}</Td>
                    <Td>{action.result}</Td>
                    <Td>○</Td>
                    <Td>3日</Td>
                  </Tr>
                </>
              ))} */}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        width={'100%'}
        variant={'outline'}
        _hover={{ bg: 'blue.500', color: 'white' }}
        color={'blue.500'}
        mt={3}
        onClick={onActiveOpen}
      >
        活動を追加
      </Button>
      <AddActiveModal isOpen={isActiceOpen} onClose={onActiveClose} corp={corp} />
    </Box>
  )
}
