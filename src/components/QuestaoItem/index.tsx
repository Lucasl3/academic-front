import React, { useEffect } from 'react'
import { FiTrash2, FiArrowDown, FiArrowUp } from 'react-icons/fi'

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
  Select,
  Icon,
  Switch,
} from '@chakra-ui/react'

import {
  FormValues,
  QuestaoItemProps,
} from '../../pages/Dashboard/Secretaria/Formularios/types'

const tiposDeQuestao = [
  { valor: 'text', label: 'Texto', hasItens: false },
  { valor: 'email', label: 'E-mail', hasItens: false },
  { valor: 'number', label: 'Numérico', hasItens: false },
  {
    valor: 'radio',
    label: 'Múltipla escolha (uma resposta)',
    hasItens: true,
  },
  {
    valor: 'checkbox',
    label: 'Caixas de seleção (várias respostas)',
    hasItens: true,
  },
]

const QuestaoItem: React.FC<QuestaoItemProps> = ({
  questao,
  indexQuestao,
  indexSecao,
  remove,
}) => {
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const moveQuestion = (direction: number) => {
    const newQuestoes = [...values.ncoStep[indexSecao].ncoFormQuestion]
    const targetIndex = indexQuestao + direction

    if (targetIndex < 0 || targetIndex >= newQuestoes.length) return
    ;[newQuestoes[indexQuestao], newQuestoes[targetIndex]] = [
      newQuestoes[targetIndex],
      newQuestoes[indexQuestao],
    ]

    setFieldValue(`ncoStep.${indexSecao}.ncoFormQuestion`, newQuestoes)
  }

  const tipoDeQuestao = tiposDeQuestao.find(
    (tipo) => tipo.valor === questao.coTypeQuestion,
  )
  const mostraInterfaceDeItens = tipoDeQuestao?.hasItens

  useEffect(() => {
    if (tipoDeQuestao && !tipoDeQuestao.hasItens) {
      setFieldValue(
        `ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.ncoFormItem`,
        [],
      )
    }
  }, [questao.coTypeQuestion, indexQuestao, setFieldValue, tipoDeQuestao])

  return (
    <FormControl
      bg="#FFFFFF4D"
      boxShadow="sm"
      borderRadius="md"
      p={4}
      pt={20}
      mt={4}
    >
      <HStack
        bg="white"
        px={4}
        pt={2}
        pb={4}
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
          id={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.noQuestion`}
          name={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.noQuestion`}
          placeholder="Título da questão"
        />

        <Button colorScheme="blue" onClick={() => moveQuestion(-1)}>
          <Icon as={FiArrowUp} />
        </Button>
        <Button colorScheme="blue" onClick={() => moveQuestion(1)}>
          <Icon as={FiArrowDown} />
        </Button>
        <Button colorScheme="red" onClick={() => remove(indexQuestao)}>
          <Icon as={FiTrash2} />
        </Button>
      </HStack>

      <Grid templateColumns="repeat(13, 1fr)" gap={4}>
        <GridItem colSpan={6}>
          <FormLabel
            htmlFor={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.dsQuestion`}
          >
            Descrição da Questão
          </FormLabel>
          <Field
            as={Input}
            variant="filled"
            id={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.dsQuestion`}
            name={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.dsQuestion`}
            placeholder="Descrição da questão"
          />
        </GridItem>

        <GridItem colSpan={6}>
          <FormLabel
            htmlFor={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.tipo`}
          >
            Tipo
          </FormLabel>
          <Field
            as={Select}
            variant="filled"
            id={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.coTypeQuestion`}
            name={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.coTypeQuestion`}
            placeholder="Selecione o tipo"
          >
            {tiposDeQuestao.map((tipo) => (
              <option key={tipo.valor} value={tipo.valor}>
                {tipo.label}
              </option>
            ))}
          </Field>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel
              htmlFor={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.isRequired`}
            >
              Obrigatória
            </FormLabel>
            <Field
              as={Switch}
              id={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.isRequired`}
              size="lg"
              isChecked={
                values.ncoStep[indexSecao].ncoFormQuestion[indexQuestao]
                  .isRequired
              }
            ></Field>
          </FormControl>
        </GridItem>
      </Grid>

      {mostraInterfaceDeItens && (
        <Box bg="#FFFFFF80" p={2} my={2} borderRadius="md" boxShadow="sm">
          <FieldArray
            name={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.ncoFormItem`}
          >
            {({ remove, push }) => (
              <Box>
                {values.ncoStep[indexSecao].ncoFormQuestion[indexQuestao]
                  .ncoFormItem != undefined &&
                  values.ncoStep[indexSecao].ncoFormQuestion[
                    indexQuestao
                  ].ncoFormItem?.map((item, indexItem) => (
                    <HStack
                      className="row"
                      key={`item-${indexSecao}-${indexQuestao}-${indexItem}`}
                      mb={2}
                    >
                      <Field
                        as={Input}
                        name={`ncoStep.${indexSecao}.ncoFormQuestion.${indexQuestao}.ncoFormItem.${indexItem}.dsItem`}
                        placeholder="Item"
                        type="text"
                      />

                      <Button
                        colorScheme="red"
                        onClick={() => remove(indexItem)}
                      >
                        <Icon as={FiTrash2} />
                      </Button>
                    </HStack>
                  ))}
                <Button
                  colorScheme="blue"
                  onClick={() =>
                    push({
                      dsItem: '',
                    })
                  }
                >
                  Adicionar item
                </Button>
              </Box>
            )}
          </FieldArray>
        </Box>
      )}
    </FormControl>
  )
}

export default QuestaoItem
