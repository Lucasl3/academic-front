import React from 'react'
import { BiHide } from 'react-icons/bi'
import { BsTools } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { IoLockClosed } from 'react-icons/io5'

import {
  HStack,
  Stack,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  Tooltip,
} from '@chakra-ui/react'

import { IFormularioTagStyles, IFormularioStatusTagProps } from './types'

const FormularioStatusTag = ({ tag, openUntil }: IFormularioStatusTagProps) => {
  const styles: IFormularioTagStyles = {
    available: {
      name: `Aberto até ${openUntil}`,
      colorScheme: 'green',
      icon: FaCheck,
    },
    closed: {
      name: 'Encerrado',
      colorScheme: 'red',
      icon: IoLockClosed,
    },
    default: {
      name: 'default',
      colorScheme: 'gray',
      icon: BiHide,
    },
  }

  const { name, colorScheme, icon } = styles[tag] || styles['default']

  return (
    <Tag variant="subtle" colorScheme={colorScheme}>
      <TagLeftIcon boxSize="16px" as={icon} />
      <TagLabel>{name}</TagLabel>
    </Tag>
  )
}

export default FormularioStatusTag
