import { BasicTable } from '@/components/BasicTable'
import { UserLayout } from '@/components/Layout/UserLayout'
import { useEveryOne } from '@/hooks/useEveryOne'
import { ActiveClass } from '@/libs/active'
import { themeColors } from '@/libs/utils/theme'
import {
  Heading,
  Center,
  CircularProgress,
  Box,
  Stack,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
  Spacer,
  Button,
  Input,
} from '@chakra-ui/react'
import actives from 'pages/api/actives'
import { Active } from 'src/types/active'

const TodosPage = () => {
  const { everyone } = useEveryOne()
  return (
    <UserLayout>
      <Heading pl={4} mb={6} fontSize={'20px'}>
        未チェックのデータ
      </Heading>
      <Text ml={4}>現在はありません。</Text>
      {/* {everyone ? (
        // <BasicTable everyone={everyone} />
        <>
          <Box bg={themeColors.boxColor.listItem} p={5} borderRadius={'8px'}>
            <Stack>
              <HStack>
                <Heading pl={3} fontSize={'20px'}>
                  向川原 悠貴
                </Heading>
                <Spacer></Spacer>
                <Button>詳細を見る</Button>
              </HStack>
              <Text pl={3} fontWeight={'bold'} color={'gray.500'}>
                まるまる株式会社
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
                  </Thead>
                  <Tbody>
                    {actives.length > 0 ? (
                      <>
                        <Tr
                          // key={active.corp_id}
                          // _hover={{ bg: 'white', transition: '0.2s' }}
                          onClick={() => {}}
                          // cursor={'pointer'}
                        >
                          <Td>{'a'}</Td>
                          <Td>{'a'}</Td>
                          <Td>{'a'}</Td>
                          <Td>{'a'}</Td>
                          <Td>{'a'}</Td>
                          <Td bg={'red.100'} borderRadius={6}>
                            <Input variant="unstyled" placeholder="Unstyled" />
                          </Td>
                          <Td bg={'red.100'} borderRadius={6} w={'20%'}>
                            <Input variant="unstyled" placeholder="Unstyled" w={'full'} />
                          </Td>
                        </Tr>
                      </>
                    ) : (
                      <Text pl={4} py={3} fontSize={'sm'} textAlign={'left'}>
                        活動はありません
                      </Text>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
        </>
      ) : (
        <Center w={'100%'} h={'100%'}>
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      )} */}
    </UserLayout>
  )
}
export default TodosPage
