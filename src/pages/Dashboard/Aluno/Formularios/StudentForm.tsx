import React, { useEffect, useMemo } from 'react'
import { act } from 'react-dom/test-utils'
import { set } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Stack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  color,
  useToast,
  Skeleton,
  HStack,
  SimpleGrid,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  extendTheme,
  Tooltip,
  Box,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'

import { useQueryForm } from '@/api/dashboard/forms/queries'
import UploadFile from '@/components/UploadFile'
import { formatDate } from '@/utils/date'

// const fieldSets: {
//   id: string
//   name: string
//   description?: string
//   type: string
//   step: number
//   isRequired: boolean
//   options?: string[] | { id: number; label: string }[]
//   placeholder?: string
//   value?: string | [number]
// }[] = [
//   {
//     id: '1',
//     name: 'Nome Completo',
//     type: 'text',
//     step: 0,
//     isRequired: true,
//     placeholder: 'Informe seu nome',
//   },
//   {
//     id: '2',
//     name: 'Matrícula',
//     type: 'number',
//     step: 0,
//     isRequired: true,
//     placeholder: 'Informe sua matrícula',
//   },
//   {
//     id: '3',
//     name: 'Curso',
//     type: 'radio',
//     step: 0,
//     isRequired: true,
//     options: ['Engenharia de Computação', 'Ciência da Computação'],
//   },
//   {
//     id: '4',
//     name: 'Email institucional',
//     type: 'email',
//     step: 0,
//     isRequired: true,
//     placeholder: 'Informe seu email institucional',
//   },
//   {
//     id: '5',
//     name: 'Ano de Ingresso',
//     type: 'number',
//     step: 0,
//     isRequired: true,
//     placeholder: 'Informe seu ano de ingresso',
//   },
//   {
//     id: '6',
//     name: 'Período Atual',
//     type: 'number',
//     step: 0,
//     isRequired: true,
//     placeholder: 'Informe seu período atual',
//   },
//   {
//     id: '7',
//     name: 'Endereço',
//     type: 'text',
//     step: 0,
//     isRequired: true,
//     placeholder: 'Informe seu endereço',
//   },
//   {
//     id: '8',
//     name: 'Celular',
//     type: 'tel',
//     step: 0,
//     isRequired: true,
//     placeholder: 'Informe seu número de celular',
//   },
//   {
//     id: '9',
//     name: 'Tipo de Trancamento',
//     type: 'radio',
//     step: 1,
//     isRequired: true,
//     options: ['Trancamento de Curso', 'Trancamento de Disciplina'],
//   },
//   {
//     id: '10',
//     name: 'Anexo de Documentos',
//     type: 'file',
//     step: 1,
//     isRequired: true,
//   },
//   {
//     id: '11',
//     name: 'ACE(s) desejada(s)',
//     type: 'checkbox',
//     step: 1,
//     isRequired: true,
//     options: [
//       {
//         id: 1,
//         label: 'Teste 1',
//       },
//       {
//         id: 2,
//         label: 'Teste 2',
//       },
//       {
//         id: 3,
//         label: 'Teste 3',
//       },
//       {
//         id: 4,
//         label: 'Teste 4',
//       },
//       {
//         id: 5,
//         label: 'Teste 5',
//       },
//     ],
//   },
//   {
//     id: '12',
//     name: 'Anexo de Documentos 2',
//     type: 'file',
//     step: 1,
//     isRequired: true,
//   },
// ]

const COLORS = {
  0: '#F7F7FA',
  5: '#EDEDF0',
  10: '#E1E1E3',
  40: '#9696A0',
  controlColor: '#2264D1',
  focusColor: '#9DC2FF',
}

const smoothClasses = {
  minH: '40px',
  px: '12px',
  w: '100%',
  borderRadius: '6px',
  transition: 'all 150ms',
  _checked: {
    bg: COLORS[10],
  },
  'span[class*="checkbox__control"]:not([data-disabled])': {
    borderColor: COLORS.controlColor,
    _checked: {
      bg: COLORS.controlColor,
      borderColor: COLORS.controlColor,
    },
    _focus: {
      boxShadow: `0 0 0 2px ${COLORS.focusColor}`,
      _checked: {
        boxShadow: `0 0 0 2px ${COLORS.focusColor}`,
      },
    },
  },
  _hover: {
    transition: 'all 350ms',
    bg: COLORS[5],
    _checked: {
      bg: COLORS[10],
    },
  },
}

