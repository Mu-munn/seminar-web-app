import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Tag } from '@chakra-ui/react'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'
import { activeData } from '../src/libs/assets/activeData'

type Book = {
  name: string
  corps: string[]
}

const books: Book[] = activeData

// const columns: ColumnDef<Book, any>[] = [
//   {
//     accessorKey: 'title',
//     header: '名前',
//   },
//   {
//     accessorKey: 'author',
//     header: '会社',
//   },
// ]

export const BasicTable = () => {
  // const table = useReactTable<Book>({
  //   data: books,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })
  return (
    <TableContainer w={'90%'}>
      <Table size={'sm'}>
        <Thead>
          {/* {table.getHeaderGroups().map((headerGroup) => ( */}
          <Tr key={'1'}>
            <Th w={'20%'}>名前</Th>
            <Th>企業一覧</Th>
            {/* {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))} */}
          </Tr>
          {/* ))} */}
        </Thead>
        <Tbody>
          {books.map((book) => (
            <>
              <Tr _hover={{ bg: 'red.100', transition: '0.2s' }}>
                <Td>{book.name}</Td>
                <Td key={book.name}>
                  {book.corps.map((corp) => (
                    <Tag key={corp} mr={2}>
                      {corp}
                    </Tag>
                  ))}
                </Td>
              </Tr>
            </>
          ))}

          {/* {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} gap={3}>
              <Td>
                <Button mr={2}>GMOインターネット株式会社</Button>
                <Button mr={2}>GMOインターネット株式会社</Button>
                <Button mr={2}>GMOインターネット株式会社</Button>
                <Button mr={2}>GMOインターネット株式会社</Button>
                <Button mr={2}>GMOインターネット株式会社</Button>
                <Tag mr={1} size={"lg"} variant='solid' colorScheme='teal'>
                  GMOインターネット株式会社
                </Tag>
              </Td>
            </Tr>
          ))} */}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
