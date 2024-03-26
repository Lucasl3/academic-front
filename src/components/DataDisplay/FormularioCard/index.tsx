import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Flex, HStack, Stack, Text, Tooltip, useToast } from '@chakra-ui/react'

import FormularioStatusTag from '@/components/Tags/FormularioStatus'
import { status } from '@/components/Tags/FormularioStatus/types'

import { IFormularioCardProps } from './types'

const FormularioCard = ({
  title,
  description,
  date,
  to,
  tooltipText,
  statusTag,
  isClosed,
}: IFormularioCardProps) => {
  const navigate = useNavigate()
  const toast = useToast()

  const closeFormAlert = () => {
    toast({
      title: 'Este formulário está encerrado.',
      status: 'warning',
      duration: 1000,
    })
  }

  return (
    <Tooltip label={tooltipText}>
      <Stack
        boxShadow="lg"
        rounded="lg"
        p="6"
        bg={isClosed ? '#DDDDDD' : '#FFFFFF'}
        gap={2}
        cursor={isClosed ? 'not-allowed' : 'pointer'}
        onClick={() => (!isClosed ? navigate(to) : closeFormAlert())}
      >
        <HStack justifyContent="space-between">
          <Text noOfLines={1} fontSize="2xl" fontWeight="semibold">
            {title}
          </Text>
          {statusTag && (
            <FormularioStatusTag tag={statusTag as status} openUntil={date} />
          )}
        </HStack>
        <Text noOfLines={2} fontSize="sm">
          {description}
        </Text>
      </Stack>
    </Tooltip>
  )
}

export default FormularioCard
