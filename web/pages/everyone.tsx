import { UserLayout } from "../components/Layout/UserLayout"
import { Heading } from "@chakra-ui/react"
import { BasicTable } from "@/components/BasicTable"
import { supabase } from '@/libs/utils/supabaseClient'

type Book ={
  full_name: string
  corp_name: string[]
}

const EveryOne = ({ foo }: any) => {
  let corpdata: Book[];

  const getInfomation = async()=>{
    let { data } = await supabase
      .from('profiles')
      .select('id,full_name,class_number,corps(corp_id,corp_name)')
      .order('class_number');
    console.log(data);
    /*
    if(data){
      data!.forEach(function(value,index){
        corpdata[index].full_name = value.full_name;
        value.corps!.forEach(function(value){

        })
        
      })
    }
    */
    
    
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
