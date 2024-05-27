import { InputLabel } from "@mui/material";
import { IInputLabel } from "../../../@types/IInputLabel";

export const LabelLogin: React.FC<IInputLabel> = ({ htmlFor, title }) => {
    return (
        <InputLabel
            htmlFor={htmlFor}
            style={{
                marginBottom: '9px',
                fontSize: '18px', 
                fontWeight: 700, 
                lineHeight: '22.5px',
                textAlign: 'left',
                color: '#262626'
            }}
        >
       {title}
       </InputLabel>
    );
  };