import { useState, forwardRef, useImperativeHandle } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
type DatePickerProps = {
    label?: string;
}
const BasicDatePicker = forwardRef((props: DatePickerProps, ref) => {
    const { label } = props;
    const [value, setValue] = useState<Dayjs | null>(dayjs(dayjs().format('YYYY-MM-DD')));
    useImperativeHandle(ref, () => ({
        setValue: (newValue: Dayjs | null) => setValue(newValue),
    }));
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label={label}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
})
export default BasicDatePicker