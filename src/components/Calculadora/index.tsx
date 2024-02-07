import React, { useState } from 'react'

import {
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useMediaQuery,
} from '@chakra-ui/react'

import CalculadoraFaltas from './faltas'
import CalculadoraNotas from './notas'

const Calculadora = () => {
  return (
    <Flex
      boxShadow="lg"
      rounded="lg"
      p={4}
      bg="#FBFBFB"
      sx={{
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Text fontSize="lg" fontWeight="semibold" color="#444A63">
        Calculadora IC
      </Text>
      <Tabs isFitted>
        <TabList>
          <Tab
            _selected={{
              color: '#495796',
              borderBottomColor: '#495796',
            }}
          >
            Nota Final
          </Tab>
          <Tab
            _selected={{
              color: '#495796',
              borderBottomColor: '#495796',
            }}
          >
            Faltas
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CalculadoraNotas />
          </TabPanel>
          <TabPanel>
            <CalculadoraFaltas />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default Calculadora
