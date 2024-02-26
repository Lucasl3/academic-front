import React from 'react'
import { set } from 'react-hook-form'

import { check } from 'prettier'
import { TestConfig } from 'yup'

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
} from '@chakra-ui/react'
import {
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
} from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'

import UploadFile, { UploadFileRef } from '@/components/UploadFile'

const fieldSets: {
  id: string
  name: string
  description?: string
  type: string
  step: number
  isRequired: boolean
  options?: string[]
  placeholder?: string
}[] = [
  {
    id: '1',
    name: 'Nome Completo',
    type: 'text',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu nome',
  },
  {
    id: '2',
    name: 'Matrícula',
    type: 'number',
    step: 0,
    isRequired: true,
    placeholder: 'Informe sua matrícula',
  },
  {
    id: '3',
    name: 'Curso',
    type: 'radio',
    step: 0,
    isRequired: true,
    options: ['Engenharia de Computação', 'Ciência da Computação'],
  },
  {
    id: '4',
    name: 'Email institucional',
    type: 'email',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu email institucional',
  },
  {
    id: '5',
    name: 'Ano de Ingresso',
    type: 'number',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu ano de ingresso',
  },
  {
    id: '6',
    name: 'Período Atual',
    type: 'number',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu período atual',
  },
  {
    id: '7',
    name: 'Endereço',
    type: 'text',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu endereço',
  },
  {
    id: '8',
    name: 'Celular',
    type: 'tel',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu número de celular',
  },
  {
    id: '9',
    name: 'Tipo de Trancamento',
    type: 'radio',
    step: 1,
    isRequired: true,
    options: ['Trancamento de Curso', 'Trancamento de Disciplina'],
  },
  {
    id: '10',
    name: 'Anexo de Documentos',
    type: 'file',
    step: 1,
    isRequired: true,
  },
  {
    id: '11',
    name: 'ACE(s) desejada(s)',
    type: 'checkbox',
    step: 1,
    isRequired: true,
    options: [
      'Asfvbjjfgnjfgnejwfnggerj',
      'Asfvbjjfgnjfgnejergergerwfnj',
      'Asfvbjjfgnjfgnejgerwfnj',
      'Asfvbjjfgnjfgnejwrgeryfnj',
      'Asfvbjjfgnjfgnejwfnjp',
    ],
  },
  {
    id: '12',
    name: 'Anexo de Documentos 2',
    type: 'file',
    step: 1,
    isRequired: true,
  },
]

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

