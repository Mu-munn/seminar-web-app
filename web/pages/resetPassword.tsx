import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    Flex,
    Heading,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
    Center,
    Link,
  } from '@chakra-ui/react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
  import { useState } from 'react'
  import { supabase } from '../src/libs/utils/supabaseClient'
  import { useRouter } from 'next/router'
  
  export default function SignUp() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  
    const defaultValue = {
      password: '',
    }
    const [fieldValues, setFieldValues] = useState(defaultValue)
    const [showPassword, setShowPassword] = useState(false)
    const handleInputChange = async (e: any) => {
      const target = e.target
      const name = target.name
      const value = target.value
      setFieldValues({ ...fieldValues, [name]: value })
    }
    const toast = useToast()
    const onSubmit = async (e: any) => {
      e.preventDefault()
      const password = fieldValues.password
      const {error} = await supabase.auth.updateUser({password:password});
      
      if (error) {
        setLoading(false)
        toast({
          title: 'ERROR!!',
          description: '変更に失敗しました。\nもう一度お試しください',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'SUCCESS!!',
          description: 'パスワードは正常に変更されました',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
        router.push('/')
      }
  
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'#2C4C81'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'70%'} py={12} px={6} w={'70%'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'} color={'white'}>
              パスワードのリセット
            </Heading>
          </Stack>
          <Center rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Stack spacing={4} w={'80%'} my={10}>
            <FormControl id="password" isRequired>
              <FormLabel>新しいパスワード</FormLabel>
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
                  送信
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