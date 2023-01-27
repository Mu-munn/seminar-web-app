import { UserLayout } from '../components/Layout/UserLayout'
import { Button, Center, CircularProgress, FormControl, FormLabel, Heading, HStack, Input, Select} from '@chakra-ui/react'
import { BasicTable } from '@/components/BasicTable'
import { useEveryOne } from '@/hooks/useEveryOne'
import useSWR from 'swr'
import { fetcher } from '@/libs/utils/useSWR'
import useProfile from '@/hooks/useProfile'
import { useEffect, useState } from 'react'

const EveryOne = () => {
  // const everyone = useEveryOne()
  const { profile } = useProfile()
  const defaultValue = {
    searchtext: '',
    searchprogress: '',
  }
  const [fieldValues, setFieldValues] = useState(defaultValue)

  const handleInputChange = async (e: any) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setFieldValues({ ...fieldValues, [name]: value })
  }

  // const { data: everyone, error } = useSWR(
  //   `/api/everyone?class=${profile?.class}&grade=${profile?.grade}`,
  //   fetcher
  // )
  const { everyone, error} = useEveryOne()
  const [stateeveryone,setEveryone] = useState(everyone);
  useEffect(()=>{
    setEveryone(everyone);
  },[everyone])
  
  const onSubmit = async (e:any) =>{
    e.preventDefault()
    const temp = [];
    for(const [idx,value] of everyone.entries()){
      for(const data of value.corps){
        if(fieldValues.searchprogress === '' || data.progress === Number(fieldValues.searchprogress)){
          if(~data.corp_name.indexOf(fieldValues.searchtext)){
            temp.push(everyone[idx])
            break;
          }
        }
      }
    }
    setEveryone(temp);

  }
  
  return (
    <UserLayout>
      <Heading pl={4} mb={6} fontSize={'20px'}>
        みんなの活動
      </Heading>
      <HStack mb={8}>
          <FormControl id='searchtext'>
            <Input type='text' name='searchtext' placeholder='企業名'value={fieldValues.searchtext} 
            onChange={handleInputChange}/>
          </FormControl>
          <FormControl id='searchprogress'>
            <Select 
            placeholder="進捗を選択" 
            name="searchprogress" 
            value={fieldValues.searchprogress} 
            onChange={handleInputChange}>
              <option value="0">内定合格-承諾</option>
              <option value="1">内定合格-保留</option>
              <option value="2">内定合格-辞退</option>
              <option value="3">途中辞退</option>
              <option value="4">受験せず</option>
              <option value="5">不合格</option>
            </Select>
          </FormControl>
            <Button
                loadingText="Submitting"
                size="md"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick = {onSubmit}
              >
                検索
            </Button>
      </HStack>
      {stateeveryone ? (
        <BasicTable everyone={stateeveryone} />
      ) :(
        <Center w={'100%'} h={'100%'}>
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      )}
    </UserLayout>
  )
}

export default EveryOne
