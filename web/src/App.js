import { Center } from '@chakra-ui/react'
import { supabase } from './supabaseClient'
import { FontColor } from './styles'
import { useState, useEffect } from 'react'
import Auth from './Auth'
import Account from './Account'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {console.log(session)}
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
    </>
  )
}

export default App
