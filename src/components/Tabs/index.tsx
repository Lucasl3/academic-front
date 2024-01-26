import React, { useCallback } from 'react'

import {
  Text,
  Tabs as ChakraTabs,
  TabList as ChakraTabList,
  Tab as ChakraTab,
  TabPanels as ChakraTabPanels,
  TabPanel as ChakraTabPanel,
} from '@chakra-ui/react'

import { findIndexWithDefault } from '@/utils/array'

import { ITabsProps } from './types'

const Tabs = ({
  items,
  initialTab,
  onTabClick,
  variant = 'unstyled',
  ...rest
}: ITabsProps) => {
  const handleOnChange = useCallback(
    (value: number) => {
      if (onTabClick) {
        onTabClick(items[value].id)
      }
    },
    [onTabClick],
  )

  return (
    <ChakraTabs
      variant={variant}
      onChange={handleOnChange}
      overflowX="auto"
      defaultIndex={findIndexWithDefault(
        items,
        (value) => value.id === initialTab,
        0,
      )}
      {...rest}
    >
      <ChakraTabList borderBottom="2px" borderColor="gray.400">
        {items.map((item) => (
          <ChakraTab
            key={`tab-${item.id}`}
            color="gray.700"
            _selected={{
              color: '#495796',
              marginBottom: '-2px',
              borderBottom: '2px',
            }}
          >
            <Text fontSize="md" fontWeight="semibold">
              {item.label}
            </Text>
          </ChakraTab>
        ))}
      </ChakraTabList>
      <ChakraTabPanels>
        {items.map((item) => {
          return (
            <ChakraTabPanel key={`tab-panel-${item.id}`}>
              {item.render ? item.render() : null}
            </ChakraTabPanel>
          )
        })}
      </ChakraTabPanels>
    </ChakraTabs>
  )
}

export default Tabs
