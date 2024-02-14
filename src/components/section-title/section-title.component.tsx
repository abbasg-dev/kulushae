import { Box, Typography } from "@mui/material";
import Images from 'assets/images';
import { TitleProps } from "interfaces/title.model";

const SectionTitle = (props: TitleProps) => {
    const { title, fontSize, fontWeight } = props;
    return (
        <Typography 
            component="div" 
            fontSize={fontSize} 
            fontWeight={fontWeight} 
            lineHeight="normal" 
            position="relative" 
            width="auto" 
            margin="auto"
        >
            <Box position="absolute" top={12} zIndex={0}>
                <Images.GRAY_SHADOW />
            </Box>
            <div style={{ position: 'relative', zIndex: 1 }}>
                {title}
            </div>
        </Typography>
    );
}

export default SectionTitle;