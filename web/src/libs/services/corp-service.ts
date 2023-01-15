import { supabase } from '@/libs/utils/supabaseClient'
import { Corp } from 'src/types/corp'

export class CorpService {
  // static fetchCorpsFromUserId = async ({ userId }: { userId: string }) => {
  //   let { data, error, status } = await supabase.from('corps').select('*').eq('user_id', userId)

  //   return data
  // }
  static insertCorps = async ({ corp_name, user_id }: { corp_name: string; user_id: string }) => {
    const { error } = await supabase
      .from('corps')
      .insert([{ corp_name: corp_name, user_id: user_id }])

    return { error }
  }
}
