import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../../pages';
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
                path: "/home",
                label: "Dashboard",
            },
        ]);
    }, [setDrawerOption]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};
