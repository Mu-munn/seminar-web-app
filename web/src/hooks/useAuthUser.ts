import { Session, User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../libs/utils/supabaseClient'

const useAuthUser = () => {
  const [session, setSession] = useState<Session>()
  const [user, setUser] = useState<User | null>()
  const [isLoading, setLoading] = useState<boolean>()
  const [token, setToken] = useState()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session !== null && session !== undefined) {
        setUser(session.user)
      }
    })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session !== null && session !== undefined) {
        session && setUser(session.user)
      }
    })
  }, [supabase])

  return {
    user,
    isLoading,
    token,
  }
}
export default useAuthUser