interface ICheckboxOption {
  id: number
  label: string
}

function StudentForm() {
  const toast = useToast()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: form, isFetching: isFormLoading } = useQueryForm(
    {
      id: Number(id),
    },
    {
      enabled: !!id,
      onError: () => {
        toast({
          title: 'Houve um erro ao buscar o Formulário.',
          status: 'error',
          duration: 5000,
        })
      },
    },
  )

  const formData = useMemo(() => {
    return {
      id: form?.coForm,
      title: form?.noForm,
      description: form?.dsForm,
      last_update: form?.dtUpdatedAt,
      questions: form?.ncoQuestion,
    }
  }, [form])

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  })

  const [fieldSets, setFieldSets] = React.useState<any>(null)

  const [handleFilled, setHandleFilled] = React.useState<Array<boolean>>([])

  const handleFilledFields = (step: number) => {
    currentFields?.forEach((field: any) => {
      if (field.step === step) {
        setHandleFilled((prev) => {
          prev[step] = !(field.isRequired && field.value === null)
          return prev
        })
      }
    })
  }

  useEffect(() => {
    const aux = formData.questions?.map((question: any, index: number) => {
      return {
        id: question.coFormQuestion,
        name: question.noQuestion,
        description: question.dsQuestion,
        type: question.coTypeQuestion,
        step: index,
        isRequired: true,
        options: question.ncoFormItem,
        placeholder: 'Informe o valor',
        value: null,
      }
    })

    setFieldSets(aux)
  }, [formData])

  const handleValueChange = (fieldId: string, value: any) => {
    const aux = fieldSets?.map((field: any) => {
      if (field.id === fieldId) {
        if (value !== null && value !== undefined && value !== '') {
          field.value = value
        }
      }
      return field
    })

    handleFilledFields(activeStep)
    setFieldSets(aux)
  }

  const handleClearFields = (step: number) => {
    const aux = fieldSets?.map((field: any) => {
      if (field.step === step) {
        field.value = null
      }
      return field
    })

    setFieldSets(aux)
    handleFilledFields(activeStep)
  }

  const currentFields = fieldSets?.filter(
    (field: any) => field.step === activeStep || activeStep === 2,
  )

  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<
    Array<ICheckboxOption>
  >([])

  const handleSelectedCheckboxes = (option: ICheckboxOption) => {
    const indexOption = selectedCheckboxes.indexOf(option)

    if (indexOption === -1) {
      setSelectedCheckboxes([...selectedCheckboxes, option])
    } else {
      setSelectedCheckboxes([
        ...selectedCheckboxes.filter((item) => item !== option),
      ])
    }
  }

  type TouchedFields = {
    [key: string]: boolean
  }

  const [touchedFields, setTouchedFields] = React.useState<TouchedFields>({})
  const [clickedFields, setClickedFields] = React.useState<TouchedFields>({})

  const renderFields = (columns: number) => {
    const handleFieldTouch = (fieldId: string) => {
      setTouchedFields((prev) => ({
        ...prev,
        [fieldId]: true,
      }))
    }
    const handleFieldClick = (fieldId: string) => {
      setClickedFields((prev) => ({
        ...prev,
        [fieldId]: true,
      }))
      setTouchedFields((prev) => ({
        ...prev,
        [fieldId]: false,
      }))
    }

    return (
      <SimpleGrid spacing={6} columns={2}>
        {currentFields?.map((field: any) => {
          if (!field) return null

          const isStep2 = activeStep === 2
          const isDisabled = isStep2 ? true : false
          const isError =
            touchedFields[field.id] && field.isRequired && field.value === null

          return (
            <Box
              key={field.id}
              id={field.id}
              color="#19191D"
              alignItems="center"
              justifyContent="center"
              paddingTop={4}
            >
              {field.type === 'checkbox' &&
                (field.step === activeStep || activeStep === 2) && (
                  <FormControl
                    key={field.id}
                    id={field.id}
                    isRequired={field.isRequired}
                    isInvalid={isError}
                    p={6}
                    paddingInline={10}
                    w="100%"
                    border="1px solid #E1E1E3"
                    rounded="lg"
                    boxShadow="md"
                    bg="#FBFBFB"
                  >
                    <FormLabel paddingBottom={4}>{field.name}</FormLabel>
                    <Stack spacing={4} direction={['column']}>
                      {field.options?.map(
                        (option: ICheckboxOption, optionIndex: number) => (
                          <Checkbox
                            onFocus={() => handleFieldClick(field.id)}
                            onBlur={() => handleFieldTouch(field.id)}
                            key={optionIndex}
                            isChecked={selectedCheckboxes.includes(option)}
                            onChange={() => {
                              handleSelectedCheckboxes(option)
                              // handleValueChange(field.id, option)
                              touchedFields[field.id] = true
                            }}
                            value={option.label}
                            sx={
                              isDisabled
                                ? { cursor: 'not-allowed' }
                                : smoothClasses
                            }
                            size="md"
                            isDisabled={isDisabled}
                          >
                            {option.label}
                          </Checkbox>
                        ),
                        (field.value = selectedCheckboxes),
                      )}
                    </Stack>
                    {!isError && field.description && (
                      <FormHelperText>{field.description}</FormHelperText>
                    )}
                    {isError && (
                      <FormErrorMessage>
                        É necessário selecionar pelo menos uma caixa de seleção
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              {field.type === 'radio' &&
                (field.step === activeStep || activeStep === 2) && (
                  <FormControl
                    key={field.id}
                    id={field.id}
                    isRequired={field.isRequired}
                    p={4}
                    paddingInline={10}
                    w="100%"
                    border="1px solid #E1E1E3"
                    rounded="lg"
                    boxShadow="md"
                    bg="#FBFBFB"
                  >
                    <FormLabel paddingBottom={2}>{field.name}</FormLabel>
                    <RadioGroup
                      onChange={(value) => {
                        handleValueChange(field.id, value)
                      }}
                      value={String(field.value)}
                      isDisabled={true}
                    >
                      <Stack spacing={4} direction={['column']}>
                        {field.options?.map((option: any) => {
                          return (
                            <Radio
                              key={`radio-${option.coFormItem}`}
                              size="md"
                              value={String(option.coFormItem)}
                              isDisabled={isDisabled}
                            >
                              {option.dsItem}
                            </Radio>
                          )
                        })}
                      </Stack>
                    </RadioGroup>
                    {!isError && field.description && (
                      <FormHelperText>{field.description}</FormHelperText>
                    )}
                    {isError && (
                      <FormErrorMessage>
                        É necessário selecionar uma opção
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              {field.type === 'file' &&
                (field.step === activeStep || activeStep === 2) && (
                  <FormControl
                    key={field.id}
                    isRequired={field.isRequired}
                    p={6}
                    paddingInline={10}
                    w="100%"
                    border="1px solid #E1E1E3"
                    rounded="lg"
                    boxShadow="md"
                    bg="#FBFBFB"
                    // isDisabled={isDisabled}
                  >
                    <FormLabel paddingBottom={4}>{field.name}</FormLabel>
                    <UploadFile
                      id={'file' + field.id}
                      file={field.value}
                      onFileChange={(file) => {
                        field.value = file
                        handleValueChange(field.id, file)
                      }}
                    />

                    <FormErrorMessage>{`${field.name} é necessário`}</FormErrorMessage>
                    <FormHelperText>{field.description}</FormHelperText>
                  </FormControl>
                )}
              {field.type !== 'checkbox' &&
                field.type !== 'radio' &&
                field.type !== 'file' &&
                (field.step === activeStep || activeStep === 2) && (
                  <FormControl
                    key={field.id}
                    id={field.id}
                    isRequired={field.isRequired}
                    isInvalid={isError}
                    p={6}
                    paddingInline={10}
                    w="100%"
                    border="1px solid #E1E1E3"
                    rounded="lg"
                    boxShadow="md"
                    bg="#FBFBFB"
                  >
                    <FormLabel paddingBottom={4}>{field.name}</FormLabel>
                    <Input
                      variant={isDisabled ? 'filled' : 'flushed'}
                      onFocus={() => handleFieldClick(field.id)}
                      onBlur={() => handleFieldTouch(field.id)}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        handleValueChange(field.id, e.target.value)
                      }}
                      value={field.value || ''}
                      borderColor={isDisabled ? 'gray.100' : 'gray.400'}
                      isDisabled={isDisabled}
                      textColor={isDisabled ? 'gray.600' : 'gray.800'}
                    />
                    {!isError && field.description && (
                      <FormHelperText>{field.description}</FormHelperText>
                    )}
                    {isError && (
                      <FormErrorMessage>
                        Este campo é obrigatório
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
            </Box>
          )
        })}
      </SimpleGrid>
    )
  }

  function FormSteps() {
    const steps = [
      { title: 'Aluno', description: 'Dados Iniciais' },
      { title: 'Documentos', description: 'Dados do Formulário' },
      { title: 'Enviar', description: 'Revisão dos Dados' },
    ]

    return (
      <Stepper
        size="lg"
        w="90%"
        index={activeStep}
        colorScheme="blue"
        color="#495796"
        variant="solid"
        p={5}
      >
        {steps.map((step, index) => (
          <Step
            style={{ color: '#495796' }}
            key={index}
            onClick={() => setActiveStep(index)}
          >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }

  return (
    <Box>
      <Stack>
        <Skeleton isLoaded={!isFormLoading}>
          {form ? (
            <Stack>
              <Flex
                p={8}
                rounded="lg"
                bg="#FBFBFB"
                boxShadow="lg"
                direction="row"
                align="center"
                justifyContent="center"
              >
                <Stack
                  spacing={6}
                  w="full"
                  justifyContent="center"
                  align="center"
                >
                  <Text fontSize="3xl" fontWeight="semibold" color="#444A63">
                    {formData.title}
                  </Text>

                  <Text fontSize="md" fontWeight="regular" color="#444A63">
                    {formData.description}
                  </Text>

                  <Text fontSize={{ base: 'sm', md: 'sm' }} color="gray.500">
                    Última atualização em{' '}
                    {formatDate(
                      String(formData.last_update),
                      'DD/MM/YYYY [ás] HH:mm',
                    )}
                  </Text>

                  <FormSteps />
                </Stack>
              </Flex>
              <FormControl w="full">
                {renderFields(2)}
                <HStack my={4} justify="space-between">
                  <Flex display={activeStep < 2 ? 'none' : 'block'} />
                  <Button
                    display={activeStep < 2 ? 'block' : 'none'}
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => handleClearFields(activeStep)}
                  >
                    Limpar Formulário
                  </Button>
                  <HStack gap={2}>
                    {activeStep > 0 && (
                      <Button
                        onClick={() => setActiveStep(activeStep - 1)}
                        colorScheme="blue"
                        variant="ghost"
                        bg="#FBFBFB"
                      >
                        Voltar
                      </Button>
                    )}
                    <Tooltip
                      label="Preencha todos os campos obrigatórios!"
                      aria-label="Erro de preenchimento"
                      isDisabled={handleFilled[activeStep]}
                    >
                      <Button
                        onClick={() => setActiveStep(activeStep + 1)}
                        type="submit"
                        bg="#495796"
                        colorScheme="blue"
                        color="#FBFBFB"
                        variant="solid"
                        isDisabled={!handleFilled[activeStep]}
                      >
                        {activeStep === 0 ? 'Próximo' : ''}
                        {activeStep === 1 ? 'Próximo' : ''}
                        {activeStep === 2 ? 'Enviar' : ''}
                      </Button>
                    </Tooltip>
                  </HStack>
                </HStack>
              </FormControl>
            </Stack>
          ) : (
            <Box>Formulário não encontrado</Box>
          )}
        </Skeleton>
      </Stack>
    </Box>
  )
}

export default StudentForm
