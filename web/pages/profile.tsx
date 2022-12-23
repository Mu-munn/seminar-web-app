import { useState, useEffect } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Spacer,
  Stack,
  VStack,
  useToast
} from '@chakra-ui/react'
import { UserLayout } from '@/components/Layout/UserLayout'
import useAuthUser from '@/hooks/useAuthUser'
import { supabase } from '@/libs/utils/supabaseClient'
import Router from 'next/router'

interface UserCreate {
  fullName: string // フルネーム
  course: number // 学科 0:情報総合学科 1:電子工学学科みたいな感じ
  grade: number // 学年
  class: string // クラス
  classNumber: number // 出席番号
  studentNumber: number // 学籍番号
}

export default function Profile() {
  const { user, isLoading, token } = useAuthUser()

  const [fullName, setFullName] = useState<string>('')
  const [course, setCourse] = useState<number>(0)
  const [grade, setGrade] = useState<number>(0)
  const [classes, setClasses] = useState<string>('')
  const [classNumber, setClassNumber] = useState<number>(0)
  const [studentNumber, setStudentNumber] = useState<number>(0)

  useEffect(() => {
    if(user)
      getProfile(user.id);
  }, [user])
  const toast = useToast()

  const updateProfile = async ({
    fullName,
    course,
    grade,
    classes,
    classNumber,
    studentNumber,
    user_id,
  }: {
    fullName: UserCreate['fullName']
    course: UserCreate['course']
    grade: UserCreate['grade']
    classes: UserCreate['class']
    classNumber: UserCreate['classNumber']
    studentNumber: UserCreate['studentNumber']
    user_id: String
  })=>{
    try {
      if (!user_id) throw new Error('No user')
  
      const updates = {
        id:user_id,
        full_name:fullName,
        course:course,
        grade:grade,
        class:classes,
        class_number:classNumber,
        student_number:studentNumber,
      }
      
      let { error } = await supabase.from('profiles').upsert(updates).eq('id',user_id)
      if (error) throw error
        toast({
          title: 'SUCCESS!!',
          description: 'Profileを更新しました',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        Router.reload()
      } catch (error) {
        toast({
          title: 'ERROR!!',
          description: '更新に失敗しました。もう一度お試しください',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } finally {
  
      }
  }

  const getProfile = async (userid:string)=>{
    let { data } = await supabase.from('profiles').select('full_name,course,grade,class,class_number,student_number').eq('id',userid)
    if(data){
      setFullName(data[0].full_name)
      setCourse(data[0].course)
      setGrade(data[0].grade)
      setClasses(data[0].class)
      setClassNumber(data[0].class_number)
      setStudentNumber(data[0].student_number)
    }
  }

  const submit = async (e: any) => {
    e.preventDefault()
    const status ={
      fullName:fullName,
      course:course,
      grade:grade,
      classes:classes,
      classNumber:classNumber,
      studentNumber:studentNumber,
      user_id:user!.id,
    };
    
    updateProfile(status)
  }

  return (
    <>
      <UserLayout>
        <form onSubmit={submit}>
          <Stack pl={'30px'} spacing="8" w={'60%'}>
            <Heading size="lg" as="h2" mt={3}>
              {'プロフィールの更新'}
            </Heading>
            <VStack width="full" spacing="6">
              <FormControl id="fullName" isRequired>
                <FormLabel>フルネーム</FormLabel>
                <Input
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </FormControl>

              <FormControl id="course" isRequired>
                <FormLabel>学科</FormLabel>
                <Select
                  name="course"
                  value={course}
                  placeholder={'学科を選択'}
                  onChange={(event) => setCourse(parseInt(event.target.value))}
                >
                  <option value="0">情報総合学科</option>
                  <option value="1">情報システム科</option>
                  <option value="2">情報処理学科</option>
                  <option value="3">AIシステム科</option>
                  <option value="4">情報セキュリティ学科</option>
                  <option value="5">高度情報学科</option>
                  <option value="6">IT技術研究科</option>
                </Select>
              </FormControl>

              <FormControl id="grade" isRequired>
                <FormLabel>学年</FormLabel>
                <Select
                  name="grade"
                  placeholder={'学年を選択'}
                  value={grade}
                  onChange={(event) => setGrade(parseInt(event.target.value))}
                >
                  <option value="1">１年</option>
                  <option value="2">２年</option>
                  <option value="3">３年</option>
                  <option value="4">４年</option>
                </Select>
              </FormControl>

              <FormControl id="class" isRequired>
                <FormLabel>クラス</FormLabel>
                <Select
                  name="class"
                  placeholder={'クラスを選択'}
                  value={classes}
                  onChange={(event) => setClasses(event.target.value)}
                >
                  <option value="0">なし</option>
                  <option value="1">A</option>
                  <option value="2">B</option>
                </Select>
              </FormControl>

              <FormControl id="classNumber" isRequired>
                <FormLabel>出席番号</FormLabel>
                <Input
                  name="classNumber"
                  type="number"
                  value={classNumber}
                  onChange={(event) => setClassNumber(parseInt(event.target.value))}
                  min={1}
                  max={100}
                />
              </FormControl>

              <FormControl id="studentNumber" isRequired>
                <FormLabel>学籍番号</FormLabel>
                <Input
                  name="studentNumber"
                  type="Number"
                  value={studentNumber}
                  onChange={(event) => setStudentNumber(parseInt(event.target.value))}
                  min={10000000}
                  max={100000000}
                />
              </FormControl>
            </VStack>
            <HStack mt={10} pt={10} pb={10}>
              <Spacer></Spacer>
              <Button
                color={'gray'}
                size={'md'}
                type="submit"
                bg={'linear-gradient(145deg, #e6e6e6, #ffffff)'}
                boxShadow={'20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff'}
              >
                更新する
              </Button>
              <Spacer></Spacer>
            </HStack>
          </Stack>
        </form>
      </UserLayout>
    </>
  )
}
