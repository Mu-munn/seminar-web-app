import BlogCard from '@/components/common/Cards/BlogCard'
import { Editor } from '@/components/features/Editor/Editor'
import { UserLayout } from '@/components/Layout/UserLayout'
import { jobHuntingBlogs } from '@/libs/assets/articles'
import { Button, Center, Flex, Heading, HStack, SimpleGrid, Spacer } from '@chakra-ui/react'
import { useState } from 'react'

const ArticlePage = () => {
  const [data, setData] = useState()
  return (
    <UserLayout>
      <HStack w={'90%'} ml={4}>
        <Heading fontSize={'20px'}>就活掲示板</Heading>
        <Spacer></Spacer>
        <Button
          color={'#ededed'}
          onClick={() => {}}
          borderRadius={'50px'}
          bg={'blue.600'}
          boxShadow={'20px 20px 60px #bebebe,-20px -20px 60px #ffffff'}
          w={'160px'}
        >
          記事を書く
        </Button>
      </HStack>

      {/* <Editor></Editor> */}

      <Flex w={'100%'} gap={10} wrap={'wrap'} mx={'auto'} mt={4} ml="3">
        {jobHuntingBlogs.map((m) => {
          return (
            <BlogCard key={m.title} title={m.title} description={m.description} author={m.author} />
          )
        })}
      </Flex>
    </UserLayout>
  )
}

export default ArticlePage
