import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
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
  useMediaQuery,
  useToast,
  Skeleton,
  Stack,
  Tag,
} from '@chakra-ui/react'

import { useQuerySolicitation } from '@/api/dashboard/solicitation/queries'
import StatusSolicitacao from '@/components/StatusSolicitacao'
import { formatDate } from '@/utils/date'

function AlunoSolicitacao() {
  const toast = useToast()
  const { id } = useParams()

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
      status: solicitacao?.status,
    }
  }, [solicitacao])

  const statusSolic = solicitacaoData?.status.map((status: any) => {
    let mensagem_status: {
      data?: string | ''
      mensagem?: string | ''
    }[] = []

    if (status.messages?.length > 0) {
      mensagem_status = status.messages?.map((message: any) => {
        return {
          data:
            formatDate(String(message?.dtUpdatedAt), 'DD/MM/YYYY [às] HH:mm') ||
            '30/01/2024 09:00',
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

  const statusIndex = statusSolic?.findIndex(
    (status: any) => status.done === false,
  )

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: statusSolic?.length,
  })

  useEffect(() => {
    setActiveStep(statusIndex)
  }, [statusIndex])

  return (
    <Stack gap={5}>
      <Skeleton isLoaded={!isSolicitacaoLoading}>
        {solicitacao ? (
          <Flex
            sx={{
              background: 'white',
              borderRadius: '4px',
              flexDirection: 'column',
              padding: '24px',
            }}
          >
            <Breadcrumb separator={'>'} fontSize={'14px'} marginBottom={5}>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/dashboard/aluno/solicitacoes">
                  Solicitações
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{solicitacaoData?.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Flex
              sx={{
                flexDirection: 'column',
                gap: '30px',
              }}
            >
              <Text fontSize="2xl" color="#444A63">
                {solicitacaoData?.title}
              </Text>
              <Text>{solicitacaoData?.description}</Text>
              <Stepper
                index={activeStep === 0 ? 1 : activeStep}
                orientation="vertical"
                minHeight={
                  statusSolic?.length === 1
                    ? 'auto'
                    : activeStep === statusSolic?.length
                      ? '400px'
                      : '500px'
                }
                marginY="16px"
              >
                {statusSolic?.map((step: any, index: number) => (
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
                      {step?.description && (
                        <StepDescription>{step?.description}</StepDescription>
                      )}
                      <StepSeparator />
                    </Box>
                  </Step>
                ))}
              </Stepper>
            </Flex>
          </Flex>
        ) : (
          <Box>Solicitação não encontrada</Box>
        )}
      </Skeleton>
    </Stack>
  )
}

export default AlunoSolicitacao
