import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { LinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Flex,
  Text,
  IconButton,
  Tooltip,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

import { getNew } from '@/api/dashboard/news/services'
import { TGetNewParams } from '@/api/dashboard/news/types'
import { formatDate } from '@/utils/date'

const NewsPage = () => {
  const toast = useToast()
  const { id } = useParams()
  const [data, setData] = useState({
    id: 0,
    title: '',
    description: '',
    date: '',
    image: '',
  })
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet convallis massa. Aliquam in risus et ligula mollis ultricies ac ut enim. Morbi auctor dictum scelerisque. Suspendisse nec rutrum dolor. Aenean suscipit eget nulla vel euismod. Integer eu ex sapien. In elementum nunc suscipit, laoreet metus ac, malesuada nisi. Maecenas neque sapien, porttitor at porttitor ut, dictum et ex. Pellentesque a massa quis nibh scelerisque ornare. Nulla hendrerit diam finibus maximus lobortis. Vestibulum vitae nisl non justo egestas condimentum ac ac est. Cras at semper lacus, eget facilisis justo. Mauris eget lectus et sem aliquet vehicula non eu ipsum. Nulla luctus pretium sagittis. Praesent blandit maximus lectus id pellentesque. Ut in neque nec lectus rutrum scelerisque. Curabitur bibendum tellus nec dapibus ultrices. Donec maximus, dolor id ultricies tempus, eros nulla tempor lorem, sed mollis ex arcu id est. Duis gravida erat vel ex lacinia efficitur. Donec rutrum rutrum iaculis. Ut euismod dapibus ipsum, non vehicula tortor finibus ut. Nullam tortor enim, tempor vel placerat non, semper et tellus. Mauris ut interdum velit. Mauris ut lacinia dolor. Donec efficitur magna nec risus rhoncus, sed convallis magna pellentesque. Pellentesque molestie libero a enim fermentum sodales. Curabitur congue sapien eros, vel convallis augue sollicitudin sed. Curabitur tincidunt id urna sit amet elementum. Donec consectetur lectus vel ligula dignissim tempor. Vivamus magna metus, vulputate quis tortor et, eleifend viverra eros. Donec ut luctus libero. Proin et facilisis enim. Aliquam porta, neque vitae luctus rhoncus, risus nisl consectetur lorem, vitae aliquam quam diam vitae nisl. Vestibulum vitae consequat lorem, ut dapibus odio. Cras in cursus purus. Phasellus pulvinar lacus et arcu pulvinar laoreet. Suspendisse a commodo massa. Maecenas tempor sem quis magna feugiat iaculis. Vestibulum vehicula orci enim. Curabitur convallis id enim at malesuada. Etiam tristique eros id ex bibendum, eget posuere lorem feugiat. Nunc iaculis pretium turpis in blandit. Donec consectetur ullamcorper purus non venenatis. Curabitur vitae nisi sit amet odio consectetur elementum interdum eu ipsum. Quisque in faucibus orci. Praesent rutrum metus purus, at ultrices enim aliquam nec. Morbi malesuada dictum nulla quis hendrerit. Suspendisse velit ipsum, scelerisque et turpis ut, congue ultrices nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc id fermentum quam. Proin ultrices feugiat sapien, eget congue urna tempus eu. Nullam in nulla eu ex rutrum varius. Donec sollicitudin libero dui, sit amet auctor nibh congue et. Ut eu venenatis mi. In non tellus a sem interdum placerat. Curabitur ex enim, maximus hendrerit tristique eget, egestas ut lectus. Donec interdum rutrum turpis luctus facilisis. Donec tempor velit et nisl dictum, sed pulvinar dui finibus. Phasellus commodo suscipit pharetra.'

  useEffect(() => {
    const params: TGetNewParams = { id: Number(id) }
    console.log(params, id)

    if (!isNaN(params.id)) {
      getNew(params).then((response) => {
        const data = {
          id: response.coNews,
          title: response.noNews,
          description: response.dsNews,
          date: response.dtNews,
          image:
            'https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg',
        }
        setData(data)
      })
    }
  }, [id])

  return (
    <Box padding="1rem 2rem">
      <Breadcrumb sx={{ fontSize: '14px' }}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/home">Início</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{data.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider borderColor="gray.400" mb={5} />
      <Flex
        sx={{
          textAlign: 'center',
          flexDirection: 'column',
          gap: 2,
          mb: 10,
        }}
      >
        <Text
          sx={{
            fontSize: '3xl',
            fontWeight: 'bold',
          }}
        >
          {data.title}
        </Text>
        <Text>{data.description}</Text>
      </Flex>
      <Box>
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            sx={{
              fontSize: 'sm',
              color: 'gray.500',
            }}
          >
            Criado em: {formatDate(data.date)}
          </Text>
          <Tooltip label="Copiar link da notícia" hasArrow>
            <IconButton
              variant="outline"
              icon={<LinkIcon name="link" />}
              aria-label="Icone de clipe para copiar o link da notícia"
              sx={{
                _hover: {
                  color: 'gray.800',
                  borderColor: 'gray.800',
                },
              }}
              onClick={() => {
                toast({
                  title: 'Link copiado',
                  status: 'success',
                  duration: 1500,
                })
              }}
            />
          </Tooltip>
        </Flex>
        <Divider borderColor="gray" mb={5} variant="dashed" />
      </Box>

      <Text sx={{ textAlign: 'justify' }}>{lorem}</Text>
    </Box>
  )
}

export default NewsPage
