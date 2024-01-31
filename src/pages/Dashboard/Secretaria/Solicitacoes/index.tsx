import React from 'react'
import { IoMdSearch } from 'react-icons/io'

import {
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Switch,
  HStack,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

import RequestTable from '@/components/DataDisplay/RequestTable'
import FilterCard from '@/components/DataDisplay/FilterCard'
import { IHeader } from '@/components/DataDisplay/RequestTable/types'

// const AdminSwitch = (id: number, admin: boolean) => {
//   const [checked, setChecked] = React.useState(admin)

//   const handleOnChange = () => {
//     setChecked(!checked)
//   }

//   return (
//     <Switch colorScheme="blue" isChecked={checked} onChange={handleOnChange} />
//   )
// }

const Requests = () => {
  const tableData = [
    {
      name_form: 'Aproveitamento de ACE',
      send_data: '23/01/2024',
      last_modification: '23/01/2024',
      admin: 'Encerrado',
    },
    {
      name_form: 'Solicitação de Trancamento',
      send_data: '10/01/2024',
      last_modification: '30/01/2024',
      admin: 'Em andamento',
    },
    {
      name_form: 'Aproveitamento de Carga Horária Flexível',
      send_data: '02/10/2023',
      last_modification: '23/01/2024',
      admin: 'Finalizado',
    },
  ]

  const header: Array<IHeader> = [
    {
      name: 'Formulário',
      key: 'name_form',
    },
    {
      name: 'Preenchido em',
      key: 'send_data',
    },
    {
      name: 'Última modificação',
      key: 'last_modification',
    },
    {
      name: 'Status',
      key: 'admin',
    },
  ]

  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Solicitações
      </Text>
      <FilterCard />
      <RequestTable data={tableData} headers={header} />
    </Stack>
  )
}

export default Requests
