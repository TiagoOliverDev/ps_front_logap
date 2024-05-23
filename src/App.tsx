import React from 'react'
import './App.css'
import { AppDrawerProvider } from './shared/contexts'
import { DrawerMenu } from './shared/components/drawer/DrawerMenu'
import { AppRoutes } from "./shared/routes"; 
import { BrowserRouter} from "react-router-dom";


const App: React.FC = () => {

  return (
      <BrowserRouter>
        <AppDrawerProvider>
          <DrawerMenu>
            <AppRoutes />
          </DrawerMenu>
        </AppDrawerProvider>
      </BrowserRouter>
    )
}

export default App




