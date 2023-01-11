import { UserLayout } from "../components/Layout/UserLayout"
import { Heading } from "@chakra-ui/react"
import { BasicTable } from "@/components/BasicTable"
import { supabase } from '@/libs/utils/supabaseClient'
import useProfile from "@/hooks/useProfile"

type Book ={
  full_name: string
  corp_name: string[]
}

const EveryOne = ({ foo }: any) => {
  let corpdata: Book[];
  const getInfomation = async()=>{
    const {profile} = await useProfile();
    let { data } = await supabase
      .from('profiles')
      .select('id,full_name,class_number,corps(corp_id,corp_name)')
      .eq('class',profile?.class)
      .eq('grade',profile?.grade)
      .order('class_number');
    console.log(data);
    
    
  }
  getInfomation();
  return (
    <>
      <UserLayout>
        <Heading pl={4} mb={6} fontSize={"20px"}>
          みんなの活動
        </Heading>
        <BasicTable></BasicTable>
      </UserLayout>
    </>
  )
}

export default EveryOne
