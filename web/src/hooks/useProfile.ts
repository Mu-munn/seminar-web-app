import { Session, User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { Profile } from 'src/types/types'
import { supabase } from '../libs/utils/supabaseClient'
import useAuthUser from './useAuthUser'

const useProfile = () => {
  const { user } = useAuthUser()
  const [profile, setProfile] = useState<Profile>()

  const getProfile = async (id: string) => {
    let { data } = await supabase.from('profiles').select('*').eq('id', id).single()
    return setProfile(data as Profile)
  }

  useEffect(() => {
    user && getProfile(user?.id)
  }, [user])

  return {
    profile,
  }
}
export default useProfile
