import { OriginalModal } from '@/components/common/Modal'
import { CorpListItem } from '@/components/features/myPage/CorpListItem'
import { UserLayout } from '@/components/Layout/UserLayout'
import useAuthUser from '@/hooks/useAuthUser'
import { useCorps } from '@/hooks/useCorps'
import useProfile from '@/hooks/useProfile'
import { supabase } from '@/libs/utils/supabaseClient'
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Heading,
  HStack,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Corp } from 'src/types/corp'
import { Profile } from 'src/types/types'
// import { Corp, Profile } from 'src/types/types'

interface ActivePageProps {
  id: string
  corps: Corp[]
  // propsにprofileの型を追加
  profile: Profile
}
const ActivePage = () => {
  // const { id, corps } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuthUser()
  const [loading, setLoading] = useState(true)
  const [isMyPage, setIsMyPage] = useState(false)
  const corps = useCorps()
  const { profile } = useProfile()

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
              {profile?.full_name + '　さんの活動' ?? ''}
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

        {corps ? (
          corps.map((corp: Corp) => {
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
