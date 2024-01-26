import React from 'react'
import { BiHide } from 'react-icons/bi'
import { BsTools } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import {
  HStack,
  Stack,
  Text,
  Tag as ChakraTag,
  TagLeftIcon,
  TagLabel,
  Tooltip,
} from '@chakra-ui/react'

import TutorialStatusTag from '@/components/Tags/TutorialStatus'
import { status } from '@/components/Tags/TutorialStatus/types'

import { ITutorialCardProps } from './types'

const TutorialCard = ({
  title,
  description,
  to,
  statusTag,
  tooltipText,
}: ITutorialCardProps) => {
  return (
    <Tooltip label={tooltipText}>
      <Stack
        as={Link}
        to={to}
        boxShadow="lg"
        rounded="lg"
        p="6"
        bg="#FBFBFB"
        gap={2}
      >
        <HStack justify="space-between">
          <Text noOfLines={1} fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          {statusTag && <TutorialStatusTag tag={statusTag as status} />}
        </HStack>
        <Text noOfLines={2}>{description}</Text>
      </Stack>
    </Tooltip>
  )
}

export default TutorialCard
