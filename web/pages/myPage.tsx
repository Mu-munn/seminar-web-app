import { UserLayout } from '../components/Layout/UserLayout'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { BasicTable } from '@/components/BasicTable'
import { activeData } from '@/libs/assets/activeData'
import { actionData, Action } from '@/libs/assets/actionJson'
import { useCallback } from 'react'
import { OriginalModal } from '@/components/common/Modal'
import { Colors } from '@/libs/utils/theme'

type MyPageProps = {
  actions: Action[]
}
const MyPage = (props: MyPageProps) => {
  const { actions } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <UserLayout>
        <Stack>
          <HStack justify={'space-between'} mb={10}>
            <Heading pl={2} fontSize={'20px'}>
              自分の活動
            </Heading>
            <Button
              color={'blue.600'}
              onClick={onOpen}
              borderRadius={'50px'}
              bg={'#ededed'}
              boxShadow={'20px 20px 60px #bebebe,-20px -20px 60px #ffffff'}
            >
              新しい会社を追加する
            </Button>
            <OriginalModal isOpen={isOpen} onClose={onClose}></OriginalModal>
          </HStack>

          <Box borderRadius={'xl'} w={'100%'} p={5} bg={'gray.100'}>
            <Text fontWeight={'bold'} px={3} pb={3}>
              GMOインターネット株式会社
            </Text>
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

                  {/* {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                      <Th w={"20%"}>名前</Th>
                      <Th>企業一覧</Th>
                     
               
                  ))} */}
                </Thead>
                <Tbody>
                  {actions.map((action) => (
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
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              width={'100%'}
              variant={'outline'}
              //   colorScheme={"whiteAlpha"}
              _hover={{ bg: 'blue.500', color: 'white' }}
              color={'blue.500'}
              mt={3}
            >
              活動を追加
            </Button>
          </Box>
          <Box borderRadius={'xl'} w={'100%'} p={5} bg={'gray.100'}>
            <HStack justify={'space-between'}>
              <Text fontWeight={'bold'} px={3} pb={3}>
                GMOインターネット株式会社
              </Text>
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
                  {actions.map((action) => (
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
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              mt={3}
              width={'100%'}
              variant={'outline'}
              //   colorScheme={"whiteAlpha"}
              _hover={{ bg: 'blue.500', color: 'white' }}
              color={'blue.500'}
            >
              活動を追加
            </Button>
          </Box>
        </Stack>
      </UserLayout>
    </>
  )
}

export async function getStaticProps(context: any) {
  const foo = 'Hello'
  const actions = actionData

  return {
    props: { foo, actions },
  }
}

export default MyPage
