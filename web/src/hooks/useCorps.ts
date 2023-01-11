import { supabase } from '@/libs/utils/supabaseClient'
import { useEffect, useState } from 'react'
import useProfile from './useProfile'

export const useCorps = () => {
  const { profile } = useProfile()
  const [corps, setCorps] = useState<any>()

  useEffect(() => {
    profile && fetchCorps(profile.id)
  }, [profile])

  const fetchCorps = async (userId: string) => {
    let { data, error, status } = await supabase.from('corps').select('*').eq('user_id', userId)
    setCorps(data)
  }

  return corps
}
