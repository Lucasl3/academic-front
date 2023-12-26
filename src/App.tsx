import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import SidebarContextProvider from '@/contexts/SidebarContext'
import Home from '@/pages/Home'

class App extends React.Component {
  render() {
    return (
      <SidebarContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SidebarContextProvider>
    )
  }
}

export default App
