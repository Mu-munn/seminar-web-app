import { UserLayout } from "../components/Layout/UserLayout"
import {
  Box,
  Heading,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { BasicTable } from "@/components/BasicTable"

const MyPage = ({ foo }: any) => {
  return (
    <>
      <UserLayout>
        <Stack>
          <Heading pl={2} fontSize={"20px"}>
            自分の活動
          </Heading>
          <Box borderRadius={"xl"} w={"100%"} p={5} bg={"gray.100"}>
            <Text fontWeight={"bold"} px={3} pb={3}>
              GMOインターネット株式会社
            </Text>
            <TableContainer>
              <Table size={"sm"}>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </UserLayout>
      {/* <Button onClick={handleLogOut}>ログアウト</Button> */}
    </>
  )
}

// export async function getStaticProps(context: any) {
//   const foo = "Hello"

//   return {
//     props: { foo },
//   }
// }

export default MyPage
