import React from 'react'
import { FiTrash2, FiArrowDown, FiArrowUp, FiPlusCircle } from 'react-icons/fi'

import { Field, FieldArray, useFormikContext } from 'formik'

import {
  Box,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react'

import QuestaoItem from '@/components/QuestaoItem'

import {
  FormValues,
  SecaoItemProps,
} from '../../pages/Dashboard/Secretaria/Formularios/types'

const SecaoItem: React.FC<SecaoItemProps> = ({ secao, indexSecao, remove }) => {
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const moveSection = (direction: number) => {
    const newSecoes = [...values.ncoStep]
    const targetIndex = indexSecao + direction

    if (targetIndex < 0 || targetIndex >= newSecoes.length) return
    ;[newSecoes[indexSecao], newSecoes[targetIndex]] = [
      newSecoes[targetIndex],
      newSecoes[indexSecao],
    ]
    setFieldValue('ncoStep', newSecoes)
  }

  return (
    <FormControl
      bg="#FFFFFF"
      boxShadow="md"
      borderRadius="md"
      p={4}
      pt={20}
      mt={4}
    >
      <HStack
        bg="white"
        px={4}
        pt={4}
        position="absolute"
        top={0}
        left={0}
        right={0}
        mx="auto"
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
      >
        <Field
          as={Input}
          variant="flushed"
          mr={2}
          id={`ncoStep.${indexSecao}.noFormStep`}
          name={`ncoStep.${indexSecao}.noFormStep`}
          placeholder="Título da seção"
          type="text"
          maxLength="20"
          required
        />

        <Button colorScheme="blue" onClick={() => moveSection(-1)}>
          <Icon as={FiArrowUp} />
        </Button>
        <Button colorScheme="blue" onClick={() => moveSection(1)}>
          <Icon as={FiArrowDown} />
        </Button>
        <Button colorScheme="red" onClick={() => remove(indexSecao)}>
          <Icon as={FiTrash2} />
        </Button>
      </HStack>

      <FormLabel htmlFor={`ncoStep.${indexSecao}.dsFormStep`}>
        Descrição da Seção
      </FormLabel>
      <Field
        as={Input}
        variant="filled"
        id={`ncoStep.${indexSecao}.dsFormStep`}
        name={`ncoStep.${indexSecao}.dsFormStep`}
        placeholder="Descrição da seção"
        type="text"
        maxLength="30"
        mb={4}
      />

      <Box
        bg="#FFFFFF"
        my={2}
        borderRadius="md"
        border="2px"
        borderColor="gray.300"
      >
        <FieldArray name={`ncoStep.${indexSecao}.ncoFormQuestion`}>
          {({ remove, push }) => (
            <Box>
              {values.ncoStep[indexSecao].ncoFormQuestion.length > 0 &&
                values.ncoStep[indexSecao].ncoFormQuestion.map(
                  (questao, indexQuestao) => (
                    <QuestaoItem
                      key={`questao-${indexSecao}-${indexQuestao}`}
                      questao={questao}
                      indexQuestao={indexQuestao}
                      indexSecao={indexSecao}
                      remove={remove}
                    />
                  ),
                )}
              <Box p={4}>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  width="full"
                  onClick={() =>
                    push({
                      noQuestion: '',
                      dsQuestion: '',
                      coTypeQuestion: '',
                      isRequired: true,
                      ncoFormItem: [],
                    })
                  }
                >
                  <Icon mr="2" as={FiPlusCircle} />
                  Adicionar Questão
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Box>
    </FormControl>
  )
}

export default SecaoItem
