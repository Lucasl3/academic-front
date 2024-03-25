import React, { useEffect, useMemo } from 'react'
import { FiBell } from 'react-icons/fi'
import { MdOutlineMarkChatRead, MdMarkChatUnread } from 'react-icons/md'

import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Circle,
  useToast,
  Text,
  Divider,
  Stack,
  HStack,
  CircularProgress,
  Flex,
  Icon,
} from '@chakra-ui/react'

import { useMutationUpdateNotificationStatus } from '@/api/dashboard/notification/mutations'
import { useQueryNotifications } from '@/api/dashboard/notification/queries'
import { formatDate, getCurrentDate } from '@/utils/date'

interface INotification {
  coNotification: number
  dsNotification: string
  read: boolean
  createdAt: string
}

const Notifications = () => {
  const toast = useToast()
  const [readNotifications, setReadNotifications] = React.useState<
    Array<INotification>
  >([])
  const [unreadNotifications, setUnreadNotifications] = React.useState<
    Array<INotification>
  >([])

  const {
    data: notifications = [],
    isFetching: isNotificationsFetching,
    refetch: refetchNotifications,
  } = useQueryNotifications({
    onError: () => {
      toast({
        title: 'Erro ao carregar notificações',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    },
  })

  const { mutate: toggleRead } = useMutationUpdateNotificationStatus({
    onError: () => {
      toast({
        title: 'Houve um erro ao atualizar a notificação',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    },
  })

  const notificationsData = useMemo(() => {
    const mappedNotifications = notifications.map((notification) => {
      return {
        coNotification: notification.coNotification,
        dsNotification: notification.dsNotification,
        read: notification.coStatus === 2,
        createdAt:
          formatDate(notification.dtCreatedAt) ||
          getCurrentDate('DD/MM [às] HH:mm'),
      }
    })

    return mappedNotifications
  }, [notifications])

  useEffect(() => {
    const read: Array<INotification> = []
    const unread: Array<INotification> = []

    notificationsData.forEach((notification) => {
      if (!notification.read) {
        unread.push(notification)
        return
      }
      read.push(notification)
    })

    setReadNotifications(read)
    setUnreadNotifications(unread)
  }, [notificationsData])

  const handleToggleReadNotification = ({
    coNotification,
    read,
  }: INotification) => {
    toggleRead({
      coNotification,
      coStatus: read ? 1 : 2,
    })
  }

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={
          <>
            <FiBell />
            {unreadNotifications.length !== 0 && (
              <Circle
                size="16px"
                color="white"
                position="absolute"
                top="6px"
                right="3px"
                fontSize="xs"
                bgColor="red.500"
              >
                {unreadNotifications.length}
              </Circle>
            )}
          </>
        }
      />
      <MenuList>
        <HStack px={3} py={2} justify="space-between">
          <Text fontWeight="medium" fontSize="sm">
            Notificações
          </Text>
          <Text color="gray.500" fontSize="sm">
            {unreadNotifications.length} não lidas
          </Text>
        </HStack>
        <Divider borderColor="gray.400" />
        <Stack w="300px" maxH="308px" py={3} justify="center">
          {isNotificationsFetching ? (
            <Flex justify="center" p={2}>
              <CircularProgress thickness={4} isIndeterminate color="#495796" />
            </Flex>
          ) : (
            <>
              {notificationsData.length === 0 && (
                <Text textAlign="center">Sem notificações</Text>
              )}
              {notificationsData.map((notification) => (
                <Stack
                  key={notification.coNotification}
                  px={3}
                  cursor="pointer"
                  _hover={{
                    bgColor: 'gray.100',
                  }}
                  onClick={() => handleToggleReadNotification(notification)}
                >
                  <HStack>
                    <Text fontSize="sm" noOfLines={3}>
                      {notification.dsNotification}
                    </Text>
                    <Icon
                      as={
                        notification.read
                          ? MdOutlineMarkChatRead
                          : MdMarkChatUnread
                      }
                      aria-label="marcar-como-lida"
                      color="#495796"
                    />
                  </HStack>
                  <Text textAlign="right" fontSize="sm" color="gray.400">
                    {notification.createdAt}
                  </Text>
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </MenuList>
    </Menu>
  )
}

export default Notifications
