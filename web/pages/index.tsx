import Account from '../components/Account'
import useAuthUser from '../src/hooks/useAuthUser'
import SignIn from './signIn'

export default function Home() {
  const { user, isLoading, token } = useAuthUser()

  return <>{!user ? <SignIn /> : <Account session={user} />}</>
}
