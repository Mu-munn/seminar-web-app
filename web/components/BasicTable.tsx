import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { EveryOne } from 'src/types/everyone'

interface BasicTableProps {
  everyone: EveryOne[]
}

export const BasicTable = (props: BasicTableProps) => {
  const { everyone } = props
  const router = useRouter()

  return (
    <TableContainer w={'90%'}>
      <Table size={'sm'}>
        <Thead>
          <Tr>
            <Th w={'20%'}>名前</Th>
            <Th>企業一覧</Th>
          </Tr>
        </Thead>
        <Tbody>
          {everyone.map((e) => (
            <Tr
              key={e.id}
              _hover={{ bg: 'gray.200', transition: '0.2s' }}
              onClick={() => {
                router.push(`active/${e.id}`)
              }}
              cursor={'pointer'}
            >
              <Td>{e.full_name}</Td>
              <Td>
                {e.corps.map((corp) => (
                  <Tag key={corp.corp_id} mr={2}>
                    {corp.corp_name}
                  </Tag>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
