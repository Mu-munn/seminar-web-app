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
    Link
  } from '@chakra-ui/react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
  import { useState } from 'react'
  import { supabase } from '../src/libs/utils/supabaseClient'
  
  export default function SignUp() {
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('1')
    //   const [email, setEmail] = useState('')
  
    const defaultValue = {
      email: '',
      password: '',
    }
    const [fieldValues, setFieldValues] = useState(defaultValue)
  
    const [showPassword, setShowPassword] = useState(false)
    const handleInputChange = async (e:any) => {
      const target = e.target
      const name = target.name
      const value = target.value
      setFieldValues({ ...fieldValues, [name]: value })
    }
    //   const toast = useToast()
    const onSubmit = async (e:any) => {
      e.preventDefault()
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
  
      // await onSignUp(fieldValues.email, fieldValues.password, 'mukai', 0)
      // console.log(data, error)
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'70%'} py={12} px={6} w={'70%'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              新規登録
            </Heading>
          </Stack>
          <Center rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Stack spacing={4} w={'80%'} my={10}>
              <FormControl id="email" isRequired>
                <FormLabel>学部・学科</FormLabel>
                <Select placeholder="学年">
                  <option value="option1">情報総合学科</option>
                  <option value="option2">音楽・音響学科</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <HStack justify={'space-between'}>
                <FormControl id="email" isRequired w={'50%'}>
                  <FormLabel>苗字</FormLabel>
                  <Select placeholder="Select option">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
                <FormControl id="email" isRequired w={'50%'}>
                  <FormLabel>名前</FormLabel>
                  <Select placeholder="Select option">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
              </HStack>
              <HStack justify={'space-between'}>
                <FormControl id="email" isRequired w={'50%'}>
                  <FormLabel>苗字</FormLabel>
                  <Input type="email" name="email" onChange={handleInputChange} />
                </FormControl>
                <FormControl id="email" isRequired w={'50%'}>
                  <FormLabel>名前</FormLabel>
                  <Input type="email" name="email" onChange={handleInputChange} />
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
                  <Link color={'blue.400'} href="/SignIn">
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