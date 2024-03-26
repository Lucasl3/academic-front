import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { Avatar, HStack, Stack, Text } from '@chakra-ui/react'

import RequestStatus from '@/components/Tags/RequestStatus'

import { IDemandCardProps } from './types'

const DemandCard = ({
  id,
  datetime,
  title,
  user,
  status,
  to,
  onClick,
}: IDemandCardProps) => {
  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick(id)
    }
  }, [onClick])

  return (
    <Stack
      as={Link}
      to={to}
      boxShadow="lg"
      rounded="lg"
      p="6"
      bg="#FBFBFB"
      gap={3}
      onClick={handleOnClick}
    >
      <HStack justify="space-between">
        <HStack>
          <Avatar size="sm" name={user.name} src={user.picture} />
          <Text fontWeight="medium">{user.name}</Text>
        </HStack>
        <Text fontSize="sm" fontWeight="medium" textAlign="end">
          {datetime}
        </Text>
      </HStack>
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="semibold">
          {title}
        </Text>
        {status && <RequestStatus tag={status} />}
      </HStack>
    </Stack>
  )
}

export default DemandCard
