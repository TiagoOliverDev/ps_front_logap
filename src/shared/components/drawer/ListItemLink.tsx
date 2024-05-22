
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Icon
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
        <ListItemButton selected={!!math} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};
