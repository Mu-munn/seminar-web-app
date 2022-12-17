import { Avatar, Box, HStack, Text, useColorModeValue as mode } from "@chakra-ui/react"
import { User, Session } from "@supabase/supabase-js"
import useAuthUser from "../../../src/hooks/useAuthUser"

export const UserInfo = () => {
  const { user, isLoading, token } = useAuthUser()
  console.log(user)

  //   const logoUrl = corp?.logoImage?.url ?? ""
  const _user = "a"
  return (
    <HStack display='inline-flex'>
      <Avatar
        size='sm'
        name={_user}
        // src={logoUrl}
        bgColor={"white"}
      />
      <Box lineHeight='1'>
        <Text fontWeight='semibold'>{_user}</Text>
        <Text fontSize='xs' mt='1' color={mode("whiteAlpha.700", "gray.400")}>
          {_user}
        </Text>
      </Box>
    </HStack>
  )
}
