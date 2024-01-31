import React from 'react'

import {
  Stack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
} from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'

const fieldSets: {
  name: string
  description?: string
  type: string
  step: number
  isRequired: boolean
  options?: string[]
  placeholder?: string
}[] = [
  {
    name: 'Nome Completo',
    type: 'text',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu nome',
  },
  {
    name: 'Matrícula',
    type: 'number',
    step: 0,
    isRequired: true,
    placeholder: 'Informe sua matrícula',
  },
  {
    name: 'Curso',
    type: 'radio',
    step: 0,
    isRequired: true,
    options: ['Engenharia de Computação', 'Ciência da Computação'],
  },
  {
    name: 'Email institucional',
    type: 'email',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu email institucional',
  },
  {
    name: 'Ano de Ingresso',
    type: 'number',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu ano de ingresso',
  },
  {
    name: 'Período Atual',
    type: 'number',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu período atual',
  },
  {
    name: 'Endereço',
    type: 'text',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu endereço',
  },
  {
    name: 'Celular',
    type: 'tel',
    step: 0,
    isRequired: true,
    placeholder: 'Informe seu número de celular',
  },
  {
    name: 'Tipo de Trancamento',
    type: 'radio',
    step: 1,
    isRequired: true,
    options: ['Trancamento de Curso', 'Trancamento de Disciplina'],
  },
  {
    name: 'Anexo de Documentos',
    type: 'file',
    step: 1,
    isRequired: true,
  },
  {
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
    name: 'Anexo de Documentos 2',
    type: 'file',
    step: 1,
    isRequired: true,
  },
]

function StudentForm() {
  const [radioNumber, setRadioNumber] = React.useState('1')
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  })

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

  const renderFields = (columns: number) => {
    const currentFields = fieldSets.filter((field) => field.step === activeStep)
    const rows = Math.ceil(currentFields.length / columns)
    const fields = [...currentFields, ...Array(rows * columns).fill(null)]

    const columnSize = Math.floor(100 / columns)

    return Array.from({ length: rows }, (_, rowIndex) => (
      <Stack key={rowIndex} spacing={6} direction="row">
        {fields
          .slice(rowIndex * columns, (rowIndex + 1) * columns)
          .map((field, index) => {
            if (!field) return null

            return (
              <Box
                key={index}
                width={`calc(${columnSize} * 1vw)`}
                color="#19191D"
                alignItems="center"
                justifyContent="center"
                paddingTop={4}
              >
                {field.type === 'checkbox' && (
                  <FormControl
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
                    <CheckboxGroup colorScheme="blue">
                      <Stack spacing={4} direction={['column']}>
                        {field.options?.map(
                          (option: string, optionIndex: number) => (
                            <Checkbox
                              key={optionIndex}
                              value={option}
                              sx={smoothClasses}
                              size="md"
                            >
                              {option}
                            </Checkbox>
                          ),
                        )}
                      </Stack>
                    </CheckboxGroup>
                  </FormControl>
                )}

                {field.type === 'radio' && (
                  <FormControl
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
                      key={index}
                      onChange={setRadioNumber}
                      value={radioNumber}
                    >
                      <Stack spacing={4} direction={['column']}>
                        {field.options?.map(
                          (option: string, optionIndex: number) => (
                            <Radio key={optionIndex} value={option} size="md">
                              {option}
                            </Radio>
                          ),
                        )}
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                )}

                {field.type !== 'checkbox' && field.type !== 'radio' && (
                  <FormControl
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
                    <Input
                      variant="flushed"
                      type={field.type}
                      placeholder={field.placeholder}
                      borderColor="gray.400"
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
          <Button colorScheme="blue" variant="ghost">
            Limpar Formulário
          </Button>
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
          <Button
            onClick={() => setActiveStep(activeStep + 1)}
            type="submit"
            bg="#495796"
            colorScheme="blue"
            color="#FBFBFB"
            variant="solid"
          >
            {activeStep === 2 ? 'Enviar' : 'Próximo'}
          </Button>
        </Flex>
      </FormControl>
    </Box>
  )
}

export default StudentForm
