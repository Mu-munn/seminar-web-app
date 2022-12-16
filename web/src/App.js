import { Center } from '@chakra-ui/react'
import { supabase } from './supabaseClient'
import { FontColor } from './styles'
import { useState, useEffect } from 'react'
import Auth from './Auth'
import Account from './Account'
import SignUp from '../src/pages/SignUp'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

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
  return <>{!session ? <Auth /> : <Account key={session.user.id} session={session} />}</>
}

export default App
