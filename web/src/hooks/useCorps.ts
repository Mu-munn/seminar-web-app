import { supabase } from '@/libs/utils/supabaseClient'
import { useEffect, useState } from 'react'
import useProfile from './useProfile'

export const useCorps = (userId?: string) => {
  const { profile } = useProfile()
  const [corps, setCorps] = useState<any>()

  useEffect(() => {
    fetchCorps(userId)
  }, [userId])

  const fetchCorps = async (userId?: string) => {
    const profileId = profile && profile.id
    let { data, error, status } = await supabase
      .from('corps')
      .select('*')
      .eq('user_id', userId ?? profileId)
    setCorps(data)
  }

  return corps
}
