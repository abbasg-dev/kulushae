import { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
type MultipleSelectProps = {
    data?: { id?: string; title?: string; __typename?: string }[];
    option?: string[];
    setOption?: (options: string[]) => void;
    label?: string;
}
function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme?.palette?.typography?.fontWeightRegular
                : theme?.palette?.typography?.fontWeightMedium,
    };
}
const MultipleSelect = (props: MultipleSelectProps) => {
    const theme = useTheme();
    const { data, option, setOption, label } = props;
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setOption(typeof value === 'string' ? value.split(',') : value);
    };
    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={option}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
            >
                {data?.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.title}
                        style={getStyles(item.title, option, theme)}
                    >
                        {item.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export default MultipleSelect;