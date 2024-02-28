import React from 'react'
import { BiHide } from 'react-icons/bi'
import { BsTools } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { IoLockClosed, IoEye, IoEyeOff } from 'react-icons/io5'
import { MdOutlinePending } from 'react-icons/md'

import {
  HStack,
  Stack,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  Tooltip,
} from '@chakra-ui/react'

import { IRequestTagStyles, IRequestStatusTagProps } from './types'

const RequestStatusTag = ({ tag }: IRequestStatusTagProps) => {
  const styles: IRequestTagStyles = {
    done: {
      name: 'Concluído',
      colorScheme: 'green',
      icon: FaCheck,
    },
    in_progress: {
      name: 'Em andamento',
      colorScheme: 'yellow',
      icon: MdOutlinePending,
    },
    received: {
      name: 'Recebido',
      colorScheme: 'orange',
      icon: IoEyeOff,
    },
    viewed: {
      name: 'Visualizado',
      colorScheme: 'blue',
      icon: IoEye,
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

export default RequestStatusTag
