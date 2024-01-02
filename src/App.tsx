import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import TemplatePage from '@/common/Templates/TemplatePage'
import SidebarContextProvider from '@/contexts/SidebarContext'
import Home from '@/pages/Home'
class App extends React.Component {
  render() {
    return (
      <SidebarContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TemplatePage />}>
              <Route path="teste1" element={<Home />} />
              <Route index element={<h1>Teste 1</h1>} />
              <Route path="teste2" element={<h1>Teste 2</h1>} />
              <Route path="teste3" element={<h1>Teste 3</h1>} />
              <Route path="teste4" element={<h1>Teste 4</h1>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SidebarContextProvider>
    )
  }
}

export default App
