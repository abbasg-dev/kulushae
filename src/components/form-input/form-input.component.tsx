import { FC, useState, forwardRef } from 'react';
import { TextField, TextFieldProps, InputAdornment, IconButton } from '@mui/material';
import Icons from 'assets/icons';
import { CSSProperties } from '@mui/styles';
type IFormInputProps = {
  name?: string;
  placeholder?: string;
  type?: string;
  reusable?: boolean;
  sx?: CSSProperties;
  value?: string
  onChange?: (e: any) => void;
} & TextFieldProps;
const FormInput: FC<IFormInputProps> = forwardRef((props, ref) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };
  const controlledValue = props.value !== undefined ? props.value : '';
  return (
    <TextField
      {...props}
      ref={ref}
      type={props.type === 'password' && showPass ? 'text' : props.type === 'password' && !showPass ? 'password' : 'text'}
      autoComplete='off'
      InputProps={{
        endAdornment: (
          props.type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPass ? <Icons.EYE /> : <Icons.EYE_OFF />}
              </IconButton>
            </InputAdornment>
          )
        )
      }}
      InputLabelProps={{ shrink: true }}
      style={{ flex: 1 }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
          },
          "& fieldset": {
            borderColor: "transparent",
          },
        },
        '&:hover': {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
          },
        },
        ...props?.sx,
      }}
      value={controlledValue}
      onChange={(e) => props?.onChange(e)}
    />
  );
});
export default FormInput;