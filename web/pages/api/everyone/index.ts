import { supabase } from '@/libs/utils/supabaseClient'
import { PostgrestError } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'
import { Active } from 'src/types/active'

const everyoneApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const profileClass = req.query.class
    const profileGrade = req.query.grade
    const { data, error } = await supabase
      .from('profiles')
      .select('id,full_name,class_number,corps(corp_id,corp_name)')
      .eq('class', profileClass)
      .eq('grade', profileGrade)
      .order('class_number')

    if (error) {
      return res.status(500).json({ message: error })
    }

    return res.status(200).json(data)
  }
}
export default everyoneApi
