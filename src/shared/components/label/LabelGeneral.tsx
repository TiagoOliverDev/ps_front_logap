
import { InputLabel } from "@mui/material";
import { IInputLabel } from "../../../@types/IInputLabel";

export const LabelGeneral: React.FC<IInputLabel> = ({ htmlFor, title }) => {
    return (
        <InputLabel
            htmlFor={htmlFor}
            style={{
                // marginBottom: '9px',
                marginTop: '12px',
                fontSize: '18px', 
                fontWeight: 700, 
                lineHeight: '22.5px',
                textAlign: 'left',
                color: '#E8F0F3'
            }}
        >
       {title}
       </InputLabel>
    );
};