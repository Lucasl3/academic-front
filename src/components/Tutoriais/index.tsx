import React from 'react'
import { Link } from 'react-router-dom'

import {
  Flex,
  OrderedList,
  ListItem,
  Text,
  useMediaQuery,
  Divider,
  Image,
  Stack,
  Box,
  Skeleton,
} from '@chakra-ui/react'

import { ITutorialsProps } from './types'

const TutoriaisHome = ({ tutorials, isLoading }: ITutorialsProps) => {
  return (
    <Stack boxShadow="lg" rounded="lg" p={4} bg="#FBFBFB" maxH="398px" flex={4}>
      <Text fontSize="lg" fontWeight="semibold" color="#444A63">
        Tutoriais
      </Text>
      <Divider my={4} />
      <Stack
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#CBD5E0',
            borderRadius: '24px',
          },
        }}
      >
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height="60px" />
          ))}
        {!isLoading && tutorials?.length === 0 && (
          <Text
            fontSize="xl"
            fontWeight="medium"
            color="#444A63"
            textAlign="center"
          >
            Sem tutoriais disponíveis
          </Text>
        )}
        {!isLoading &&
          tutorials.map((tutorial, index) => (
            <Box
              key={index}
              as={Link}
              to={`/dashboard/aluno/tutorial/${tutorial.id}`}
              listStyleType="none"
              py={1}
              m={0}
              _hover={{
                cursor: 'pointer',
                backgroundColor: '#F0F0F0',
                borderRadius: '10px',
              }}
            >
              <Flex align="center" pr={2}>
                <Image
                  src={tutorial.image ? tutorial.image : '/logo.jpg'}
                  alt={tutorial.title}
                  width="60px"
                  height="60px"
                  objectFit="cover"
                  borderRadius="10%"
                  marginRight="16px"
                />
                <Stack>
                  <Text noOfLines={1}>{tutorial.title}</Text>
                  <Text
                    noOfLines={2}
                    color="#677b9c"
                    fontSize="sm"
                    wordBreak="break-word"
                  >
                    {tutorial.description}
                  </Text>
                </Stack>
              </Flex>
            </Box>
          ))}
      </Stack>
    </Stack>
  )
}

export default TutoriaisHome
