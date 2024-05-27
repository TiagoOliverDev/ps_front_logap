import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    useMediaQuery,
    ListItemButton,
    ListItemText,
    useTheme
} from "@mui/material";

import { useAppDrawerContext } from "../../contexts/DrawerContext";
import { IMenuLateralProps } from "../../../@types/IMenuLateralProps";
import { ListItemLink } from "./ListItemLink"; 
import { useAuthContext } from "../../contexts";


export const DrawerMenu: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const { isDrawer, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
    const { logout } = useAuthContext();

    return (
        <>
            <Drawer
                open={isDrawer}
                variant={smDown ? "temporary" : "permanent"}
                onClose={toggleDrawerOpen}
                sx={{
                    position: 'fixed',
                    backgroundColor: { xs: 'rgba(0, 0, 0, 0.9)', md: 'black' },
                    height: '100%',
                    width: { xs: '100%', md: theme.spacing(30) },
                    zIndex: 30,
                    display: { xs: 'block', md: 'block' },
                    "& .MuiDrawer-paper": {
                        position: 'fixed',
                        backgroundColor: { xs: 'rgba(0, 0, 0, 0.9)', md: 'black' },
                        height: '100%',
                        width: { xs: '100%', md: theme.spacing(30) },
                        zIndex: 30,
                    }
                }}
            >
                <Box width={theme.spacing(26)} height={"100%"} display={"flex"} flexDirection={"column"}>
                    <Box width={"100%"} height={theme.spacing(20)} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://scontent.fnat18-1.fna.fbcdn.net/v/t39.30808-1/338925105_1822570114811222_4826913868484575657_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DLMBSZzywJwAX8RCUzj&_nc_ht=scontent.fnat18-1.fna&oh=00_AfDXk5eTLbWCI2_HuRxxgLr89xtmsvsgRzyn3SFsWNog-w&oe=6476C324"
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }} />
                    </Box>

                    <Divider />

                    <Box flex={1} width={'100%'} marginLeft="1.6vh">
                        <List component={"nav"}>
                            {drawerOptions.map(drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    label={drawerOption.label}
                                    icon={drawerOption.icon}
                                    to={drawerOption.path}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>
                    <Box width={'100%'} marginLeft="1.6vh">
                        <List component={"nav"}>
                            <ListItemButton 
                                onClick={logout}
                                sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(59, 130, 246, 0.2)', 
                                        borderColor: '#2563eb',
                                        color: '#ffffff' 
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(59, 130, 246, 0.2)', 
                                        borderColor: '#2563eb',
                                    },
                                    backgroundColor: 'rgba(107, 114, 128, 0.2)',
                                    borderColor: '#000000',
                                    color: '#ffffff', 
                                    borderRadius: '5px', 
                                    borderWidth: '2px', 
                                    textAlign: 'center', 
                                    fontWeight: '600', 
                                    fontSize: '16px', 
                                    marginBottom: '13px',
                                }}
                            >
                                <ListItemText primary={"Sair"} />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(26)}>
                {children}
            </Box>
        </>
    );
};
