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
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { supabase } from "../src/libs/utils/supabaseClient"
import { useRouter } from "next/router"

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("1")
  //   const [email, setEmail] = useState('')

  const defaultValue = {
    email: "",
    password: "",
  }
  const [fieldValues, setFieldValues] = useState(defaultValue)

  const [showPassword, setShowPassword] = useState(false)
  const handleInputChange = async (e: any) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setFieldValues({ ...fieldValues, [name]: value })
  }
  //   const toast = useToast()
  const onSubmit = async (e: any) => {
    e.preventDefault()
    console.log(fieldValues)
    const email = fieldValues.email
    const password = fieldValues.password

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      console.log(error)
    } else {
      router.push("/")
    }

    // await onSignUp(fieldValues.email, fieldValues.password, 'mukai', 0)
    // console.log(data, error)
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
      bg={"#2C4C81"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"70%"} py={12} px={6} w={"70%"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color={"white"}>
            ログイン
          </Heading>
        </Stack>
        <Center rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4} w={"80%"} my={10}>
            <FormControl id='email' isRequired>
              <FormLabel>メールアドレス</FormLabel>
              <Input type='email' name='email' onChange={handleInputChange} />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>パスワード</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  onChange={handleInputChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText='Submitting'
                size='lg'
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onSubmit}
              >
                ログイン
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text align={"center"}>
                <Link color={"blue.400"} href='/signUp'>
                  新規登録はこちら
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Center>
      </Stack>
    </Flex>
  )
}
