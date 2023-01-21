import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    Flex,
    Heading,
    useColorModeValue,
    Button,
    useToast,
    Center,
    Link,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { supabase } from '../src/libs/utils/supabaseClient'
  import { useRouter } from 'next/router'
  
  export default function SignUp() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  
    const defaultValue = {
      email: '',
    }
    const [fieldValues, setFieldValues] = useState(defaultValue)
    const handleInputChange = async (e: any) => {
      const target = e.target
      const name = target.name
      const value = target.value
      setFieldValues({ ...fieldValues, [name]: value })
    }
    const toast = useToast()
    const onSubmit = async (e: any) => {
      e.preventDefault()
      const email = fieldValues.email
  
      const {data,error} = await supabase.auth.resetPasswordForEmail(
        email,
        {redirectTo: 'http://localhost:3000/resetPassword'}
      )
      if (error) {
        setLoading(false)
        toast({
          title: 'ERROR!!',
          description: '送信に失敗しました\nお間違えの無いよう再度お試しください',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'SUCCESS!!',
          description: '確認メールを送信しました。ご確認ください！',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
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
              <FormControl id="email" isRequired>
                <FormLabel>メールアドレス</FormLabel>
                <Input type="email" name="email" onChange={handleInputChange} />
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
  