function StudentForm() {
  const [formValues, setFormValues] = React.useState<{ [key: string]: string }>(
    {},
  )

  const [stepFieldsFilled, setStepFieldsFilled] = React.useState<boolean[]>([])

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  })

  interface TextAreaValue {
    [key: string]: { value: string; step: number } | undefined
  }

  const [textAreaValue, setTextAreaValue] = React.useState<TextAreaValue>(
    Object.fromEntries(
      fieldSets.map((field) => [field.id, { value: '', step: field.step }]),
    ),
  )

  const handleResetText = (stepToReset: number) => {
    setTextAreaValue((prevTextAreaValue) => {
      const updatedTextAreaValue: TextAreaValue = {}

      Object.keys(prevTextAreaValue).forEach((key) => {
        if (prevTextAreaValue[key]?.step === stepToReset) {
          updatedTextAreaValue[key] = { value: '', step: stepToReset }
        } else {
          updatedTextAreaValue[key] = prevTextAreaValue[key]
        }
      })
      return updatedTextAreaValue
    })
  }

  interface CheckboxValues {
    [key: string]: {
      [key: number]: boolean
      step: number
    }
  }

  const [checkboxValues, setCheckboxValues] = React.useState<CheckboxValues>(
    Object.fromEntries(
      fieldSets.map((field) => [field.id, { step: field.step }]),
    ),
  )

  const handleResetCheckbox = (stepToReset: number) => {
    setCheckboxValues((prevValues) => {
      const updatedValues = { ...prevValues }
      Object.keys(updatedValues).forEach((key) => {
        if (updatedValues[key].step === stepToReset) {
          delete updatedValues[key]
        }
      })
      return updatedValues
    })
  }

  type TouchedFields = {
    [key: string]: boolean
  }

  const [touchedFields, setTouchedFields] = React.useState<TouchedFields>({})
  const [clickedFields, setClickedFields] = React.useState<TouchedFields>({})

  const [radioNumbers, setRadioNumbers] = React.useState<{
    [key: string]: { value: string; step: number }
  }>({})

  const handleResetRadio = (stepToReset: number) => {
    setRadioNumbers((prevNumbers) => {
      const updatedNumbers = { ...prevNumbers }
      Object.keys(updatedNumbers).forEach((key) => {
        if (updatedNumbers[key].step === stepToReset) {
          delete updatedNumbers[key]
        }
      })
      return updatedNumbers
    })
  }

  const uploadFileRefs = React.useRef<{
    [key: string]: { ref: React.RefObject<UploadFileRef>; step: number }
  }>({})

  const handleClearFiles = (stepToClear: number) => {
    Object.keys(uploadFileRefs.current).forEach((id) => {
      const { ref, step } = uploadFileRefs.current[id]
      if (step === stepToClear && ref.current) {
        ref.current.clearFiles(stepToClear)
      }
    })
  }

  const handleClearFields = (step: number) => {
    setTouchedFields({})
    setClickedFields({})
    handleResetText(step)
    handleResetCheckbox(step)
    handleResetRadio(step)
    handleClearFiles(step)
  }

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

    const currentFields = fieldSets

    const rows = Math.ceil(currentFields.length / columns)
    const fields = [...currentFields, ...Array(rows * columns).fill(null)]

    const columnSize = Math.floor(100 / columns)

    return Array.from({ length: rows }, (_, rowIndex) => (
      <Stack key={rowIndex} spacing={6} direction="row">
        {fields
          .slice(rowIndex * columns, (rowIndex + 1) * columns)
          .map((field, index) => {
            if (!field) return null

            const isStep2 = activeStep === 2
            const isDisabled = isStep2 ? true : false
            const isError =
              touchedFields[field.id] &&
              field.isRequired &&
              (textAreaValue[field.id]?.value === '' ||
                textAreaValue[field.id] === undefined) &&
              radioNumbers[field.id] === undefined &&
              Object.keys(checkboxValues[field.id]).length === 0

            return (
              <Box
                key={field.id}
                id={field.id}
                width={`calc(${columnSize} * 1vw)`}
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
                      p={6}
                      paddingInline={10}
                      w="100%"
                      border="1px solid #E1E1E3"
                      rounded="lg"
                      boxShadow="md"
                      bg="#FBFBFB"
                      isDisabled={isDisabled}
                    >
                      <FormLabel paddingBottom={4}>{field.name}</FormLabel>
                      <Stack spacing={4} direction={['column']}>
                        {field.options?.map(
                          (option: string, optionIndex: number) => (
                            <Checkbox
                              onFocus={() => handleFieldClick(field.id)}
                              onBlur={() => handleFieldTouch(field.id)}
                              key={optionIndex}
                              isChecked={
                                checkboxValues[field.id]?.[optionIndex] || false
                              }
                              onChange={(e) => {
                                setCheckboxValues((prev) => ({
                                  ...prev,
                                  [field.id]: {
                                    ...prev[field.id],
                                    [optionIndex]: e.target.checked,
                                    step: field.step,
                                  },
                                }))
                              }}
                              value={option}
                              sx={smoothClasses}
                              size="md"
                              isDisabled={isDisabled}
                            >
                              {option}
                            </Checkbox>
                          ),
                        )}
                      </Stack>
                      {!isError && (
                        <FormHelperText>
                          Enter the email youd like to receive the newsletter
                          on.
                        </FormHelperText>
                      )}
                      {isError && (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
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
                      isDisabled={isDisabled}
                    >
                      <FormLabel paddingBottom={2}>{field.name}</FormLabel>
                      <RadioGroup
                        onFocus={() => handleFieldClick(field.id)}
                        onBlur={() => handleFieldTouch(field.id)}
                        onChange={(value) => {
                          setRadioNumbers((prev) => ({
                            ...prev,
                            [field.id]: { value: value, step: field.step },
                          }))
                        }}
                        value={
                          radioNumbers[field.id]
                            ? radioNumbers[field.id].value
                            : ''
                        }
                      >
                        <Stack spacing={4} direction={['column']}>
                          {field.options?.map(
                            (option: string, optionIndex: number) => (
                              <Radio
                                key={optionIndex}
                                value={option}
                                size="md"
                                isDisabled={isDisabled}
                              >
                                {option}
                              </Radio>
                            ),
                          )}
                        </Stack>
                      </RadioGroup>
                      {!isError && (
                        <FormHelperText>
                          Enter the email youd like to receive the newsletter
                          on.
                        </FormHelperText>
                      )}
                      {isError && (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                      )}
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
                      isDisabled={isDisabled}
                    >
                      <FormLabel paddingBottom={4}>{field.name}</FormLabel>
                      <Input
                        variant="flushed"
                        onFocus={() => handleFieldClick(field.id)}
                        onBlur={() => handleFieldTouch(field.id)}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={(e) =>
                          setTextAreaValue((prev) => ({
                            ...prev,
                            [field.id]: {
                              value: e.target.value,
                              step: field.step,
                            },
                          }))
                        }
                        value={
                          textAreaValue[field.id]?.value !== undefined
                            ? textAreaValue[field.id]?.value
                            : ''
                        }
                        borderColor="gray.400"
                        isDisabled={isDisabled}
                      />
                      {!isError && (
                        <FormHelperText>
                          Enter the email youd like to receive the newsletter
                          on.
                        </FormHelperText>
                      )}
                      {isError && (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
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
                      isDisabled={isDisabled}
                    >
                      <FormLabel paddingBottom={4}>{field.name}</FormLabel>
                      <UploadFile
                        ref={(ref) =>
                          (uploadFileRefs.current[field.id] = {
                            ref: ref || React.createRef(),
                            step: field.step,
                          })
                        }
                        id={field.id}
                        step={field.step}
                      />

                      <FormErrorMessage>{`${field.name} é necessário`}</FormErrorMessage>
                    </FormControl>
                  )}
              </Box>
            )
          })}
      </Stack>
    ))
  }

  React.useEffect(() => {
    const currentStepFields = fieldSets.filter(
      (field) => field.step === activeStep,
    )
    const filled = currentStepFields.every((field) => {
      if (field.type === 'checkbox') {
        console.log(checkboxValues[field.id])
        return Object.keys(checkboxValues[field.id]).length > 0
      } else if (field.type === 'radio') {
        console.log(radioNumbers[field.id])
        return !!radioNumbers[field.id]
      } else if (field.type === 'file') {
        console.log(
          uploadFileRefs.current[field.id].ref.current?.getFileCount(),
        )
        return !!uploadFileRefs.current[field.id].ref.current?.getFileCount()
      } else {
        console.log(textAreaValue[field.id])
        return !!textAreaValue[field.id]?.value
      }
    })

    setStepFieldsFilled((prev) => {
      const newFilled = [...prev]
      newFilled[activeStep] = filled
      return newFilled
    })
  }, [activeStep, textAreaValue, checkboxValues, radioNumbers])

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
      <Flex
        p={8}
        rounded="lg"
        bg="#FBFBFB"
        boxShadow="lg"
        direction="row"
        align="center"
        justifyContent="center"
      >
        <Stack spacing={6} w="full" justifyContent="center" align="center">
          <Text fontSize="3xl" fontWeight="semibold" color="#444A63">
            Formulário
          </Text>

          <Text fontSize="sm" fontWeight="regular" color="#444A63">
            {
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }
          </Text>

          <FormSteps />
        </Stack>
      </Flex>
      <FormControl>
        {renderFields(2)}
        <Flex
          direction="row"
          justify="space-between"
          paddingInline={20}
          p={8}
          w="100%"
        >
          {activeStep < 2 && (
            <Button
              colorScheme="blue"
              variant="ghost"
              onClick={() => handleClearFields(activeStep)}
            >
              Limpar Formulário
            </Button>
          )}
          <Flex direction="row" justify="right" w="75%">
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
          </Flex>
          <Tooltip
            label="Por favor, preencha todos os campos obrigatórios!"
            aria-label="Erro de preenchimento"
            isDisabled={stepFieldsFilled[activeStep]}
          >
            <span>
              <Button
                onClick={() => setActiveStep(activeStep + 1)}
                type="submit"
                bg="#495796"
                colorScheme="blue"
                color="#FBFBFB"
                variant="solid"
                isDisabled={!stepFieldsFilled[activeStep]}
              >
                {activeStep === 0 ? 'Próximo' : ''}
                {activeStep === 1 ? 'Próximo' : ''}
                {activeStep === 2 ? 'Enviar' : ''}
              </Button>
            </span>
          </Tooltip>
        </Flex>
      </FormControl>
    </Box>
  )
}

export default StudentForm
