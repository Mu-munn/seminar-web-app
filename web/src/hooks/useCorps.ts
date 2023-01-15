import { supabase } from '@/libs/utils/supabaseClient'
import { useCallback, useEffect, useState } from 'react'
import { Corp } from 'src/types/corp'
import useProfile from './useProfile'

export const useCorps = (userId: string): Corp[] => {
  // const { profile } = useProfile()
  const [corps, setCorps] = useState<Corp[]>([])

  const fetchCorps = async (userId: string) => {
    const { data, error, status } = await supabase.from('corps').select('*').eq('user_id', userId)
    console.log(data)   
    if (data && data !== null) {
      setCorps(data)
    }
  }

  useEffect(() => {
    fetchCorps(userId)
  }, [userId])

  return corps
}
