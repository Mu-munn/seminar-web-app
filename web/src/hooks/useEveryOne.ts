import { supabase } from '@/libs/utils/supabaseClient'
import { useEffect, useState } from 'react'
import { EveryOne } from 'src/types/everyone'
import { Profile } from 'src/types/types'
import useProfile from './useProfile'

export const useEveryOne = () => {
  const { profile } = useProfile()

  const [everyone, setEveryOne] = useState<any[]>()

  useEffect(() => {
    profile && fetchEveryOne(profile)
  }, [profile])

  const fetchEveryOne = async (profile: Profile) => {
    let { data } = await supabase
      .from('profiles')
      .select('id,full_name,class_number,corps(corp_id,corp_name)')
      .eq('class', profile.class)
      .eq('grade', profile.grade)
      .order('class_number')
    setEveryOne(data as EveryOne[])
  }

  return everyone
}
