import { Box, Typography, IconButton } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useAppDrawerContext } from "../contexts";
import { ILayoutBasePagesProps } from "../../@types/ILayoutBasePagesProps"; 


export const HomeMaster: React.FC<ILayoutBasePagesProps> = ({ children, title, toobar }) => {

    const { toggleDrawerOpen } = useAppDrawerContext();

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Box height="10vh" display="flex" alignItems="center" 
                sx={{ backgroundColor: '#000000', padding: '8px', color: '#f5f5f5', ml: 4  }}>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={toggleDrawerOpen} sx={{ color: '#f5f5f5', marginRight: '8px' }}>
                        <DoubleArrowIcon />
                    </IconButton>
                    <Typography variant="h6" textOverflow="ellipsis" whiteSpace="nowrap">
                        {title}
                    </Typography>
                </Box>
            </Box>

            {toobar && (
                <Box sx={{ backgroundColor: '#000000', padding: '8px', color: '#f5f5f5' }}>
                    {toobar}
                </Box>
            )}

            <Box flex={1} sx={{ backgroundColor: '#10141E', overflow: 'auto', padding: '16px' }}>
                {children}
            </Box>
        </Box>
    );
}