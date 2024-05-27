import React from 'react'
import './App.css'
import { AppDrawerProvider, AuthProvider, useAuthContext } from './shared/contexts'
import { DrawerMenu } from './shared/components/drawer/DrawerMenu'
import { AppRoutes } from "./shared/routes"; 
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Login } from './pages/login/login';


const App: React.FC = () => {

  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/*" element={<LoginWrapper />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
    )
}

export default App

const LoginWrapper = () => {
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();

  if (isAuthenticated) {
    return (
      <AppDrawerProvider>
        <DrawerMenu>
          <AppRoutes />
        </DrawerMenu>
      </AppDrawerProvider>
    );
  } else {
    return <Login />;
  }
};



