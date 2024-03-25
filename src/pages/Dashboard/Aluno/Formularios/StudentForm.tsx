import React, { useEffect, useMemo, useContext } from 'react'
import { act } from 'react-dom/test-utils'
import { set } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { send } from 'process'

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
import { useMutationPostSolicitation } from '@/api/dashboard/solicitation/mutations'
import UploadFile from '@/components/UploadFile'
import { AppContext } from '@/contexts/AppContext'
import { formatDate } from '@/utils/date'

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
  const { user } = useContext(AppContext)

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
  // console.log('form', form)

  const formData = useMemo(() => {
    return {
      id: form?.coForm,
      title: form?.noForm,
      description: form?.dsForm,
      last_update: form?.dtUpdatedAt,
      steps: form?.ncoStep,
    }
  }, [form])

  const { mutate: postSolicitation, isLoading: isSolicitationLoading } =
    useMutationPostSolicitation({
      onSuccess: () => {
        toast({
          title: 'Solicitação criada com sucesso!',
          status: 'success',
          duration: 5000,
        })
        navigate('/dashboard/aluno/solicitacoes')
      },
      onError: () => {
        toast({
          title: 'Houve um erro ao criar a Solicitação.',
          status: 'error',
          duration: 3000,
        })
      },
    })

  const onSubmit = () => {
    const data: any = []
    fieldSets?.forEach((field: any) => {
      const questionValue = handleAnswerQuestion(field)
      const question = {
        coFormQuestion: field.id,
        ...questionValue,
      }
      // console.log('question', question)
      data.push(question)
    })
    const solicitation = {
      coForm: formData.id,
      coUser: user.co_user,
      ncoAnswerFormQuestion: data,
    }

    console.log('solicitation', solicitation)

    postSolicitation(solicitation)
  }

  const handleAnswerQuestion = (question: any) => {
    if (question.type === 'radio') {
      return {
        ndsAnswerQuestionItem: [Number(question.value)],
        ndsAnswerQuestionStr: [],
      }
      // } else if (question.type === 'checkbox') {
      //   return  ndsAnswerQuestionItem: question.value.map((item: any) => Number(item))
    } else {
      return {
        ndsAnswerQuestionStr: [question.value],
        ndsAnswerQuestionItem: [],
      }
    }
  }

  const lenSteps = formData.steps?.length + 1
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: lenSteps || 0,
  })

  console.log('activeStep', activeStep)
  console.log('steps', formData.steps?.length + 1)

  const [fieldSets, setFieldSets] = React.useState<any>(null)

  const [handleFilled, setHandleFilled] = React.useState<Array<boolean>>([])

  const handleFilledFields = (step: number) => {
    if (step === lenSteps - 1) {
      console.log('final step', step)
      currentFields?.forEach((field: any) => {
        setHandleFilled((prev) => {
          prev[step] = true
          return prev
        })
      })
    }
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
    const questions: any = []
    formData.steps?.map((step: any, index: number) => {
      step.ncoFormQuestion?.map((question: any, index: number) => {
        questions.push({
          id: question.coFormQuestion,
          name: question.noQuestion,
          description: question.dsQuestion,
          type: question.coTypeQuestion,
          step: step.coFormStep - 1,
          isRequired: true,
          options: question.ncoFormItem,
          placeholder: 'Informe o valor',
          value: null,
        })
      })
    })

    // console.log('questions', questions)

    setFieldSets(questions)
  }, [formData])

  const handleValueChange = (fieldId: string, value: any) => {
    const aux = fieldSets?.map((field: any) => {
      if (field.id === fieldId) {
        if (value !== null && value !== undefined) {
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
    (field: any) => field.step === activeStep || activeStep === lenSteps - 1,
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

          const isFinalStep = activeStep === lenSteps - 1
          // console.log('isFinalStep', isFinalStep)
          const isDisabled = isFinalStep ? true : false
          const isError =
            touchedFields[field.id] && field.isRequired && field.value === null

          // console.log(
          //   'len',
          //   lenSteps,
          //   'active',
          //   activeStep,
          //   'final',
          //   isFinalStep,
          //   'finalfields',
          //   activeStep === lenSteps - 1,
          // )

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
                (field.step === activeStep || activeStep === lenSteps - 1) && (
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
                (field.step === activeStep || activeStep === lenSteps - 1) && (
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
                (field.step === activeStep || activeStep === lenSteps - 1) && (
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
                  >
                    <FormLabel paddingBottom={4}>{field.name}</FormLabel>
                    <UploadFile
                      id={'file' + field.id}
                      file={field.value}
                      onFileChange={(file) => {
                        field.value = file
                        handleValueChange(field.id, file)
                      }}
                      isDisabled={isDisabled}
                    />

                    <FormErrorMessage>{`${field.name} é necessário`}</FormErrorMessage>
                    <FormHelperText>{field.description}</FormHelperText>
                  </FormControl>
                )}
              {field.type !== 'checkbox' &&
                field.type !== 'radio' &&
                field.type !== 'file' &&
                (field.step === activeStep || activeStep === lenSteps - 1) && (
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
    const steps = formData.steps?.map((step: any) => {
      return {
        title: step.noFormStep,
        description: step.dsFormStep,
      }
    })
    steps?.push({ title: 'Enviar', description: 'Revisão dos Dados' })

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
        {steps.map((step: any, index: number) => (
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
                  <Flex
                    display={activeStep < lenSteps - 1 ? 'none' : 'block'}
                  />
                  <Button
                    display={activeStep < lenSteps - 1 ? 'block' : 'none'}
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
                        isDisabled={isSolicitationLoading}
                      >
                        Voltar
                      </Button>
                    )}
                    {activeStep < lenSteps - 1 ? (
                      <Tooltip
                        label="Preencha todos os campos obrigatórios!"
                        aria-label="Erro de preenchimento"
                        isDisabled={handleFilled[activeStep]}
                      >
                        <Button
                          onClick={() => {
                            if (activeStep < lenSteps) {
                              setActiveStep(activeStep + 1)
                            }
                          }}
                          bg="#495796"
                          colorScheme="blue"
                          color="#FBFBFB"
                          variant="solid"
                          isDisabled={!handleFilled[activeStep]}
                        >
                          Próximo
                        </Button>
                      </Tooltip>
                    ) : (
                      <Button
                        bg="#495796"
                        colorScheme="blue"
                        color="#FBFBFB"
                        variant="solid"
                        onClick={onSubmit}
                        isLoading={isSolicitationLoading}
                      >
                        Enviar
                      </Button>
                    )}
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
