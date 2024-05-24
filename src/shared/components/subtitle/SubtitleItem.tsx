import React from 'react';
import { Typography, Box } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ReportItemProps {
    text: string;
}

const SubtitleItem: React.FC<ReportItemProps> = ({ text }) => {
    return (
        <Box display="flex" alignItems="center" mb={1}>
            <KeyboardArrowRightIcon sx={{ color: '#F5F5F5', mr: 1 }} />
            <Typography component="div" sx={{ color: '#F5F5F5' }}>
                {text}
            </Typography>
        </Box>
    );
};

export default SubtitleItem;
