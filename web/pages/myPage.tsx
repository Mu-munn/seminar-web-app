import {
  Button,
  Center,
  CircularProgress,
  Heading,
  HStack,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { OriginalModal } from '@/components/common/Modal'
import { supabase } from '@/libs/utils/supabaseClient'
import useAuthUser from '@/hooks/useAuthUser'
import { Corp } from 'src/types/types'
import { UserLayout } from '@/components/Layout/UserLayout'
import { CorpListItem } from '@/components/features/myPage/CorpListItem'

const MyPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuthUser()
  const [corps, setCorps] = useState<Corp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfile()
  }, [user])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase.from('corps').select('*').eq('user_id', user?.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setCorps(data)
      }
    } catch (error) {
      // alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }


  return (
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

        {!loading ? (
          corps.map((corp) => {
            return <CorpListItem key={corp.corp_id} corp={corp as Corp} />
          })
        ) : (
          <Center w={'100%'} h={'100%'}>
            <CircularProgress isIndeterminate color="green.300" />
          </Center>
        )}
      </Stack>
    </UserLayout>
  )
}

export default MyPage
