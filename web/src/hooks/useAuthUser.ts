import { Session, User } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { supabase } from "../libs/utils/supabaseClient"

const useAuthUser = () => {
  const [session, setSession] = useState<Session>()
  const [user, setUser] = useState<User>()
  const [isLoading, setLoading] = useState<boolean>()
  const [token, setToken] = useState()
  useEffect(() => {
    // const supabaseSession = supabase.auth.getSession()
    // if (supabaseSession?.user.id) {
    //   setUser(supabaseSession.user)
    //   setToken(supabaseSession.access_token)
    // }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session !== null) {
        setSession(session)
        setUser(session.user)
      }

      // session !== null && setUser(session.user)
      // setToken(session.access_token)
    })
    setLoading(false)
    // supabase.auth.onAuthStateChange((_event, session) => {
    //   if (session?.user?.id) {
    //     setUser(session.user)
    //     setToken(session.access_token)
    //   }
    //   setLoading(false)
    // })
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session !== null) {
        setSession(session)
        setUser(session.user)
      }

      // session !== null && setUser(session.user)
      // setToken(session.access_token)
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
