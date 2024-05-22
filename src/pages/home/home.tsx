import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
// import { DetailTools } from '../../shared/components/detailsTools/DetailTools';
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from '../../shared/contexts';
// import { UserService } from '../../shared/services/api/user/UserService';




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
    

    return(
        <HomeMaster
            title='teste'
        >
            <></>
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