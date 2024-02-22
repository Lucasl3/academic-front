import React from 'react'

import {
  Flex,
  OrderedList,
  ListItem,
  Text,
  Link,
  useMediaQuery,
  Divider,
  Image,
} from '@chakra-ui/react'

import { TutoriaisHomeProps } from './types'
import { WordsLimit } from './utils'
type Props = {
  tutoriais: TutoriaisHomeProps[]
}

const TutoriaisHome = (tutoriais: Props) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const tutoriaisSliced = tutoriais.tutoriais.slice(-4).reverse()

  return (
    <Flex
      boxShadow="lg"
      rounded="lg"
      p={4}
      bg="#FBFBFB"
      sx={{
        flexDirection: 'column',
        width: isMobile ? '100%' : '70%',
      }}
    >
      <Text fontSize="lg" fontWeight="semibold" color="#444A63">
        Tutoriais
      </Text>
      <Divider my={4} />
      {tutoriaisSliced.map((tutorial, index) => (
        <OrderedList
          key={index}
          listStyleType="none"
          onClick={() => window.open(tutorial.url, '_blank')}
          sx={{
            margin: 0,
            paddingY: 2,
            _hover: {
              cursor: 'pointer',
              backgroundColor: '#F0F0F0',
              borderRadius: '10px',
            },
          }}
        >
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image
              src={tutorial.image ? tutorial.image : '/logo.jpg'}
              alt={tutorial.title}
              sx={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '10%',
                marginRight: '16px',
              }}
            />
            <Flex
              sx={{
                flexDirection: 'column',
              }}
            >
              <Text>{tutorial.title}</Text>
              <Text color="#677b9c" fontSize="sm" wordBreak="break-word">
                {WordsLimit(tutorial.description, 100)}
              </Text>
            </Flex>
          </ListItem>
        </OrderedList>
      ))}
    </Flex>
  )
}

export default TutoriaisHome
