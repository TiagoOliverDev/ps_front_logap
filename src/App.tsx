import React from 'react'
import './App.css'
import { AppDrawerProvider } from './shared/contexts'
import { DrawerMenur } from './shared/components/drawer/DrawerMenu'
import { AppRoutes } from "./shared/routes"; 
import { BrowserRouter} from "react-router-dom";


const App: React.FC = () => {

  return (
      <AppDrawerProvider>
        <DrawerMenur>
          <BrowserRouter>
            <AppRoutes/>
          </BrowserRouter>
        </DrawerMenur>
      </AppDrawerProvider>
    )
}

export default App




