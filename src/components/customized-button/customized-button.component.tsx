import { Typography, Box, Button } from '@mui/material';
import { CustomBtnProps } from 'interfaces/mui-components.model';
const CustomizedButton = (props: CustomBtnProps) => {
    const { title, name, logo, btnStyle } = props;
    return (
        <Button style={btnStyle}>
            {logo}
            <Box width='max-content'>
                <Typography fontSize='12px!important' fontWeight='400!important'>
                    {name}
                </Typography>
                {title && (
                    <Typography color='var(--grayscale-900, #191F33)' fontSize='16px!important' fontWeight='600!important'>
                        {title}
                    </Typography>
                )}
            </Box>
        </Button>
    )
}
export default CustomizedButton;