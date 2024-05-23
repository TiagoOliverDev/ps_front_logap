import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Products, Suppliers } from '../../pages';
import { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useAppDrawerContext } from "../contexts";

export const AppRoutes = () => {
    const { setDrawerOption } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                icon: <HomeIcon />,
                path: "/",
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
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/fornecedores" element={<Suppliers />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/dashboard" element={<Products />} />
        </Routes>
    );
};
