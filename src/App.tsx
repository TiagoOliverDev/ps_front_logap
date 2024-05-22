// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import { AppDrawerProvider } from './shared/contexts'
import { DrawerMenur } from './shared/components/drawer/DrawerMenu'
import { AppRoutes } from "./shared/routes"; 
import { BrowserRouter} from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from './pages'; 

const App: React.FC = () => {

  return (
    <AppDrawerProvider>
        <DrawerMenur>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </DrawerMenur>
    </AppDrawerProvider>
  )
}

export default App




