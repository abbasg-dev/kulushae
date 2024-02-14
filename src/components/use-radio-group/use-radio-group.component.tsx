import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';
type RadioGroupProps = {
    data?: {
        value?: string;
        text?: string;
    }[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | string) => void;
    selectedValue?: string | null;
}
interface StyledFormControlLabelProps extends FormControlLabelProps {
    checked?: boolean;
    theme?: Theme;
}
const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
    <FormControlLabel {...props} />
))(({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
    },
}));
function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();
    const checked = radioGroup?.value === String(props.value);
    return <StyledFormControlLabel checked={checked} {...props} />;
}
const UseRadioGroup = (props: RadioGroupProps) => {
    const { data, handleChange, selectedValue } = props;
    return (
        <RadioGroup name="use-radio-group" value={selectedValue || ''} onChange={(e) => handleChange(e.target.value)}>
            {data && data.map((item) => (
                <MyFormControlLabel
                    key={item?.value}
                    value={item?.value || ''}
                    label={item?.text || ''}
                    control={<Radio />}
                />
            ))}
        </RadioGroup>
    );
}
export default UseRadioGroup