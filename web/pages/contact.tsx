import {
    FormControl,
    FormLabel,
    Input,
    HStack,
    Button,
    Center,
    Textarea,
    useToast,
  } from '@chakra-ui/react'
import { UserLayout } from '../components/Layout/UserLayout'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

const Contact = () => {
  const toast = useToast()
    return (
      <>
        <UserLayout>
          <Heading pl={4} mb={6} fontSize={'20px'}>
            お問い合わせ
          </Heading>
              <Stack ml={6} spacing={4} w={'80%'} my={10}>
                <form>
                  <HStack justify={'space-between'}>
                    <FormControl id="firstName" isRequired w={'50%'} mb={4}>
                      <FormLabel>名前</FormLabel>
                      <Input type="text" name="firstName" />
                    </FormControl>
                  </HStack>
                  <FormControl id="email" isRequired mb={4}>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input type="email" name="email" />
                  </FormControl>
                  <FormControl id="content" isRequired>
                    <FormLabel>お問い合わせ内容</FormLabel>
                    <Textarea placeholder='こちらにお問い合わせ内容をご記入ください' h={150}/>
                  </FormControl>
                  <Stack spacing={10} pt={20}>
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
                      onClick={()=>{
                        toast({
                          title: 'お問い合わせを送信しました！',
                          // description: '確認メールを送信しました。ご確認ください！',
                          status: 'success',
                          duration: 2000,
                          isClosable: true,
                        })
                      }}
                    >
                      送信
                    </Button>
                  </Stack>
                </form>
              </Stack>
        </UserLayout>
      </>
    )
  }
  
  export default Contact