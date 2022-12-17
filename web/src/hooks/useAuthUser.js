import { useState, useEffect } from "react"
import { supabase } from "../libs/utils/supabaseClient"

const useAuthUser = () => {
  const [user, setUser] = useState()
  const [isLoading, setLoading] = useState()
  const [token, setToken] = useState()
  useEffect(() => {
    // const supabaseSession = supabase.auth.getSession()
    // if (supabaseSession?.user.id) {
    //   setUser(supabaseSession.user)
    //   setToken(supabaseSession.access_token)
    // }
    supabase.auth.getSession().then(({ data: { session } }) => {
      // setSession(session)
      setUser(session.user)
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
      // setSession(session)
      setUser(session)
      // setToken(session.access_token)
    })
  }, [supabase])

  return {
    user,
    isLoading,
    token,
  }
}
export default useAuthUser
