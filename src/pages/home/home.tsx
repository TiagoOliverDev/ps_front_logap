import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
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


export const Home: React.FC = () => {

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
            title='Painel de controle'
        >
           
            <Container>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mt={4}>
                    <SupplierForm />
                    <NestedList />
                </Box>
            </Container>
            {/* <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Card sx={{ width: 400, borderRadius: 2, p: 2 }}>
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        Cadastro de Fornecedor
                    </Typography>
                    <TextField
                        fullWidth
                        label="Nome"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Telefone"
                        variant="outlined"
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Salvar
                    </Button>
                </CardActions>
            </Card>
        </Box></> */}
            {/* <Box className="flex items-center justify-center w-full h-full min-h-screen overflow-hidden">
                <Card
                    className='w-[396px] h-[355px] rounded-lg'
                    style={{borderRadius: 16}}
                >
                    <CardContent>
                        <Box className="flex flex-col gap-2 w-full">
                            <Typography variant="h4" align="center" fontSize="16px">Profile Picture</Typography>
                            <Box className="flex items-center justify-center">
                                <Avatar style={{borderRadius: 8, width: 58, height: 56}} alt="Nome do Usuário"  />
                                <h2>TESTE</h2>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box> */}
            
        </HomeMaster>
    )
}