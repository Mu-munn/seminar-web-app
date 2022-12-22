import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { supabase } from '../src/libs/utils/supabaseClient'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { sortCorpOfCreated } from '@/libs/corp'
import { Corp } from 'src/types/types'

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  var now = new Date()
  console.log(now)
  const _corps: Corp[] = [
    {
      corp_id: 'a',
      user_id: 'b',
      corp_name: 'a',
      update_at: new Date('2011-1-1'),
    },
    {
      corp_id: 'a',
      user_id: 'b',
      corp_name: 'b',
      update_at: new Date('2012-1-1'),
    },
    {
      corp_id: 'a',
      user_id: 'b',
      corp_name: 'c',
      update_at: new Date('2014-1-1'),
    },
  ]
  const test = sortCorpOfCreated(_corps)
  return (
    <ChakraProvider>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
      </SessionContextProvider>
    </ChakraProvider>
  )
}
