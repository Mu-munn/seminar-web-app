import { useState, useEffect } from "react"
import { useUser, useSupabaseClient, Session } from "@supabase/auth-helpers-react"
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { UserLayout } from "@/components/Layout/UserLayout"
import { FieldGroup } from "@/components/FieldGroup"
import useAuthUser from "@/hooks/useAuthUser"

export interface UserCreate {
  fullName: string // フルネーム
  course: number // 学科 0:情報総合学科 1:電子工学学科みたいな感じ
  grade: number // 学年
  class: string // クラス
  classNumber: number // 出席番号
  studentNumber: number // 学籍番号
}

export default function Profile(session: UserCreate) {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const { user, isLoading, token } = useAuthUser();
  // useStateでsessionの要素をデフォルトにする？
  session = {
    fullName: 'mukaigawara',
    course: 0,
    grade: 1,
    class: 'A',
    classNumber:11,
    studentNumber:20000000
  }
  const [fullName,setFullName] = useState<string>(session.fullName);
  const [course,setCourse] = useState<number>(session.course);
  const [grade,setGrade] = useState<number>(session.grade);
  const [classes,setClasses] = useState<string>(session.class);
  const [classNumber,setClassNumber] = useState<number>(session.classNumber);
  const [studentNumber,setStudentNumber] = useState<number>(session.studentNumber);

  
  const handleLogOut = async (e: any) => {
    e.preventDefault()

    const { error } = await supabase.auth.signOut()

    if (error) {
      alert(JSON.stringify(error))
    } else {
      router.push("/signIn")
    }
  }
  const submit = async (e: any) => {

    
    console.log(user?.user_metadata.full_name);
    console.log(session);
    console.log(fullName);
    console.log(course);
    console.log(grade);
    console.log(classes);
    console.log(classNumber);
    console.log(studentNumber);
    
    
    
    e.preventDefault()
  }

  return (
    <>
      <UserLayout>
        <Center w={"70%"}>
          <form onSubmit={submit}>
            <Stack spacing='8'>
              <Heading size='lg' as='h2' mt={3}>
                {"プロフィールの更新"}
              </Heading>
              <VStack width='full' spacing='6'>

                <FormControl id='fullName' isRequired>
                  <FormLabel>フルネーム</FormLabel>
                  <Input
                    name='fullName'
                    type='text'
                    value={fullName}
                    onChange ={(event)=>setFullName(event.target.value)}
                  />
                </FormControl>

                <FormControl id='course' isRequired>
                    <FormLabel>学科</FormLabel>
                    <Select name='course' 
                    value={course} 
                    placeholder={'学科を選択'}
                    onChange={(event) => setCourse(parseInt(event.target.value))}
                    >
                      <option value='0'>情報総合学科</option>
                      <option value='1'>情報システム科</option>
                      <option value='2'>情報処理学科</option>
                      <option value='3'>AIシステム科</option>
                      <option value='4'>情報セキュリティ学科</option>
                      <option value='5'>高度情報学科</option>
                      <option value='6'>IT技術研究科</option>
                    </Select>
                  </FormControl>

                <FormControl id='grade' isRequired>
                  <FormLabel>学年</FormLabel>
                  <Select name='grade' placeholder={'学年を選択'}
                  value={grade}
                  onChange={(event) => setGrade(parseInt(event.target.value))}
                  >
                      <option value='1'>１年</option>
                      <option value='2'>２年</option>
                      <option value='3'>３年</option>
                      <option value='4'>４年</option>
                    </Select>
                </FormControl>

                <FormControl id='class' isRequired>
                  <FormLabel>クラス</FormLabel>
                  <Input
                    name='class'
                    type='text'
                    value={classes}
                    onChange={(event) => setClasses(event.target.value)}
                    maxLength={2}
                  />
                </FormControl>

                <FormControl id='classNumber' isRequired>
                  <FormLabel>出席番号</FormLabel>
                  <Input
                    name='classNumber'
                    type='number'
                    value={classNumber}
                    onChange={(event) => setClassNumber(parseInt(event.target.value))}
                    max={100}
                  />
                </FormControl>

                <FormControl id='studentNumber' isRequired>
                  <FormLabel>学籍番号</FormLabel>
                  <Input
                    name='studentNumber'
                    type='Number'
                    value={studentNumber}
                    onChange={(event) => setStudentNumber(parseInt(event.target.value))}
                    min={10000000}
                    max={100000000}
                  />
                </FormControl>

              </VStack>
            </Stack>

            <HStack mt={10}>
              <Spacer h={"100px"}></Spacer>
              <Button type='submit' colorScheme='blue' w={"100%"}>
                {"更新する"}
              </Button>
              <Spacer></Spacer>
            </HStack>
          </form>
        </Center>
      </UserLayout>
    </>
  )
}
