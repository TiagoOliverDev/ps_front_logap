import { Box } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
import SuppliersList from '../../shared/components/suppliers/SuppliersList';
import { Container } from '@mui/material';

export const Suppliers: React.FC = () => {

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