import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Divider } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
// import { DetailTools } from '../../shared/components/detailsTools/DetailTools';
import { useNavigate } from "react-router-dom";
import { TextFields } from '@mui/icons-material';
// import { useAuthContext } from '../../shared/contexts';
// import { UserService } from '../../shared/services/api/user/UserService';
import {

    CardActions,
    TextField,
    Button,

} from '@mui/material';

import SupplierForm from '../../shared/components/suppliers/SupplierForm';
import NestedList from '../../shared/components/suppliers/NestedList';
import { Container } from '@mui/material';
import { color } from 'framer-motion';
import ProductsList from '../../shared/components/poducts/ProductsList';


export const Products: React.FC = () => {

    // const [name, setName] = useState<string>('')
    // const [email, setEmail] = useState<string>('')
    // const [photoProfile, setPhotoProfile] = useState<string>('')

    const navigate = useNavigate()
    // const { logout } = useAuthContext()

    // const handleLogout = () => {
    //     logout()
    //     navigate("/")
    // }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = () => {
        // Lógica para salvar os dados do fornecedor
        console.log({ name, email, phone });
    };
    
    return(
        <HomeMaster
            title='Sessão de produtos'
        >

            {/* <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                <Typography color={"#F5F5F5"} variant="h6" textOverflow="ellipsis" whiteSpace="nowrap">
                    Sessão de Fornecedores
                </Typography>
            </Box> */}
           
            <Container>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mt={4}>
                    <ProductsList />
                </Box>
            </Container>
            
            

            {/* <Divider style={{backgroundColor: "#ccc", marginTop: "30px"}} />
             */}

        </HomeMaster>
    )
}