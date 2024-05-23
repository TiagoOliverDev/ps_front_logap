import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
import { useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import ProductsList from '../../shared/components/poducts/ProductsList';


export const Products: React.FC = () => {

    const navigate = useNavigate()

    
    return(
        <HomeMaster
            title='Sessão de produtos'
        >

            <Container>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mt={4}>
                    <ProductsList />
                </Box>
            </Container>
            
        
        </HomeMaster>
    )
}