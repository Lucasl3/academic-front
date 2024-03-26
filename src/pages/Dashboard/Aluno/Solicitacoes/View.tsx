import React, { useEffect, useMemo } from 'react'
import { set } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

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
} from '@chakra-ui/react'

import { useQuerySolicitation } from '@/api/dashboard/solicitation/queries'
import StatusSolicitacao from '@/components/StatusSolicitacao'

function AlunoSolicitacao() {
  const toast = useToast()
  const navigate = useNavigate()
  // const { id } = useParams()
  const id = 1

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

  const [isMobile] = useMediaQuery('(max-width: 768px)')

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
                index={activeStep}
                orientation="vertical"
                minHeight="450px"
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
                      {step.description !== '' && (
                        <StepDescription>{step.description}</StepDescription>
                      )}
                    </Box>
                    <StepSeparator />
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
