import { Session, User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../libs/utils/supabaseClient'

const useAuthUser = () => {
  const [session, setSession] = useState<Session>()
  const [user, setUser] = useState<User>()
  const [isLoading, setLoading] = useState<boolean>()
  const [token, setToken] = useState()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session !== null) {
        setSession(session)
        setUser(session.user)
      }
    })
    setLoading(false)
    
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session !== null) {
        setSession(session)
        setUser(session.user)
      }
    })
  }, [supabase])

  return {
    session,
    user,
    isLoading,
    token,
  }
}
export default useAuthUser
