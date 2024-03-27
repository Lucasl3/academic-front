import React from 'react'
import { FiTrash2, FiArrowDown, FiArrowUp, FiPlusCircle } from 'react-icons/fi'

import { Field, FieldArray, useFormikContext } from 'formik'

import {
  Box,
  Grid,
  GridItem,
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
    const newSecoes = [...values.secoes]
    const targetIndex = indexSecao + direction

    if (targetIndex < 0 || targetIndex >= newSecoes.length) return
    ;[newSecoes[indexSecao], newSecoes[targetIndex]] = [
      newSecoes[targetIndex],
      newSecoes[indexSecao],
    ]
    setFieldValue('secoes', newSecoes)
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
          id={`secoes.${indexSecao}.titulo`}
          name={`secoes.${indexSecao}.titulo`}
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

      <FormLabel htmlFor={`secoes.${indexSecao}.descricao`}>
        Descrição da Seção
      </FormLabel>
      <Field
        as={Input}
        variant="filled"
        id={`secoes.${indexSecao}.descricao`}
        name={`secoes.${indexSecao}.descricao`}
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
        <FieldArray name={`secoes.${indexSecao}.questoes`}>
          {({ remove, push }) => (
            <Box>
              {values.secoes[indexSecao].questoes.length > 0 &&
                values.secoes[indexSecao].questoes.map(
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
                      titulo: '',
                      descricao: '',
                      tipo: '',
                      obrigatorio: true,
                      itens: [],
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

/*
  <FieldArray name={`questoes.${index}.itens`}>
    {({ remove, push }) => (
      <Box>
        {secao.questoes &&
          secao.questoes.length > 0 &&
          secao.questoes.map((questao, questoes_index) => (
            <HStack className="row" key={questoes_index} mb={2}>
              <Field
                as={Input}
                name={`questoes.${index}.itens.${questoes_index}.descricao`}
                placeholder="Item"
                type="text"
              />
              <ErrorMessage
                name={`questoes.${index}.itens.${questoes_index}.descricao`}
                component="div"
                className="field-error"
              />
              <Button colorScheme="blue" onClick={() => remove(index)}>
                <Icon as={FiArrowUp} />
              </Button>
              <Button colorScheme="blue" onClick={() => remove(index)}>
                <Icon as={FiArrowDown} />
              </Button>
              <Button
                colorScheme="red"
                onClick={() => remove(questoes_index)}
              >
                <Icon as={FiTrash2} />
              </Button>
            </HStack>
          ))}
        <Button
          onClick={() =>
            push({
              descricao: '',
            })
          }
        >
          Adicionar item
        </Button>
      </Box>
    )}
  </FieldArray>
*/

export default SecaoItem
