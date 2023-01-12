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
  Td,
} from '@chakra-ui/react'
import { Corp } from 'src/types/corp'
import { supabase } from '@/libs/utils/supabaseClient'
import { DeleteConfirm } from '@/components/common/Modal/DeleteModal'
import { AddActiveModal } from '@/components/common/Modal/AddActiveModal'
import router from 'next/router'
import useAuthUser from '@/hooks/useAuthUser'
import { useProfileFromUserId } from '@/hooks/useProfileFromUserId'
import { isTrue } from '@/libs/util'
import { useActivesFromCorpId } from '@/hooks/useActivesFromCorpId'
import { useEffect, useState } from 'react'
import { Active } from 'src/types/active'
import { ActiveClass } from '@/libs/active'

interface CorpListItemProps {
  corp: Corp
}

export const CorpListItem = (props: CorpListItemProps) => {
  const { corp } = props
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isActiceOpen, onOpen: onActiveOpen, onClose: onActiveClose } = useDisclosure()

  const { user } = useAuthUser()
  const { id } = router.query
  const userId = { id }.id as string
  // const userProfile = useProfileFromUserId(userId)
  const isSelfAccount = user && isTrue(userId, user.id)
  const actives: Active[] = useActivesFromCorpId(corp.corp_id)
  // console.log(actives)

  return (
    <Box borderRadius={'xl'} w={'100%'} p={5} bg={'gray.100'}>
      <HStack mb={'20px'}>
        <Text fontWeight={'bold'} px={3}>
          {corp?.corp_name}
        </Text>
        <Spacer></Spacer>
        {isSelfAccount && (
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
        )}
      </HStack>

      {actives.length > 0 ? (
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
              {actives && actives.length > 0 && (
                <>
                  {actives.map((active) => {
                    return (
                      <Tr
                        key={active.corp_id}
                        _hover={{ bg: 'white', transition: '0.2s' }}
                        onClick={() => {}}
                        cursor={'pointer'}
                      >
                        <Td>{active.active_name}</Td>
                        <Td>{active.active_at.toString()}</Td>
                        <Td>{active.active_place}</Td>
                        <Td>{active.absence_submit_at?.toString()}</Td>
                        <Td>{ActiveClass.witchSelectionResult(active.selection_result)}</Td>
                      </Tr>
                    )
                  })}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text pl={3} fontSize={'sm'} textAlign={'left'}>
          活動はありません
        </Text>
      )}

      {isSelfAccount && (
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
      )}

      <AddActiveModal isOpen={isActiceOpen} onClose={onActiveClose} corp={corp} />
    </Box>
  )
}
