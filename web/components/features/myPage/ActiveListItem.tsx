import { EditActiveModal } from '@/components/common/Modal/EditActiveModal'
import { ActiveClass } from '@/libs/active'
import { Tr, Td, useDisclosure } from '@chakra-ui/react'
import { Active } from 'src/types/active'
import { Corp } from 'src/types/corp'

interface ActiveListItemProps {
  active: Active
  corp: Corp
  isSelfAccount: boolean
}

export const ActiveListItem = (props: ActiveListItemProps) => {
  const { active, corp, isSelfAccount } = props
  const {
    isOpen: isOpenEditActive,
    onOpen: onOpenEditActive,
    onClose: onCloseEditActive,
  } = useDisclosure()
  return (
    <>
      <Tr
        key={active.id}
        _hover={{ bg: 'white', transition: '0.2s' }}
        onClick={() => {
          isSelfAccount && onOpenEditActive()
        }}
        cursor={'pointer'}
      >
        <Td>{active.active_name}</Td>
        <Td>{active.active_at.toString()}</Td>
        <Td>{active.active_place}</Td>
        <Td>{active.absence_submit_at?.toString()}</Td>
        <Td>{ActiveClass.selectionResult[active.selection_result]}</Td>
      </Tr>
      <EditActiveModal
        isOpen={isOpenEditActive}
        onClose={onCloseEditActive}
        corp={corp}
        active={active}
      />
    </>
  )
}
