import useProfile from '@/hooks/useProfile'
import { Avatar, Box, HStack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import useAuthUser from '@/hooks/useAuthUser'

export const UserInfo = () => {
  const { user } = useAuthUser()
  const { profile } = useProfile()

  const userName: string = profile?.full_name ?? ''
  const email = user?.email ?? ''

  return (
    <HStack display="inline-flex">
      <Avatar size="sm" bgColor={'white'} />
      <Box lineHeight="1">
        <Text fontSize="xs" mt="1" color={mode('whiteAlpha.700', 'gray.400')}>
          {email}
        </Text>
        <Text pt={2} fontWeight="semibold">
          {userName}
        </Text>
      </Box>
    </HStack>
  )
}
