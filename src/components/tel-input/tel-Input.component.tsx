import { MuiTelInput } from "mui-tel-input";
import { CSSProperties } from '@mui/styles';
type CustomTelInputProps = {
    onChange?: (e: any) => void;
    error?: string;
    value?: string;
    required?: boolean;
    id?: string;
    label?: string;
    style?: CSSProperties;
    name?: string;
}
const CustomTelInput = (props: CustomTelInputProps) => {
    const { onChange, error, value, required, id, label, style, name } = props;
    return (
        <MuiTelInput
            defaultCountry="AE"
            value={value}
            onChange={onChange}
            fullWidth={true}
            autoComplete="off"
            sx={{
                margin: "10px 0",
                borderRadius: "12px",
                padding: "5px",
                border: error ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.20)',
                "& fieldset": {
                    border: "unset",
                },
            }}
            required={required}
            id={id}
            label={label}
            style={style}
            name={name}
        />
    )
}
export default CustomTelInput;