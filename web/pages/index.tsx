import { Box } from '@chakra-ui/react'
import Account from '../components/Account'
import useAuthUser from '../src/hooks/useAuthUser'
import SignIn from './signIn'

export default function Home() {
  const { user } = useAuthUser()

  return <>{!user ? <SignIn /> : user ? <Account session={user} /> : <Box />}</>
}
