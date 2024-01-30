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
  course,
}: IFormularioCardProps) => {
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
        <HStack justifyContent="space-between">
          {course && (
            <Text fontSize="sm" fontWeight="500" color="#444A63">
              {course}
            </Text>
          )}
          {statusTag && (
            <FormularioStatusTag tag={statusTag as status} openUntil={date} />
          )}
        </HStack>
        <HStack justify="space-between">
          <Text noOfLines={1} fontSize="2xl" fontWeight="semibold">
            {title}
          </Text>
        </HStack>
        <Text noOfLines={2} fontSize="sm">
          {description}
        </Text>
      </Stack>
    </Tooltip>
  )
}

export default FormularioCard
