import { UserLayout } from '../components/Layout/UserLayout'
import { Center, CircularProgress, Heading } from '@chakra-ui/react'
import { BasicTable } from '@/components/BasicTable'
import { useEveryOne } from '@/hooks/useEveryOne'
import useSWR from 'swr'
import { fetcher } from '@/libs/utils/useSWR'
import useProfile from '@/hooks/useProfile'

const EveryOne = () => {
  // const everyone = useEveryOne()
  const { profile } = useProfile()

  // const { data: everyone, error } = useSWR(
  //   `/api/everyone?class=${profile?.class}&grade=${profile?.grade}`,
  //   fetcher
  // )
  const { everyone, error } = useEveryOne()

  return (
    <UserLayout>
      <Heading pl={4} mb={6} fontSize={'20px'}>
        みんなの活動
      </Heading>
      {everyone ? (
        <BasicTable everyone={everyone} />
      ) : (
        <Center w={'100%'} h={'100%'}>
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      )}
    </UserLayout>
  )
}

export default EveryOne
