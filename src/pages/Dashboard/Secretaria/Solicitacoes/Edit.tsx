import React from 'react'
import { Link } from 'react-router-dom'

import { Select } from 'chakra-react-select'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'

import TutorialStatusTag from '@/components/Tags/TutorialStatus'

interface IOption {
  value: string
  label: JSX.Element
}

const EditTutorial = () => {
  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
    null,
  )

  const options: Array<IOption> = [
    {
      value: 'hidden',
      label: <TutorialStatusTag tag="hidden" />,
    },
    {
      value: 'available',
      label: <TutorialStatusTag tag="available" />,
    },
    {
      value: 'incomplete',
      label: <TutorialStatusTag tag="incomplete" />,
    },
  ]

  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Editar tutorial
      </Text>
      <Stack>
        <HStack>
          <FormControl id="titulo" flex={3}>
            <FormLabel color="#444A63">Título</FormLabel>
            <Input
              placeholder="Escreva o título do tutorial"
              variant="filled"
            />
          </FormControl>
          <FormControl flex={1}>
            <FormLabel color="#444A63">Status</FormLabel>
            <Select
              value={selectedOption}
              options={options}
              useBasicStyles
              variant="filled"
              selectedOptionStyle="check"
              onChange={(e) => setSelectedOption(e)}
            />
          </FormControl>
        </HStack>
        <FormControl id="descrição">
          <FormLabel color="#444A63">Descrição</FormLabel>
          <Textarea
            placeholder="Escreva o título do tutorial"
            variant="filled"
            maxH="100px"
          />
        </FormControl>
        <FormControl id="conteudo">
          <FormLabel color="#444A63">Conteúdo</FormLabel>
          <Textarea
            placeholder="Escreva o título do tutorial"
            variant="filled"
            maxH="250px"
          />
        </FormControl>
      </Stack>
      <HStack justify="space-between">
        <Button as={Link} to="/dashboard/secretaria/tutoriais" variant="ghost">
          Voltar
        </Button>
        <Button bg="#495796" colorScheme="blue">
          Salvar mudanças
        </Button>
      </HStack>
    </Stack>
  )
}

export default EditTutorial
