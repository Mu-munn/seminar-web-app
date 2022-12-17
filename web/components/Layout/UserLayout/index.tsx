import {
  Avatar,
  Box,
  Flex,
  forwardRef,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Text,
  ToastPositionWithLogical,
  useBreakpointValue,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react"
import {
  BsBuilding,
  BsHeart,
  BsLightbulb,
  BsMailbox,
  BsPerson,
  BsSearch,
  BsShop,
} from "react-icons/bs"
import { BiBriefcase, BiCheck, BiCheckboxChecked, BiCheckCircle, BiRocket } from "react-icons/bi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { useRouter } from "next/router"
import { ReactElement, ReactNode, useEffect } from "react"
// import useAuthUser from "../../src/hooks/useAuthUser"
import { ScrollArea } from "./ScrollArea"
import { SidebarLink } from "./SidebarLink"
import { UserInfo } from "./UserInfo"

const SidebarLinkComponent = forwardRef(function LogoComponent(
  props: {
    icon: ReactElement
    children: ReactNode
  },
  ref: any
) {
  return (
    <a ref={ref} {...props}>
      <SidebarLink icon={props.icon}>{props.children}</SidebarLink>
    </a>
  )
})

interface AdminLayoutProps {
  children: React.ReactNode
}

export const UserLayout = (props: AdminLayoutProps) => {
  const { children } = props
  //   const { isOpen, toggle } = useMobileMenuState()
  //   const { isAdmin, email } = useAuthUser()

  const router = useRouter()
  const toast = useToast()

  const isClosable = useBreakpointValue({ base: true, md: false })

  return (
    <Flex
      height='100vh'
      bg={mode("blue.800", "gray.800")}
      overflow='hidden'
      sx={{ "--sidebar-width": "16rem" }}
    >
      <Box
        as='nav'
        display='block'
        height='100vh'
        flex='1'
        width='var(--sidebar-width)'
        left='0'
        py='5'
        px='3'
        color='gray.200'
        position='fixed'
      >
        <Box fontSize='sm' lineHeight='tall'>
          <HStack>
            {/* <LogoWhite h='6' ml='3' mb='6' mt='2' /> */}
            <Text fontSize='6' fontWeight='bold' pb='1'>
              {` "[dev]"}管理画面`}
            </Text>
          </HStack>
          <Link href='/'>
            <Box
              as='a'
              p='3'
              display='block'
              transition='background 0.1s'
              rounded='xl'
              _hover={{ bg: "whiteAlpha.200" }}
              whiteSpace='nowrap'
            >
              <UserInfo />
            </Box>
          </Link>
          <ScrollArea pt='5' pb='6'>
            <SidebarLink display={{ base: "block", lg: "none" }} mb='2' icon={<BsSearch />}>
              Search
            </SidebarLink>
            <Stack pb='6'>
              <Link href='/admin'>
                <SidebarLinkComponent icon={<BsBuilding />}>会社一覧</SidebarLinkComponent>
              </Link>
              <Link href='/admin/temporary-corps?cityCode=212148'>
                <SidebarLinkComponent icon={<BsLightbulb />}>
                  可児市の会社候補一覧
                </SidebarLinkComponent>
              </Link>
              {/* <DeployButton /> */}

              {/* <SidebarLink icon={<BsFillBookmarksFill />}>Bookmarks</SidebarLink>
                  <SidebarLink icon={<BsPencilSquare />}>Drafts</SidebarLink> */}
            </Stack>
            {/* <Stack pb="6">
                  <NavSectionTitle>Chats</NavSectionTitle>
                  <SidebarLink>🎉 Inbox</SidebarLink>
                  <SidebarLink>👍 Personal</SidebarLink>
                  <SidebarLink>🦋 Work</SidebarLink>
                </Stack> */}
            <Box position='absolute' bottom='8'>
              <SidebarLink
                mt='2'
                icon={<BsMailbox />}
                onClick={(e: any) => {
                  e.preventDefault()
                }}
              >
                お問い合わせ
              </SidebarLink>
              <SidebarLink mt='2' icon={<RiLogoutBoxRLine />} onClick={() => {}}>
                ログアウト
              </SidebarLink>
            </Box>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex='1'
        p={{ base: "0", md: "6" }}
        marginStart={{ md: "var(--sidebar-width)" }}
        position='relative'
        // left={isOpen ? "var(--sidebar-width)" : "0"}
        transition='left 0.2s'
      >
        <Box
          maxW='2560px'
          bg={mode("white", "gray.700")}
          height='100%'
          pb='6'
          rounded={{ md: "lg" }}
          overflow='auto'
        >
          {/* <Flex direction='column' height='full'>
            <BasePadding width='100%' maxW='7xl' py={0} mx='auto'>
              <Flex w='full' pt='5' justify='space-between' align='center'>
                <Flex align='center'>
                  <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                  <NavBreadcrumb />
                </Flex>
              </Flex>
              <Box py={{ base: "6" }}>{children}</Box>
            </BasePadding>
          </Flex> */}
        </Box>
      </Box>
    </Flex>
  )
}
