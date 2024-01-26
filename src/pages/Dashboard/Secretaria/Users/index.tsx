import React from 'react'
import { IoMdSearch } from 'react-icons/io'

import {
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Switch,
} from '@chakra-ui/react'

import DataTable from '@/components/DataDisplay/DataTable'
import { IHeader } from '@/components/DataDisplay/DataTable/types'

const AdminSwitch = (id: number, admin: boolean) => {
  const [checked, setChecked] = React.useState(admin)

  const handleOnChange = () => {
    setChecked(!checked)
  }

  return (
    <Switch colorScheme="blue" isChecked={checked} onChange={handleOnChange} />
  )
}

const Users = () => {
  const tableData = [
    {
      name: 'Doe',
      email: 'doe@ic.ufal.br',
      type: 'Aluno',
      admin: AdminSwitch(2, true),
    },
    {
      name: 'Doe',
      email: 'doe@ic.ufal.br',
      type: 'Aluno',
      admin: AdminSwitch(2, false),
    },
    {
      name: 'Smith',
      email: 'smith@ic.ufal.br',
      type: 'Aluno',
      admin: AdminSwitch(2, true),
    },
  ]

  const header: Array<IHeader> = [
    {
      name: 'Nome',
      key: 'name',
    },
    {
      name: 'Email',
      key: 'email',
    },
    {
      name: 'Tipo',
      key: 'type',
    },
    {
      type: 'element',
      name: 'Admin',
      key: 'admin',
    },
  ]

  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Usuários
      </Text>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <IoMdSearch color="#495796" size={20} />
        </InputLeftElement>
        <Input
          placeholder="Busque por usuário"
          variant="filled"
          bg="#FBFBFB"
          _hover={{
            bg: 'white',
          }}
        />
      </InputGroup>
      <DataTable data={tableData} headers={header} />
    </Stack>
  )
}

export default Users
