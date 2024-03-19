import React from 'react'
import { Link } from 'react-router-dom'

import { HStack, Stack, Tag, Text, Tooltip } from '@chakra-ui/react'

import RequestStatus from '@/components/Tags/RequestStatus'
import { status } from '@/components/Tags/RequestStatus/types'

import { IRequestCardProps } from './types'

const RequestCard = ({
  title,
  date,
  to,
  tooltipText,
  status,
}: IRequestCardProps) => {
  return (
    <Tooltip label={tooltipText}>
      <Stack
        as={Link}
        to={to}
        boxShadow="lg"
        rounded="lg"
        p="6"
        bg={'#FFFFFF'}
        gap={2}
        cursor={'pointer'}
      >
        <HStack justifyContent="space-between">
          {date && (
            <Text fontSize="sm" fontWeight="500" color="#444A63">
              {date}
            </Text>
          )}
          {status && <RequestStatus tag={status} />}
        </HStack>
        <HStack justify="space-between">
          <Text noOfLines={1} fontSize="2xl" fontWeight="semibold">
            {title}
          </Text>
        </HStack>
      </Stack>
    </Tooltip>
  )
}

export default RequestCard
