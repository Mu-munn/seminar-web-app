import { OriginalModal } from '@/components/common/Modal'
import { CorpListItem } from '@/components/features/myPage/CorpListItem'
import { UserLayout } from '@/components/Layout/UserLayout'
import useAuthUser from '@/hooks/useAuthUser'
import { supabase } from '@/libs/utils/supabaseClient'
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
import { Corp } from 'src/types/types'

interface ActivePageProps {
  id: string
  corps: Corp[]
}
const ActivePage = (props: ActivePageProps) => {
  const { id, corps } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuthUser()
  const [loading, setLoading] = useState(true)
  const [isMyPage, setIsMyPage] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [corps])

  useEffect(() => {
    if (user) user.id === corps[0].user_id ? setIsMyPage(true) : setIsMyPage(false)
  }, [user])

  return (
    <UserLayout>
      <Stack>
        <HStack justify={'space-between'} mb={10}>
          {isMyPage ? (
            <Heading pl={2} fontSize={'20px'}>
              自分の活動
            </Heading>
          ) : (
            <Heading pl={2} fontSize={'20px'}>
              {/* 最後にここで、profile.full_nameで表示 */}
              {corps[0].user_id + 'さんの活動'}
            </Heading>
          )}

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
export default ActivePage

export async function getServerSideProps(context: any) {
  const id = context.query.id

  let { data, error, status } = await supabase.from('corps').select('*').eq('user_id', id)
  // ここで、profileテーブルから、corp.user_idと同じuserのデータを取得する（corp_nameを取得するため）

  if (!data) {
    data = []
  }
  const corps = data as Corp[]

  // 次にここでprofileをデータとして渡す
  return {
    props: {
      id: id,
      corps: corps,
    },
  }
}
