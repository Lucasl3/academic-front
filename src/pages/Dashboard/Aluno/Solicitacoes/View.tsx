import React from 'react'
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
} from '@chakra-ui/react'

import StatusSolicitacao from '@/components/StatusSolicitacao'

const statusSolicitacoes = [
  {
    data: '30/01/2024 09:00',
    mensagem: 'Lorem Ipsum aprovou os dados do aluno',
  },
  {
    data: '28/01/2024 15:00',
    mensagem:
      'Lorem Ipsum reprovou os dados Lorem ipsum da Solicitação, com o comentário: “Lorem ipsum dolor sit amet. Qui vitae nulla a praesentium deleniti cum quasi incidunt est voluptas expedita id consequatur accusantium qui provident inventore! Aut ipsa ratione ut aliquam provident ex dicta internos eum minima consectetur et rerum...”',
  },
]

const steps = [
  { title: 'Criação', description: '20/01/2024   15:42' },
  { title: 'Recebimento', description: '22/01/2024   11:10' },
  {
    title: 'Verificação',
    description: <StatusSolicitacao statusSolicitacoes={statusSolicitacoes} />,
  },
  { title: 'Envio para PROGRAD', description: '' },
]

const AlunoSolicitacoes = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { activeStep } = useSteps({
    index: 3,
    count: steps.length,
  })
  const { id } = useParams()

  console.log(id)

  return (
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
          <BreadcrumbLink>Titulo da Solicitaçao</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        sx={{
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Text fontSize="2xl" color="#444A63">
          Título da solicitação
        </Text>
        <Text>
          Descrição da solicitação. Lorem ipsum dolor sit amet, consectetur
        </Text>
        <Stepper
          index={activeStep}
          orientation="vertical"
          minHeight="450px"
          marginY="16px"
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box>
                <StepTitle>{step.title}</StepTitle>
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
  )
}

export default AlunoSolicitacoes
