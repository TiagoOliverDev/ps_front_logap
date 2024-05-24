import {
    ListItemButton,
    ListItemText
} from "@mui/material";

import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { IListItemLinkProps } from "../../../@types/IListItemLinkProps";


export const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {

    const navigate = useNavigate();

    const resouvedPath = useResolvedPath(to);
    const math = useMatch({ path: resouvedPath.pathname, end: false })

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton selected={!!math} onClick={handleClick}
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
            <ListItemText primary={label} />
        </ListItemButton>
    );
};
