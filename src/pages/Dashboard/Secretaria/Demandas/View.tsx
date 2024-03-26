import React, { useMemo, useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import {
  Stack,
  Text,
  HStack,
  Avatar,
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Button,
  Tag,
  Flex,
  useToast,
  Skeleton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
} from '@chakra-ui/react'

import { useQuerySolicitation } from '@/api/dashboard/solicitation/queries'
import StatusSolicitacao from '@/components/StatusSolicitacao'
import { formatDate } from '@/utils/date'

const View = () => {
  const toast = useToast()
  const navigate = useNavigate()
  // const { id } = useParams()
  const id = 2

  const { data: solicitacao, isFetching: isSolicitacaoLoading } =
    useQuerySolicitation(
      {
        id: Number(id),
      },
      {
        enabled: !!id,
        onError: () => {
          toast({
            title: 'Houve um erro ao buscar a Solicitação.',
            status: 'error',
            duration: 5000,
          })
        },
      },
    )

  const solicitacaoData = useMemo(() => {
    if (!solicitacao) return null

    return {
      id: solicitacao?.coSolicitation,
      title: solicitacao?.title,
      description: solicitacao?.description,
      data: formatDate(
        String(solicitacao?.dtCreatedAt),
        'DD/MM/YYYY [às] HH:mm',
      ),
      questions: solicitacao?.questions,
      status: solicitacao?.status,
      username: solicitacao?.userName,
    }
  }, [solicitacao])

  const questions = solicitacaoData?.questions?.map((question: any) => {
    if (!question) return null
    return {
      name: question.noQuestion,
      description: question.dsQuestion,
      type: question.coTypeQuestion,
      answer: question.answer,
    }
  })

  // console.log(questions)

  const renderQuestions = () => {
    return (
      <Stack>
        <SimpleGrid
          columns={2}
          spacing={6}
          w="100%"
          border="1px solid #E1E1E3"
          rounded="lg"
          boxShadow="md"
          bg="#FBFBFB"
          p={6}
        >
          {questions?.map((question: any, index: number) => {
            if (!question) return null
            return (
              <Box key={index} id={'id' + index}>
                <FormControl key={index} id={'id' + index}>
                  <FormLabel color="#444A63">{question.description}</FormLabel>
                  <Input
                    value={question.answer}
                    variant="filled"
                    textColor={'#444A63'}
                    readOnly={true}
                  />
                </FormControl>
              </Box>
            )
          })}
        </SimpleGrid>
      </Stack>
    )
  }

  const messages = solicitacaoData?.status?.map((status: any) => {
    let mensagem_status: {
      data?: string | undefined
      mensagem?: string | undefined
    }[] = []

    if (status.messages?.length > 0) {
      mensagem_status = status.messages?.map((message: any) => {
        return {
          data: message?.dsUpdatedAt || '30/01/2024 09:00',
          mensagem: message?.dsMessageForm,
        }
      })
    }

    const description = (
      <StatusSolicitacao statusSolicitacoes={mensagem_status} />
    )

    return {
      description: description,
      title: status?.dsStatus,
      done: status.done,
    }
  })

  console.log(messages)

  const statusIndex = messages?.findIndex(
    (status: any) => status.done === false,
  )

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: messages?.length,
  })

  useEffect(() => {
    setActiveStep(statusIndex)
  }, [statusIndex])

  const renderMessages = () => {
    if (!messages) return null
    return (
      <Stack>
        <SimpleGrid
          w="100%"
          border="1px solid #E1E1E3"
          rounded="lg"
          boxShadow="md"
          bg="#FBFBFB"
          p={6}
        >
          <Stepper index={activeStep} orientation="vertical" size="lg">
            {messages?.map((step: any, index: number) => {
              return (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box>
                    <StepTitle>{step?.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>

                    {index === activeStep && (
                      <Stack>
                        <Box
                          key={index}
                          id={'id' + index}
                          border="1px solid #E1E1E3"
                          rounded="lg"
                          boxShadow="md"
                          bg="#E1E6FC"
                          p={6}
                          marginTop={4}
                          marginBottom={4}
                        >
                          <Stack w="full">
                            <FormControl key={index} id={'id' + index}>
                              <FormLabel color="#444A63" paddingBottom={1}>
                                Escreva aqui seu comentário para o aluno caso
                                haja alguma dúvida ou erro
                              </FormLabel>
                              <Input
                                variant="outline"
                                bgColor={'#FBFBFB'}
                                placeholder="Informe o comentário"
                              />
                            </FormControl>
                            <HStack justify="right" paddingTop={1}>
                              <Button colorScheme="purple" variant="ghost">
                                Enviar resposta
                              </Button>
                            </HStack>
                          </Stack>
                        </Box>
                        <HStack justify="right">
                          <Button
                            onClick={() => {
                              if (activeStep < messages?.length) {
                                setActiveStep(activeStep + 1)
                              }
                            }}
                            bg="#3182ce"
                            colorScheme="blue"
                          >
                            Aprovar Status
                          </Button>
                        </HStack>
                      </Stack>
                    )}
                  </Box>

                  <StepSeparator />
                </Step>
              )
            })}
          </Stepper>
        </SimpleGrid>
      </Stack>
    )
  }

  return (
    <Stack gap={5}>
      <Skeleton isLoaded={!isSolicitacaoLoading}>
        {solicitacao ? (
          <Stack>
            <HStack
              justify="space-between"
              p={8}
              rounded="lg"
              bg="#FBFBFB"
              boxShadow="lg"
              direction="row"
            >
              <Stack>
                <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
                  {solicitacaoData?.title}
                </Text>
                <Text fontSize="sm" color="#444A63">
                  {solicitacaoData?.description}
                </Text>
                <Text fontSize="sm" color="#718096">
                  Criado em {solicitacaoData?.data}
                </Text>
              </Stack>
              <Stack>
                <HStack>
                  <Avatar size="sm" name={solicitacaoData?.username} />
                  <Text fontSize="lg" fontWeight="medium">
                    {solicitacaoData?.username}
                  </Text>
                </HStack>
                <Flex justify="right">
                  <Tag
                    colorScheme={
                      messages?.[activeStep]?.title ? 'yellow' : 'blue'
                    }
                    textAlign="center"
                  >
                    {messages?.[activeStep]?.title || 'Concluído'}
                  </Tag>
                </Flex>
              </Stack>
            </HStack>
            <Divider
              borderColor="gray.400"
              borderBottomWidth="2px"
              margin={2}
            />
            <Accordion defaultIndex={[1]} allowMultiple boxShadow="md">
              <Box>
                <AccordionItem bg={'#E2E8F0'}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: '#E2E8F0', color: '#444A63' }}
                      bg="white"
                      rounded={8}
                    >
                      <Box
                        as="span"
                        fontWeight="medium"
                        fontSize="xl"
                        flex="1"
                        textAlign="left"
                        marginInline={2}
                        margin={2}
                        color="#444A63"
                      >
                        Resposta do Formulário
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{renderQuestions()}</AccordionPanel>
                </AccordionItem>
              </Box>
              <Box marginTop={5}>
                <AccordionItem bg={'#E2E8F0'}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: '#E2E8F0', color: '#444A63' }}
                      bg="white"
                      rounded={8}
                    >
                      <Box
                        as="span"
                        fontWeight="medium"
                        fontSize="xl"
                        flex="1"
                        textAlign="left"
                        marginInline={2}
                        margin={2}
                        color="#444A63"
                      >
                        Status da Solicitação
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{renderMessages()}</AccordionPanel>
                </AccordionItem>
              </Box>
            </Accordion>
            {activeStep === messages?.length && (
              <HStack justify="right" p={4}>
                <Button
                  onClick={() => {
                    if (activeStep < messages?.length) {
                      setActiveStep(activeStep + 1)
                    }
                  }}
                  bg="#822727"
                  colorScheme="red"
                >
                  Encerrar Solicitação
                </Button>
              </HStack>
            )}
          </Stack>
        ) : (
          <Text>Solicitação não encontrada</Text>
        )}
      </Skeleton>
    </Stack>
  )
}

export default View
