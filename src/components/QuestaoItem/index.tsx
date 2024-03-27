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

/*
interface QuestaoItemProps {
  questao: {
    titulo: string
    descricao: string
    tipo: string
    obrigatorio: boolean
    itens?: Array<{ descricao: string }>
  }
  index: number
  remove: (index: number) => void
}
*/

const tiposDeQuestao = [
  { valor: 'text', label: 'Texto', hasItens: false },
  { valor: 'email', label: 'E-mail', hasItens: false },
  //{ valor: 'telefone', label: 'Telefone', hasItens: false },
  { valor: 'number', label: 'Numérico', hasItens: false },
  //{ valor: 'arquivo', label: 'Arquivo', hasItens: false },
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
    const newQuestoes = [...values.secoes[indexSecao].questoes]
    const targetIndex = indexQuestao + direction

    if (targetIndex < 0 || targetIndex >= newQuestoes.length) return
    ;[newQuestoes[indexQuestao], newQuestoes[targetIndex]] = [
      newQuestoes[targetIndex],
      newQuestoes[indexQuestao],
    ]

    setFieldValue(`secoes.${indexSecao}.questoes`, newQuestoes)
  }

  const tipoDeQuestao = tiposDeQuestao.find(
    (tipo) => tipo.valor === questao.tipo,
  )
  const mostraInterfaceDeItens = tipoDeQuestao?.hasItens

  function convertToValueFormat(label: string) {
    return label.trim().toLowerCase().replace(/\s+/g, '-')
  }

  useEffect(() => {
    if (tipoDeQuestao && !tipoDeQuestao.hasItens) {
      setFieldValue(`secoes.${indexSecao}.questoes.${indexQuestao}.itens`, [])
    }
  }, [questao.tipo, indexQuestao, setFieldValue, tipoDeQuestao])

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
          id={`secoes.${indexSecao}.questoes.${indexQuestao}.titulo`}
          name={`secoes.${indexSecao}.questoes.${indexQuestao}.titulo`}
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
            htmlFor={`secoes.${indexSecao}.questoes.${indexQuestao}.descricao`}
          >
            Descrição da Questão
          </FormLabel>
          <Field
            as={Input}
            variant="filled"
            id={`secoes.${indexSecao}.questoes.${indexQuestao}.descricao`}
            name={`secoes.${indexSecao}.questoes.${indexQuestao}.descricao`}
            placeholder="Descrição da questão"
          />
        </GridItem>

        <GridItem colSpan={6}>
          <FormLabel
            htmlFor={`secoes.${indexSecao}.questoes.${indexQuestao}.tipo`}
          >
            Tipo
          </FormLabel>
          <Field
            as={Select}
            variant="filled"
            id={`secoes.${indexSecao}.questoes.${indexQuestao}.tipo`}
            name={`secoes.${indexSecao}.questoes.${indexQuestao}.tipo`}
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
              htmlFor={`secoes.${indexSecao}.questoes.${indexQuestao}.obrigatorio`}
            >
              Obrigatória
            </FormLabel>
            <Field
              as={Switch}
              id={`secoes.${indexSecao}.questoes.${indexQuestao}.obrigatorio`}
              size="lg"
              isChecked={
                values.secoes[indexSecao].questoes[indexQuestao].obrigatorio
              }
            ></Field>
          </FormControl>
        </GridItem>
      </Grid>

      {mostraInterfaceDeItens && (
        <Box bg="#FFFFFF80" p={2} my={2} borderRadius="md" boxShadow="sm">
          <FieldArray
            name={`secoes.${indexSecao}.questoes.${indexQuestao}.itens`}
          >
            {({ remove, push }) => (
              <Box>
                {values.secoes[indexSecao].questoes[indexQuestao].itens !=
                  undefined &&
                  values.secoes[indexSecao].questoes[indexQuestao].itens?.map(
                    (item, indexItem) => (
                      <HStack
                        className="row"
                        key={`item-${indexSecao}-${indexQuestao}-${indexItem}`}
                        mb={2}
                      >
                        <Field
                          as={Input}
                          name={`secoes.${indexSecao}.questoes.${indexQuestao}.itens.${indexItem}.label`}
                          placeholder="Item"
                          type="text"
                        />

                        <Button
                          colorScheme="blue"
                          onClick={() => remove(indexItem)}
                        >
                          <Icon as={FiArrowUp} />
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={() => remove(indexItem)}
                        >
                          <Icon as={FiArrowDown} />
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => remove(indexItem)}
                        >
                          <Icon as={FiTrash2} />
                        </Button>
                      </HStack>
                    ),
                  )}
                <Button
                  colorScheme="blue"
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
        </Box>
      )}
    </FormControl>
  )
}

export default QuestaoItem
