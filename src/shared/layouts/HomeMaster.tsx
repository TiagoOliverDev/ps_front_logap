import { Box, Typography, useTheme, IconButton, useMediaQuery, Theme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDrawerContext } from "../contexts";
import { ILayoutBasePagesProps } from "../../@types/ILayoutBasePagesProps"; 


export const HomeMaster: React.FC<ILayoutBasePagesProps> = ({ children, title, toobar }) => {

    const { toggleDrawerOpen } = useAppDrawerContext();

    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            {/* <Box display={"flex"} alignItems={"center"} padding={1} gap={1}  >

                <Typography textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
                    {title}
                </Typography>
            </Box> */}

            {toobar && (
                <Box>
                    {toobar}
                </Box>
            )}

            <Box sx={{backgroundColor: '#10141E'}} flex={1} overflow={"auto"}>
                {children}
            </Box>
        </Box>
    );
    ;
}