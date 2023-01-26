import { useState, useEffect } from 'react'
import { Profile } from 'src/types/profile'
import { supabase } from '../libs/utils/supabaseClient'
import useAuthUser from './useAuthUser'

export const useProfileFromUserId = (userId: string) => {
  //   const { user } = useAuthUser()
  const [userProfile, setUserProfile] = useState<Profile>()

  const getProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return setUserProfile(data as Profile)
  }

  useEffect(() => {
    userId && getProfile()
  }, [userId])

  return userProfile
}
