import {
  Box,
  Button,
  Center,
  Flex,
  forwardRef,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  useToast,
} from '@chakra-ui/react'
import { BsBuilding, BsLightbulb, BsMailbox } from 'react-icons/bs'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ReactElement, ReactNode } from 'react'
import { ScrollArea } from './ScrollArea'
import { SidebarLink } from './SidebarLink'
import { UserInfo } from './UserInfo'
import { supabase } from '../../../src/libs/utils/supabaseClient'
import useAuthUser from '@/hooks/useAuthUser'
import useProfile from '@/hooks/useProfile'

const SidebarLinkComponent = forwardRef(function LogoComponent(
  props: {
    icon: ReactElement
    children: ReactNode
  },
  ref: any
) {
  return <SidebarLink icon={props.icon}>{props.children}</SidebarLink>
})

interface AdminLayoutProps {
  children: React.ReactNode
}

export const UserLayout = (props: AdminLayoutProps) => {
  const { children } = props

  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthUser()
  const { profile } = useProfile()

  const isClosable = useBreakpointValue({ base: true, md: false })

  const handleLogOut = async (e: any) => {
    e.preventDefault()

    const { error } = await supabase.auth.signOut()

    if (error) {
      alert(JSON.stringify(error))
    } else {
      router.push('/signIn')
    }
  }

  return (
    <Flex
      height="100vh"
      bg={mode('#2c5282', 'gray.800')}
      overflow="hidden"
      sx={{ '--sidebar-width': '16rem' }}
    >
      <Box
        display="block"
        height="100vh"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Heading fontSize="40px" fontWeight="bold" pb="" w={'100%'} textAlign={'center'} pt={3}>
            MINORU
          </Heading>
          {profile?.isAdmin && <Text textAlign={'center'}>管理者</Text>}

          {profile?.isAdmin && (
            <Center w={'100%'} mt={7}>
              <Button
                display="block"
                transition="background 0.1s"
                rounded="xl"
                _hover={{ bg: 'whiteAlpha.200' }}
                bg={'white'}
                color={'gray'}
                w={'80%'}
              >
                教員を招待する
              </Button>
            </Center>
          )}

          <ScrollArea pt="5" pb="6" w={'100%'}>
            <Stack pb="6" w={'100%'}>
              {/* <Link href="/">
                <SidebarLinkComponent icon={<BsBuilding />}>ダッシュボード</SidebarLinkComponent>
              </Link> */}
              {!profile?.isAdmin && user && (
                <Link
                  href={`/active/${user.id}`}
                  onClick={() => {
                    router.push(`/active/${user.id}`)
                  }}
                >
                  <SidebarLinkComponent icon={<BsBuilding />}>自分の活動</SidebarLinkComponent>
                </Link>
              )}

              <Link href="/everyone">
                <SidebarLinkComponent icon={<BsLightbulb />}>
                  {profile?.isAdmin ? '生徒の頑張り' : 'クラスのみんなの活動'}
                </SidebarLinkComponent>
              </Link>
            </Stack>
            <Box position="absolute" bottom="8" w={'100%'}>
              <Link href="/profile">
                <Box
                  p="3"
                  display="block"
                  transition="background 0.1s"
                  rounded="xl"
                  _hover={{ bg: 'whiteAlpha.200' }}
                  bg={'linear-gradient(145deg, #284a75, #2f588b)'}
                  boxShadow={'20px 20px 60px #25466f,-20px -20px 60px #335e96'}
                >
                  <UserInfo />
                </Box>
              </Link>
              <Link href="/contact">
              <SidebarLink mt="5" icon={<BsMailbox />}>
                お問い合わせ
              </SidebarLink>
              </Link>
              <SidebarLink mt="2" icon={<RiLogoutBoxRLine />} onClick={handleLogOut}>
                ログアウト
              </SidebarLink>
            </Box>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        p={{ base: '0', md: '6' }}
        marginStart={{ md: 'var(--sidebar-width)' }}
        position="relative"
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg={mode('white', 'gray.700')}
          height="100%"
          pb="6"
          rounded={{ md: 'lg' }}
          overflow="auto"
        >
          <Flex direction="column" height="full">
            <Box width="100%" maxW="7xl" py={0} px={5} mx="auto">
              <Flex w="full" pt="2" justify="space-between" align="center">
                <Flex align="center">
                  {/* <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                  <NavBreadcrumb /> */}
                </Flex>
              </Flex>
              <Box py={{ base: '6' }}>{children}</Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
