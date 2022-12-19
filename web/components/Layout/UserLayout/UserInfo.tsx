import { Avatar, Box, HStack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import useAuthUser from '../../../src/hooks/useAuthUser'

export const UserInfo = () => {
  const { user } = useAuthUser()
  const userName: string = user && user?.user_metadata?.full_name
  const email = user !== undefined && user !== null && user.email

  return (
    <HStack display="inline-flex">
      <Avatar size="sm" bgColor={'white'} />
      <Box lineHeight="1">
        <Text fontSize="xs" mt="1" color={mode('whiteAlpha.700', 'gray.400')}>
          {email}
        </Text>
        <Text fontWeight="semibold">{userName}</Text>
      </Box>
    </HStack>
  )
}
