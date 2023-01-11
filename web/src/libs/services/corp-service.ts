import { supabase } from '@/libs/utils/supabaseClient'
import { Corp } from 'src/types/corp'

export class CorpService {
  static fetchCorpsFromUserId = async ({ userId }: { userId: string }) => {
    let { data, error, status } = await supabase.from('corps').select('*').eq('user_id', userId)

    return data
  }
}
