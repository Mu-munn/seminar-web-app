import { supabase } from '@/libs/utils/supabaseClient'
import { useEffect, useState } from 'react'
import { EveryOne } from 'src/types/everyone'
import useProfile from './useProfile'
import useSWR from 'swr'
import { fetcher } from '@/libs/utils/useSWR'

export const useEveryOne = () => {
  const { profile } = useProfile()
  const { data: everyone, error } = useSWR(
    `/api/everyone?class=${profile?.class}&grade=${profile?.grade}`,
    fetcher
  )

  return { everyone, error }
}
