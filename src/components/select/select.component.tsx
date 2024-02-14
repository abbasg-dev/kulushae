import React from 'react';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import { InputLabel, MenuProps } from '@mui/material';
import { SelectProps, SelectItem } from 'interfaces/mui-components.model';
const useStyles = makeStyles(() => ({
    formControl: {
        "& .MuiInputBase-root": {
            justifyContent: "center",
        },
        "& .MuiSelect-select.MuiSelect-select": {
            paddingRight: '0!important',
            width: 'unset',
        },
    },
    select: (props: SelectProps) => ({
        width: "unset",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        fontFamily: "Roboto",
        fontSize: "16px !important",
        fontStyle: "normal",
        fontWeight: props?.type === 'categories' ? "bold!important" : '400',
        lineHeight: "normal",
        "&:focus": {
            backgroundColor: "transparent",
        },
    }),
    selectIcon: {
        position: "relative",
        color: "rgba(0, 0, 0, 0.50)",
        fontSize: "12px",
    },
    paper: {
        borderRadius: 12,
        marginTop: 8,
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        "& li": {
            fontWeight: 200,
            paddingTop: 8,
            paddingBottom: 8,
            fontSize: "12px",
        },
    },
    customSelect: {
        paddingRight: "32px",
        "& fieldset": {
            border: 'none',
            fontSize: 16,
            fontWeight: 400
        }
    },
}));
const ControlledSelect = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
    const { data, handleChange, value, label, style } = props;
    const classes = useStyles(props);
    const [open, setOpen] = useState(false);
    const menuProps = {
        classes: {
            list: classes.list,
            paper: classes.paper,
        },
    };
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        const selectedItem = data?.find((item) => item.value === selectedValue);
        const selectedName = selectedItem ? selectedItem.name : '';

        handleChange(selectedValue, selectedName);
    };
    return (
        <FormControl
            ref={ref}
            sx={{ m: 1, minWidth: 120 }}
            size="small"
            className={classes.formControl}
        >
            {!value ? (
                <InputLabel id="demo-controlled-open-select-label" sx={{
                    textShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px',
                    cursor: 'pointer'
                }}>{label}</InputLabel>
            ) : ''}
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={value}
                onChange={handleSelectChange}
                MenuProps={menuProps as Partial<MenuProps>}
                classes={{
                    select: classes.select,
                    icon: classes.selectIcon,
                }}
                className={classes.customSelect}
                style={style}
            >
                <MenuItem value="" style={{ display: 'none' }} />
                {data?.map((item: SelectItem) => (
                    <MenuItem
                        key={item?.value}
                        value={item?.value}
                        data-name={item?.name || item?.text}
                    >
                        {item?.name || item?.text}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});
export default ControlledSelect;