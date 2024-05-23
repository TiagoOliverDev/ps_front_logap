import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';

import { useNavigate } from "react-router-dom";
import SuppliersList from '../../shared/components/suppliers/SuppliersList';
import { Container } from '@mui/material';



export const Suppliers: React.FC = () => {


    const navigate = useNavigate()

    return(
        <HomeMaster
            title='Sessão de fornecedores'
        >
           
            <Container>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mt={4}>
                    <SuppliersList />
                </Box>
            </Container>
            
        </HomeMaster>
    )
}