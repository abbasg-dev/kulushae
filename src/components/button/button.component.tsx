import Button from '@mui/material/Button';
import { BtnProps } from 'interfaces/mui-components.model';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { CSSProperties } from '@mui/styles';
const ControlledButton = (props: BtnProps & { loadingButtonProps?: LoadingButtonProps }) => {
    const { value, customButton, customStyle, callBackFunc, loadingButtonProps, disabled, btnId, name } = props;
    if (loadingButtonProps) {
        return (
            <LoadingButton
                variant="contained"
                style={customStyle as CSSProperties}
                onClick={callBackFunc}
                {...loadingButtonProps}
                disabled={disabled}
                id={btnId}
            >
                {value}
            </LoadingButton>
        );
    } else {
        const CustomButton = customButton || Button;
        return (
            <CustomButton 
                variant="contained" 
                style={customStyle as CSSProperties} 
                onClick={callBackFunc} 
                disabled={disabled}
                id={btnId}
                name={name}
            >
                {value}
            </CustomButton>
        );
    }
};
export default ControlledButton;
