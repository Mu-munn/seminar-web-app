import SignUp from './signUp'
import {useSession} from '../src/hooks/useSession'
import { Center } from '@chakra-ui/react'

export default function Home() {
  const session = useSession()
  return (
    <>
     {!session ? <SignUp /> : <Center h={'100vh'}>{session}</Center>
     }
    </>
  )
}
