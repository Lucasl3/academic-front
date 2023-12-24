import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProvider, theme } from '@chakra-ui/react'

import { App } from './App'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript />
    <App />
  </ChakraProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
