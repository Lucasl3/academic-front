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

function FormSteps() {
  const steps = [
    { title: 'Aluno', description: 'Dados Iniciais' },
    { title: 'Documentos', description: 'Dados do Formulário' },
    { title: 'Enviar', description: 'Revisão dos Dados' },
  ]
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <Stepper
      size="lg"
      w="80%"
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

const fieldNames: string[] = [
  'Nome',
  'Matrícula',
  'Curso',
  'Email institucional',
  'Ano de Ingresso',
  'Período Atual',
  'Enderço',
  'Celular',
]

const StudentForm = () => {
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

          <Text
            fontSize="sm"
            fontWeight="regular"
            color="#444A63"
            paddingInline={20}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>

          <FormSteps />
          <FormControl>
            {fieldNames
              .reduce((rows: string[][], fieldName, index) => {
                const rowIndex = Math.floor(index / 2)
                if (!rows[rowIndex]) rows[rowIndex] = []
                rows[rowIndex].push(fieldName)
                return rows
              }, [])
              .map((rowFields, rowIndex) => (
                <Flex key={rowIndex} direction={{ base: 'column', md: 'row' }}>
                  {rowFields.map((fieldName, index) => (
                    <FormControl
                      key={index}
                      isRequired
                      p={4}
                      paddingInline={20}
                      w="80%"
                    >
                      <FormLabel>{fieldName}</FormLabel>
                      <Input
                        type="text"
                        placeholder={`Insira aqui o valor de ${fieldName}`}
                        borderColor="gray.400"
                      />
                      <FormErrorMessage>{`${fieldName} é necessário`}</FormErrorMessage>
                    </FormControl>
                  ))}
                </Flex>
              ))}
            <Flex direction="row" justify="space-between" paddingInline={20}>
              <Button colorScheme="blue" variant="ghost">
                Limpar Formulário
              </Button>
              <Button
                type="submit"
                bg="#495796"
                colorScheme="blue"
                color="#FBFBFB"
                variant="solid"
              >
                Próxima
              </Button>
            </Flex>
          </FormControl>
        </Stack>
      </Flex>
    </Box>
  )
}

export default StudentForm
