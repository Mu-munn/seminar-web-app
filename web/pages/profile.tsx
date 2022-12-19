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

export default function Profile(session: any) {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

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
    e.preventDefault()
    // try {
    //   setIsLoading(true)
    //   await CorpService.createOrUpdateCorp({
    //     corpCreate: fieldValues,
    //     corpId: corpId,
    //   })
    //   if (corpSecretFieldValues) {
    //     await CorpSecretService.createOrUpdateCorpSecret({
    //       corpSecretCreate: corpSecretFieldValues,
    //       corpId: corpId,
    //       managerUserId,
    //     })
    //   }
    //   router.push(`/admin/corps/${corpId}`)
    // } catch (error) {
    //   console.log(error)
    //   window.alert(error)
    //   setIsLoading(false)
    // }
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
              <Button background={'red'}>
                あいうえお
              </Button>

              {/* {isAdmin && router.pathname.includes("edit") && (
                <CorpManagerFields corpManager={corpManager} />
              )} */}
              {/* <FieldGroup title='会社情報'> */}
              <VStack width='full' spacing='6'>
                <FormControl id='name' isRequired>
                  <FormLabel>名前</FormLabel>
                  <Input
                    name='name'
                    type='text'
                    //   defaultValue={fieldValues.name}
                    //   maxLength={255}
                    //   onChange={handleInputChange}
                  />
                </FormControl>

                {/* <FormControl id='prefectures' isRequired>
                    <FormLabel>都道府県</FormLabel>
                    <Select
                      name='prefectures'
                      placeholder={"--都道府県を選択して下さい--"}
                      value={fieldValues.prefName}
                      onChange={(values: any) => {
                        onChangePrefecture(values)
                      }}
                    >
                      {prefecturesData.map((e) => {
                        return (
                          <option key={e.id} value={e.name}>
                            {e.name}
                          </option>
                        )
                      })}
                    </Select>
                  </FormControl>

                  {fieldValues.prefId && (
                    <FormControl id='cites' isRequired>
                      <FormLabel>市区町村</FormLabel>
                      <Select
                        name='cites'
                        placeholder={"--市町村を選択してください--"}
                        value={fieldValues.cityName}
                        onChange={(values: any) => {
                          onChangeCity(values)
                        }}
                      >
                        {selectedCities.map((e) => {
                          return (
                            <option key={e.id} value={e.name}>
                              {e.name}
                            </option>
                          )
                        })}
                      </Select>
                    </FormControl>
                  )} */}

                {/* <FormControl id='type'>
                    <FormLabel>主な仕事（最大10文字）</FormLabel>
                    <Input
                      name='type'
                      type='text'
                      defaultValue={fieldValues.type}
                      maxLength={10}
                      onChange={handleInputChange}
                    />
                  </FormControl> */}

                {/* <FormControl id='industries' isRequired>
                    <FormLabel>業種</FormLabel>
                    <Select
                      name='industries'
                      placeholder={"--業種を選択してください--"}
                      value={fieldValues.industryId}
                      onChange={(values: any) => {
                        onChangeIndustry(values)
                      }}
                    >
                      {industriesData.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        )
                      })}
                    </Select>
                  </FormControl> */}

                <FormControl id='slogan'>
                  <FormLabel>メールアドレス</FormLabel>
                  <Input
                    name='slogan'
                    type='text'
                    //   defaultValue={fieldValues.slogan}
                    //   onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id='description'>
                  <FormLabel>会社説明</FormLabel>
                  <Textarea
                    name='description'
                    //   defaultValue={fieldValues.description}
                    //   rows={5}
                    //   onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id='homepage'>
                  <FormLabel>ホームページURL</FormLabel>
                  <Input
                    name='homepage'
                    type='text'
                    //   defaultValue={fieldValues.homepage}
                    //   onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id='slug' isRequired>
                  <FormLabel>
                    会社ID（会社のURLなどに使用されます。変更依頼は運営にお問い合わせください。）
                  </FormLabel>
                  <Input
                    name='slug'
                    type='text'
                    //   defaultValue={fieldValues.slug}
                    //   onChange={handleInputChange}
                    //   readOnly={!!fieldValues.id}
                  />
                </FormControl>

                <FormControl id='hiringLevel'>
                  <FormLabel>採用状況</FormLabel>
                  <Select
                    name='hiringLevel'
                    //   value={fieldValues.hiringLevel.toString()}
                    //   onChange={handleInputChange}
                  >
                    <option value='0'>募集していない</option>
                    <option value='1'>ゆる募</option>
                    <option value='2'>募集中</option>
                  </Select>
                </FormControl>

                <FormControl id='active'>
                  <FormLabel>会社情報の公開/非公開</FormLabel>
                  <Select
                    name='active'
                    //   value={fieldValues.active ? "1" : "0"}
                    //   onChange={handleInputChange}
                  >
                    <option value='1'>公開</option>
                    <option value='0'>非公開</option>
                  </Select>
                </FormControl>
              </VStack>
              {/* </FieldGroup> */}

              {/* {isAdmin && (
                <CorpSecretFields
                  corpSecret={corpSecret}
                  homepage={fieldValues.homepage}
                  onFieldValuesChanged={onCorpSecretFieldValuesChanged}
                />
              )} */}
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
