import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Flex,
  Heading,
  HStack,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Select,
  Center,
  Link,
  CircularProgress,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { supabase } from '../src/libs/utils/supabaseClient'
import Router from 'next/router'
import { Profile, ProfileCreate } from 'src/types/profile'
import { CourseArray } from '@/libs/assets/CourseArray'

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const defaultValue = {
    course: 0,
    grade: 0,
    class: 0,
    classNumber: 0,
    studentNumber: 0,
    lastName: '',
    firstName: '',
    fullName: '',
    email: '',
    password: '',
  }
  const [fieldValues, setFieldValues] = useState(defaultValue)

  const [showPassword, setShowPassword] = useState(false)
  function createFullName(firstName: string, lastName: string) {
    const fullName = firstName + lastName
    return fullName
  }

  const handleInputChange = async (e: any) => {
    const target = e.target
    const name = target.name
    const value = target.value

    //StringからNumberにキャストして格納するか否か
    if (!(name === 'lastName' || name === 'firstName' || name === 'email' || name === 'password')) {
      setFieldValues({ ...fieldValues, [name]: Number(value) })
    } else {
      setFieldValues({ ...fieldValues, [name]: value })
    }

    // setIs(true)になる条件は
    // fieldValuesの中身がすべて''ではない
  }
  const toast = useToast()

  // const testFunc = async (e: any) => {
  //   e.preventDefault()
  //   const { data, error } = await supabase.auth.signUp({
  //     email: 'mijinkoneko2000@gmail.com',
  //     password: 'password',
  //     options: {
  //       data: {
  //         full_name: 'testうお',
  //         course: '0',
  //         grade: '1',
  //         class: '2',
  //         class_number: 0,
  //         student_number: 0,
  //         is_admin: 0,
  //       },
  //     },
  //   })
  //   if (error) console.log(error)
  //   else console.log(data)
  // }
  const submit = async (e: any) => {
    setIsLoading(true)
    e.preventDefault()
    // console.log(fieldValues)

    const fullName = createFullName(fieldValues.firstName, fieldValues.lastName)
    const email = fieldValues.email
    const pass = fieldValues.password

    const newData: ProfileCreate = {
      full_name: fullName,
      course: fieldValues.course.toString(),
      grade: fieldValues.grade.toString(),
      class: fieldValues.class.toString(),
      class_number: fieldValues.classNumber,
      student_number: fieldValues.studentNumber.toString(),
      is_admin: 0,
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: newData,
      },
    })

    if (error) {
      console.log(error)

      setIsLoading(false)
      toast({
        title: 'エラー',
        description: '新規登録に失敗しました。\n 入力項目に間違いがないか確認してください。',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'メールを送信しました！',
        description: '確認メールを送信しました。ご確認ください！',
        status: 'success',
        duration: 1500,
        isClosable: true,
      })
      Router.push('/signIn')
    }
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'#2C4C81'}>
      {/* <Button onClick={testFunc}></Button> */}
      <Stack spacing={8} mx={'auto'} maxW={'70%'} py={12} px={6} w={'70%'}>
        {!isLoading ? (
          <>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'} color={'white'}>
                新規登録
              </Heading>
            </Stack>
            <Center rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
              <Stack spacing={4} w={'80%'} my={10}>
                <form
                  onSubmit={(e) => {
                    submit(e)
                  }}
                >
                  <FormControl id="course" isRequired mb={2}>
                    <FormLabel>学部・学科</FormLabel>
                    <Select placeholder="--" name="course" onChange={handleInputChange}>
                    {CourseArray.map((Course,idx) => (
                      <option key={Course} value={idx}>{Course}</option>
                    ))}
                    </Select>
                  </FormControl>
                  <HStack justify={'space-between'} mb={2}>
                    <FormControl id="grade" isRequired w={'50%'}>
                      <FormLabel>学年</FormLabel>
                      <Select placeholder="--" name="grade" onChange={handleInputChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Select>
                    </FormControl>
                    <FormControl id="email" isRequired w={'50%'}>
                      <FormLabel>クラス</FormLabel>
                      <Select placeholder="--" name="class" onChange={handleInputChange}>
                        <option value="0">なし</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                      </Select>
                    </FormControl>
                  </HStack>
                  <HStack justify={'space-between'} mb={2}>
                    <FormControl id="classNumber" isRequired w={'40%'}>
                      <FormLabel>出席番号</FormLabel>
                      <Input
                        type="text"
                        maxLength={2}
                        name="classNumber"
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="studentNumber" isRequired w={'60%'} mb={2}>
                      <FormLabel>学籍番号</FormLabel>
                      <Input
                        type="text"
                        name="studentNumber"
                        onChange={handleInputChange}
                        maxLength={8}
                      />
                    </FormControl>
                  </HStack>
                  <HStack justify={'space-between'} mb={2}>
                    <FormControl id="lastName" isRequired w={'50%'}>
                      <FormLabel>苗字</FormLabel>
                      <Input type="text" name="lastName" onChange={handleInputChange} />
                    </FormControl>
                    <FormControl id="firstName" isRequired w={'50%'}>
                      <FormLabel>名前</FormLabel>
                      <Input type="text" name="firstName" onChange={handleInputChange} />
                    </FormControl>
                  </HStack>
                  <FormControl id="email" isRequired mb={2}>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input type="email" name="email" onChange={handleInputChange} />
                  </FormControl>
                  <FormControl id="password" isRequired mb={5}>
                    <FormLabel>パスワード</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleInputChange}
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() => setShowPassword((showPassword) => !showPassword)}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack pt={2}>
                    <Button
                      id="button"
                      loadingText="Submitting"
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type={'submit'}
                    >
                      新規登録
                    </Button>
                    <Button
                      m={'0 auto'}
                      id="button"
                      loadingText="Submitting"
                      size="lg"
                      // bg={'blue.400'}
                      // color={'white'}
                      colorScheme={'facebook'}
                      type={'button'}
                      onClick={() => Router.push('/teacherSignUp')}
                    >
                      教員の方はこちら
                    </Button>
                  </Stack>
                  <Stack pt={4}>
                    <Text align={'center'}>
                      <Link color={'blue.400'} href="/signIn">
                        ログインはこちら
                      </Link>
                    </Text>
                  </Stack>
                </form>
              </Stack>
            </Center>
          </>
        ) : (
          <Center bg={'white'} w={'100%'} h={'500px'} borderRadius={'2xl'}>
            <CircularProgress isIndeterminate color="green.300" />
          </Center>
        )}
      </Stack>
    </Flex>
  )
}
