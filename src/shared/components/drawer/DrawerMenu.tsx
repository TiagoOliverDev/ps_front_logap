import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    useMediaQuery,
    useTheme,
    Icon
} from "@mui/material";

import { useAppDrawerContext } from "../../contexts/DrawerContext";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
// import { Logout } from "@mui/icons-material";

import { IMenuLateralProps } from "../../../@types/IMenuLateralProps";
import { ListItemLink } from "./ListItemLink"; 



export const DrawerMenur: React.FC<IMenuLateralProps> = ({ children }) => {
    // const { toggleTheme } = useAppThemeContext();
    // const { logout } = useAuthContext();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    const { isDrawer, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();

    return (
        <>
            <Drawer 
                open={isDrawer} variant={smDown ? "temporary" : "permanent"} 
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

                    <Box flex={1}>
                        <List component={"nav"}>
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    key={drawerOptions.path}
                                    label={drawerOptions.label}
                                    icon={drawerOptions.icon}
                                    to={drawerOptions.path}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>
                    {/* <Box>
                        <List component={"nav"}>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>
                                        <DarkModeIcon />
                                        <WbSunnyIcon />
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary={"Alterar tema"} />
                            </ListItemButton>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <Icon>
                                        <Logout />
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary={"Sair"} />
                            </ListItemButton>
                        </List>
                    </Box> */}
                </Box>
            </Drawer>

            <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(26)}>
                {children}
            </Box>
        </>
    );
};