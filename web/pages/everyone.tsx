import { UserLayout } from '../components/Layout/UserLayout'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { BasicTable } from '@/components/BasicTable'

const EveryOne = () => {
  return (
    <>
      <UserLayout>
        <Heading pl={4} mb={6} fontSize={'20px'}>
          みんなの活動
        </Heading>
        <BasicTable></BasicTable>
      </UserLayout>
    </>
  )
}

export default EveryOne
