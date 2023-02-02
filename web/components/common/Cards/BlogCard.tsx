// import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'

interface CardProps {
  title: string
  description: string
  author: string
}

export default function blogPostWithImage(props: CardProps) {
  const { title, description, author } = props
  return (
    <Center py={3}>
      <Box
        maxW={'405px'}
        w={'full'}
        bg={'white'}
        boxShadow={'none'}
        transition={'0.2s'}
        _hover={{ boxShadow: '2xl' }}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        cursor={'pointer'}
      >
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          {/* <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            alt={''}
            // layout={'fill'}
          /> */}
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading color={'gray.700'} fontSize={'2xl'} fontFamily={'body'} noOfLines={1}>
            {title}
          </Heading>
          <Text color={'gray.500'} noOfLines={6}>
            {description}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          {/* <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} /> */}
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{author}</Text>
            <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
