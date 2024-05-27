import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Products, Suppliers, Dashboard } from '../../pages';
import { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useAppDrawerContext, useAuthContext } from "../contexts";
import { Login } from '../../pages/login/login'; 
import { IPrivateRouteProps } from '../../@types/IPrivateRouteProps';
import { Register } from '../../pages/register/register';


export const AppRoutes = () => {
    const { setDrawerOption } = useAppDrawerContext();

    const { isAuthenticated } = useAuthContext();
  
    const PrivateRoute: React.FC<IPrivateRouteProps> = ({ isAuthenticated, children }) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
    };

    useEffect(() => {
        setDrawerOption([
            {
                icon: <HomeIcon />,
                path: "/home",
                label: "Página Inicial",
            },
            {
                icon: <HomeIcon />,
                path: "/fornecedores",
                label: "Fornecedores",
            },
            {
                icon: <HomeIcon />,
                path: "/produtos",
                label: "Produtos",
            },
            {
                icon: <HomeIcon />,
                path: "/dashboard",
                label: "Dashboard",
            },
        ]);
    }, [setDrawerOption]);

    return (
        <Routes>
            <Route 
                path="/login" 
                element={
                    isAuthenticated ? <Navigate to="/home" replace /> : <Login />
                }  
            />
            <Route 
                path="/register" 
                element={<Register />}  
            />
            <Route 
                path="/home" 
                element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Home />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/" 
                element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} 
            />
            <Route 
                path="/fornecedores" 
                element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Suppliers />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/produtos" 
                element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Products />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/dashboard" 
                element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Dashboard />
                    </PrivateRoute>
                } 
            />
        </Routes>

        // <Routes>
        //     <Route path="/login" element={<Login />} />
        //     <Route path="/" element={<Home />} />
        //     <Route path="/home" element={<Home />} />
        //     <Route path="/fornecedores" element={<Suppliers />} />
        //     <Route path="/produtos" element={<Products />} />
        //     <Route path="/dashboard" element={<Dashboard />} />
        // </Routes>
    );
};
