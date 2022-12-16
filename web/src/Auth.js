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
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const defaultValue = {
    email: '',
    password: '',
  }
  const [fieldValues, setFieldValues] = useState(defaultValue)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleInputChange = async (e) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setFieldValues({ ...fieldValues, [name]: value })
  }
  const toast = useToast()
  return (
    // <div className="row flex-center flex">
    //   <div className="col-6 form-widget" aria-live="polite">
    //     <h1 className="header">Supabase + React</h1>
    //     <p className="description">Sign in via magic link with your email below</p>
    //     {loading ? (
    //       'Sending magic link...'
    //     ) : (
    //       // <FormControl>
    //       //   <FormLabel>Email address</FormLabel>
    //       //   <Input type="email" />
    //       //   <FormHelperText>We'll never share your email.</FormHelperText>
    //       // </FormControl>
    //       <form onSubmit={handleLogin}>
    //         <label htmlFor="email">Email</label>
    //         <input
    //           id="email"
    //           // className="inputField"
    //           type="email"
    //           placeholder="Your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <button className="button block" aria-live="polite">
    //           Send magic link
    //         </button>
    //       </form>
    //     )}
    //   </div>
    // </div>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w={'80%'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            ログイン
          </Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text> */}
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            {/* <HStack>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>苗字</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>名前</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack> */}
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
                onClick={async () => {
                  // async function signInWithEmail() {
                  const { data, error } = await supabase.auth.signInWithPassword({
                    email: fieldValues.email,
                    password: fieldValues.password,
                  })
                  if (error) {
                    toast({
                      title: `error toast`,
                      status: error,
                      isClosable: true,
                    })
                  }
                  // }
                }}
              >
                ログイン
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text align={'center'}>
                <Link color={'blue.400'} to="/SignUp">
                  新規登録はこちら
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
