import { UserLayout } from "../components/Layout/UserLayout"
import { Box, Heading, Stack, Text } from "@chakra-ui/react"
import { BasicTable } from "@/components/BasicTable"

const EveryOne = ({ foo }: any) => {
  return (
    <>
      <UserLayout>
        <Heading pl={4} mb={6} fontSize={"20px"}>
          みんなの活動
        </Heading>
        <BasicTable></BasicTable>
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

export default EveryOne
