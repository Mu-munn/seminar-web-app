import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  Text,
  Flex,
  Heading,
  useColorModeValue,
  HStack,
  Box,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Select,
  RadioGroup,
  Radio,
  Center,
  Link,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { supabase } from '../src/libs/utils/supabaseClient'
import { Console } from 'console'
import { findDOMNode } from 'react-dom'
import { text } from 'stream/consumers'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('1')

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

  function toFullName() {
    const fullName = fieldValues.lastName + fieldValues.firstName
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
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    setFieldValues({ ...fieldValues, ['fullName']: toFullName() })
    console.log(fieldValues)
    const email = fieldValues.email
    const pass = fieldValues.password
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: {
          full_name: 'mukaigawara',
        },
      },
    })
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'#2C4C81'}>
      <Stack spacing={8} mx={'auto'} maxW={'70%'} py={12} px={6} w={'70%'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={'white'}>
            新規登録
          </Heading>
        </Stack>
        <Center rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4} w={'80%'} my={10}>
            <FormControl id="course" isRequired>
              <FormLabel>学部・学科</FormLabel>
              <Select placeholder="--" name="course" onChange={handleInputChange}>
                <option value="0">情報総合学科</option>
                <option value="1">音楽・音響学科</option>
              </Select>
            </FormControl>
            <HStack justify={'space-between'}>
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
            <HStack justify={'space-between'}>
              <FormControl id="classNumber" isRequired w={'40%'}>
                <FormLabel>出席番号</FormLabel>
                <Input type="text" maxLength={2} name="classNumber" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="studentNumber" isRequired w={'60%'}>
                <FormLabel>学籍番号</FormLabel>
                <Input
                  type="text"
                  name="studentNumber"
                  onChange={handleInputChange}
                  maxLength={8}
                />
              </FormControl>
            </HStack>
            <HStack justify={'space-between'}>
              <FormControl id="lastName" isRequired w={'50%'}>
                <FormLabel>苗字</FormLabel>
                <Input type="text" name="lastName" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="firstName" isRequired w={'50%'}>
                <FormLabel>名前</FormLabel>
                <Input type="text" name="firstName" onChange={handleInputChange} />
              </FormControl>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" name="email" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password" isRequired>
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onSubmit}
              >
                新規登録
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text align={'center'}>
                <Link color={'blue.400'} href="/signIn">
                  ログインはこちら
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Center>
      </Stack>
    </Flex>
  )
}
