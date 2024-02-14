import { Box } from "@mui/material";
import { BadgeProps } from "interfaces/badge.model";

const IconWithBadge = (props: BadgeProps) => {
    const { badgeStyle, icon, title } = props;
    const titleStyle = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 1,
    };
    return (
        <Box sx={badgeStyle}>
            {icon && <Box>{icon}</Box>}
            <Box sx={titleStyle}>{title}</Box>
        </Box>
    );
};
export default IconWithBadge;