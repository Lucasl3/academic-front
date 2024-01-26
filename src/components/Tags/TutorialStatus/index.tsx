import React from 'react'
import { BiHide } from 'react-icons/bi'
import { BsTools } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'

import {
  HStack,
  Stack,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  Tooltip,
} from '@chakra-ui/react'

import { IStatusTagStyles, ITutorialStatusTagProps } from './types'

const TutorialStatusTag = ({ tag }: ITutorialStatusTagProps) => {
  const styles: IStatusTagStyles = {
    hidden: {
      name: 'Oculto',
      colorScheme: 'blackAlpha',
      icon: BiHide,
    },
    available: {
      name: 'Disponível',
      colorScheme: 'green',
      icon: FaCheck,
    },
    incomplete: {
      name: 'Incompleto',
      colorScheme: 'yellow',
      icon: BsTools,
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

export default TutorialStatusTag
