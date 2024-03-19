import React, { useEffect, useState } from 'react'

import { Switch, useToast } from '@chakra-ui/react'

import { useMutationPutUser } from '@/api/dashboard/user/mutations'

import { IAdminSwitchProps } from './types'

const AdminSwitch = ({ user, isAdmin }: IAdminSwitchProps) => {
  const [checked, setChecked] = React.useState(isAdmin)
  const toast = useToast()

  useEffect(() => {
    setChecked(isAdmin)
  }, [isAdmin])

  const { mutate: updateAdmin } = useMutationPutUser({
    onSuccess: () => {
      toast({
        title: 'Usuário atualizado com sucesso!',
        status: 'success',
        duration: 5000,
      })
    },
    onError: () => {
      toast({
        title: 'Houve um erro ao atualizar o usuário.',
        status: 'error',
        duration: 5000,
      })
    },
  })

  const handleOnChange = () => {
    const payload = {
      coUser: user.coUser,
      noUser: user.noUser,
      dsEmail: user.dsEmail,
      coProfile: checked ? 2 : 1,
    }

    updateAdmin(payload)
    setChecked(!checked)
  }

  return (
    <Switch colorScheme="blue" isChecked={checked} onChange={handleOnChange} />
  )
}

export default AdminSwitch
