
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
        <ListItemButton selected={!!math} onClick={handleClick}
            sx={{
                '&.Mui-selected': {
                    backgroundColor: 'rgba(59, 130, 246, 0.2)', // bg-blue-500/20
                    borderColor: '#2563eb', // border-blue-600
                    color: '#ffffff' // text-white
                },
                '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.2)', // bg-blue-500/20
                    borderColor: '#2563eb', // border-blue-600
                },
                backgroundColor: 'rgba(107, 114, 128, 0.2)', // bg-gray-500/20
                borderColor: '#000000', // border-black
                color: '#ffffff', // text-white
                // padding: '8px', // p-2
                // marginY: '8px', // my-2
                borderRadius: '5px', // rounded-[5px]
                borderWidth: '2px', // border-2
                textAlign: 'center', // text-center
                fontWeight: '600', // font-semibold
                fontSize: '16px', // text-[16px]
                marginBottom: '13px',
                // width: '100%' // full width
            }}
        >
            {/* <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon> */}
            <ListItemText primary={label} />
        </ListItemButton>
    );
};
