import OtpInput from 'react-otp-input';
import './CustomOTPInput.scss';
type OTPInputProps = {
    value?: string;
    onChange?: (value: string) => void;
    isMobile?: boolean;
};
const CustomOTPInput = (props: OTPInputProps) => {
    const { value, onChange, isMobile } = props;
    const handleInputChange = (newValue: string) => {
        onChange && onChange(newValue);
    };
    const renderInput = (inputProps: any, index: number) => {
        const hasValue = value && value.length >= index + 1;
        const inputStyle = {
            width: "3rem",
            height: "3rem",
            borderRadius: 4,
            margin: isMobile ? '0 5px' : "0 1rem",
            border: "1px solid rgba(0,0,0,0.3)",
            background: hasValue ? 'rgba(0, 0, 0, 0.08)' : '#FAFAFA',
            textAlign: 'center',
            fontSize: 21,
            fontWeight: 700,
        };
        return <input {...inputProps} style={inputStyle} />;
    };
    return (
        <OtpInput
            value={value}
            onChange={handleInputChange}
            numInputs={6}
            renderInput={renderInput}
            inputType='number'
        />
    );
};
export default CustomOTPInput;