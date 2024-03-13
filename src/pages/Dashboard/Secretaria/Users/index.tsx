import React, { useEffect, useMemo, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { TfiReload } from 'react-icons/tfi'

import {
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
  Skeleton,
  HStack,
  IconButton,
  Tooltip,
  Box,
} from '@chakra-ui/react'

import { useQueryUsers } from '@/api/dashboard/user/queries'
import DataTable from '@/components/DataDisplay/DataTable'
import { IHeader } from '@/components/DataDisplay/DataTable/types'
import { profilesLabels, SECRETARY } from '@/utils/profile'

import AdminSwitch from './parts/AdminSwitch'

const Users = () => {
  const toast = useToast()
  const [searchText, setSearchText] = useState('')

  const {
    data: users = [],
    isFetching: isUsersFetching,
    refetch: refetchUsers,
  } = useQueryUsers(
    { search: searchText },
    {
      enabled: true,
      onError: () => {
        toast({
          title: 'Houve um erro ao buscar os usuários.',
          status: 'error',
          duration: 5000,
        })
      },
    },
  )

  const usersData = useMemo(() => {
    const mappedUsers = users.map((user) => {
      return {
        name: user.noUser,
        email: user.dsEmail,
        type: profilesLabels(user.coProfile),
        admin: (
          <AdminSwitch
            user={user}
            isAdmin={user.coProfile === SECRETARY}
            onSuccess={refetchUsers}
          />
        ),
      }
    })

    return mappedUsers
  }, [users])

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

  useEffect(() => {
    refetchUsers()
  }, [searchText])

  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Usuários
      </Text>
      <HStack>
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
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
        <Tooltip label="Atualizar">
          <IconButton
            icon={<TfiReload />}
            aria-label="reload"
            bg="#FBFBFB"
            _hover={{
              bg: '#FBFBFB80',
            }}
            onClick={() => refetchUsers()}
          />
        </Tooltip>
      </HStack>
      <DataTable
        data={usersData}
        headers={header}
        isLoading={isUsersFetching}
      />
    </Stack>
  )
}

export default Users
