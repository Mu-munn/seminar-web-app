import { useState, useEffect } from 'react'
import { Active } from 'src/types/active'
import { Profile } from 'src/types/types'
import { supabase } from '../libs/utils/supabaseClient'
import useAuthUser from './useAuthUser'

export const useActivesFromCorpId = (corpId: string) => {
  //   const { user } = useAuthUser()
  const [actives, setActives] = useState<Active[]>([])

  const getActives = async () => {
    const { data } = await supabase.from('actives').select('*').eq('corp_id', corpId)
    // console.log('actives', data)

    data && setActives(data)
  }

  useEffect(() => {
    corpId && getActives()
  }, [])

  return actives
}
