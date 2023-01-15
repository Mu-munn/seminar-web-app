import { supabase } from '@/libs/utils/supabaseClient'
import { PostgrestError } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'
import { Active } from 'src/types/active'

const activesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const corpId = req.query.corpId
    const { data, error } = await supabase.from('actives').select('*').eq('corp_id', corpId)

    if (error) {
      return res.status(500).json({ message: error })
    }

    return res.status(200).json(data)
  }
}
export default activesApi
