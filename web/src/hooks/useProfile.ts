import { useState, useEffect } from 'react'
import { Profile } from 'src/types/profile'
import { supabase } from '../libs/utils/supabaseClient'
import useAuthUser from './useAuthUser'
import useSWR from 'swr'
import { fetcher } from '@/libs/utils/useSWR'

const useProfile = () => {
  const { profileId } = useAuthUser()

  // const [profile, setProfile] = useState<Profile>()

  // const getProfile = async (id: string) => {
  //   const { data } = await supabase.from('profiles').select('*').eq('id', id).single()
  //   return setProfile(data as Profile)
  // }

  // useEffect(() => {
  //   user && getProfile(user.id)
  // }, [user])
  // if (!user) return
  const { data: profile, error } = useSWR(`/api/profile/${profileId}`, fetcher)
  // const profile = data as Profile
  // const profile = data as Profile
  return {
    profile,
  }
}
export default useProfile
