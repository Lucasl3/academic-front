import React, { useMemo, useEffect, RefObject } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogHeader,
  Textarea,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'

import {
  useMutationDeleteSolicitation,
  useMutationPostFormMessage,
  useMutationUpdateStatusSolicitation,
} from '@/api/dashboard/solicitation/mutations'
import { useQuerySolicitation } from '@/api/dashboard/solicitation/queries'
import StatusSolicitacao from '@/components/StatusSolicitacao'
import { formatDate } from '@/utils/date'

const View = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    data: solicitacao,
    isFetching: isSolicitacaoLoading,
    refetch: refetchSolicitation,
  } = useQuerySolicitation(
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

  const { mutate: postFormMessage, isLoading: isFormMessageLoading } =
    useMutationPostFormMessage({
      onSuccess: () => {
        toast({
          title: 'Mensagem enviada com sucesso!',
          status: 'success',
          duration: 5000,
        })
        refetchSolicitation()
      },
      onError: () => {
        toast({
          title: 'Houve um erro ao enviar a mensagem.',
          status: 'error',
          duration: 3000,
        })
      },
    })

  const [messageText, setMessageText] = React.useState('' as string)

  const onSubmit = () => {
    const data = {
      coSolicitation: solicitacaoData?.id,
      dsMessage: messageText,
      coStatus: activeStep,
    }

    postFormMessage(data)
  }

  const { mutate: deleteSolicitation, isLoading: isDeleteSolicitationLoading } =
    useMutationDeleteSolicitation({
      onSuccess: () => {
        toast({
          title: 'Solicitação encerrada com sucesso!',
          status: 'success',
          duration: 5000,
        }),
          navigate('/dashboard/secretaria/demandas')
      },
      onError: () => {
        toast({
          title: 'Houve um erro ao encerrar a solicitação.',
          status: 'error',
          duration: 3000,
        })
      },
    })

  const onEncerrar = () => {
    deleteSolicitation({ id: solicitacaoData?.id })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<FocusableElement | null>(null)

  const ApagarSolicitacaoButton = () => {
    return (
      <>
        <HStack justify="right" p={4}>
          <Button onClick={onOpen} bg="#822727" colorScheme="red">
            Apagar Solicitação
          </Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>
                Tem certeza que deseja apagar a Solicitação?
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Esta ação é irreversível. Só a apague se ela estiver incorreta
                ou não for mais necessária.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  ref={cancelRef as RefObject<HTMLButtonElement>}
                  onClick={onClose}
                >
                  Não
                </Button>
                <Button
                  colorScheme="red"
                  bg="#822727"
                  ml={3}
                  isLoading={isDeleteSolicitationLoading}
                  onClick={onEncerrar}
                >
                  Sim
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </HStack>
      </>
    )
  }

  const {
    mutate: updateStatusSolicitation,
    isLoading: isUpdateStatusSolicitationLoading,
  } = useMutationUpdateStatusSolicitation({
    onSuccess: () => {
      toast({
        title: 'Status atualizado com sucesso!',
        status: 'success',
        duration: 5000,
      }),
        refetchSolicitation()
      setActiveStep(activeStep + 1)
    },
    onError: () => {
      toast({
        title: 'Houve um erro ao atualizar o status.',
        status: 'error',
        duration: 3000,
      })
    },
  })

  const onAprovar = () => {
    if (activeStep + 1 <= messages?.length) {
      const data = {
        coSolicitation: solicitacaoData?.id,
        coStatus: activeStep,
      }
      updateStatusSolicitation(data)
    }
  }

  const questions = solicitacaoData?.questions?.map((question: any) => {
    if (!question) return null
    return {
      name: question.noQuestion,
      description: question.dsQuestion,
      type: question.coTypeQuestion,
      answer: question.answer,
    }
  })

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
      mensagem_status = status?.messages?.map((message: any) => {
        const data_str =
          message?.dtUpdatedAt !== null
            ? formatDate(String(message?.dtUpdatedAt), 'DD/MM/YYYY [às] HH:mm')
            : '30/01/2024 às 09:00'
        return {
          data: data_str,
          mensagem: message?.dsMessageForm,
        }
      })
    }

    const Description = () => {
      if (mensagem_status.length === 0) return null
      return <StatusSolicitacao statusSolicitacoes={mensagem_status} />
    }

    return {
      description: <Description />,
      title: status?.dsStatus,
      done: status.done,
    }
  })

  const statusIndex = messages?.findIndex(
    (status: any) => status.done === false,
  )

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: messages?.length,
  })

  useEffect(() => {
    setActiveStep(statusIndex + 1)
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
                <Box key={index} w="full">
                  <Step>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    <Box w="full">
                      <StepTitle as={Box} mb={4}>
                        {step?.title}
                      </StepTitle>
                      {step?.description && (
                        <StepDescription>{step.description}</StepDescription>
                      )}
                      {index === activeStep && (
                        <Stack>
                          <Box
                            key={index}
                            id={'id' + index}
                            border="1px solid #E1E1E3"
                            rounded="lg"
                            boxShadow="md"
                            bg="#E1E6FC"
                            p={4}
                            marginTop={4}
                            marginBottom={4}
                          >
                            <Stack w="full">
                              <FormControl key={index} id={'id' + index}>
                                <FormLabel color="#444A63" paddingBottom={1}>
                                  Escreva aqui seu comentário para o aluno caso
                                  haja alguma dúvida ou erro
                                </FormLabel>
                                <Textarea
                                  variant="outline"
                                  bgColor={'#FBFBFB'}
                                  placeholder="Informe o comentário"
                                  onChange={(e) => {
                                    setMessageText(e.target.value)
                                  }}
                                />
                              </FormControl>
                              <HStack justify="right" paddingTop={1}>
                                <Button
                                  colorScheme="purple"
                                  variant="ghost"
                                  onClick={onSubmit}
                                  isDisabled={messageText === ''}
                                  isLoading={isFormMessageLoading}
                                >
                                  Enviar resposta
                                </Button>
                              </HStack>
                            </Stack>
                          </Box>
                          <HStack justify="right">
                            <Button
                              onClick={onAprovar}
                              bg="#3182ce"
                              colorScheme="blue"
                              isLoading={isUpdateStatusSolicitationLoading}
                            >
                              Aprovar Status
                            </Button>
                          </HStack>
                        </Stack>
                      )}
                    </Box>
                    <StepSeparator />
                  </Step>
                </Box>
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
            <Accordion defaultIndex={[0, 1]} allowMultiple>
              <Stack gap={5}>
                <AccordionItem bg={'#E2E8F0'} boxShadow="md">
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
                  <AccordionPanel pb={4}>{renderQuestions()}</AccordionPanel>
                </AccordionItem>
                <AccordionItem bg={'#E2E8F0'} boxShadow="md">
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
                  <AccordionPanel pb={4}>{renderMessages()}</AccordionPanel>
                </AccordionItem>
              </Stack>
            </Accordion>
          </Stack>
        ) : (
          <Text>Solicitação não encontrada</Text>
        )}
      </Skeleton>
      <HStack justify="space-between">
        <Button
          variant="ghost"
          colorScheme="red"
          color="#822727"
          onClick={() => navigate('/dashboard/secretaria/demandas')}
        >
          Voltar
        </Button>
        <ApagarSolicitacaoButton />
      </HStack>
    </Stack>
  )
}

export default View
