import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Icons from "assets/icons";
import { BackToProps } from "interfaces/title.model";
import { useTranslation } from 'react-i18next';
const BackTo = (props: BackToProps) => {
    const { i18n } = useTranslation('common');
    const { path, title, func, has_child, onClickFunc, isClicked } = props;
    return (
        <Box
            display="flex"
            alignItems="center"
            gap={'12px !important'}
            marginRight={i18n.language === 'ar' ? 'auto' : 'unset'}
            marginLeft={i18n.language === 'ar' ? 'auto' : 'unset'}
            padding={isClicked ? '10px !important' : '30px !important'}
            width={func === "back" ? "max-content" : func === "next" ? "-webkit-fill-available" : ""}
            height="fit-content"
        >
            {i18n.language === 'en' && func === 'back' && (
                <Link to={path} onClick={onClickFunc}> 
                    <Icons.ARROW style={{ transform: i18n.language === 'en' ? 'rotate(180deg)' : 'unset' }} />
                </Link>
            )}
            {i18n.language === 'en' && func === 'next' && has_child && (
                <Box style={{ order: i18n.language === 'en' ? 1 : -1, marginLeft: "auto", cursor: 'pointer' }} onClick={onClickFunc}>
                    <Icons.NEXT style={{ transform: i18n.language === 'en' ? 'unset' : 'rotate(180deg)' }} />
                </Box>
            )}
            <Typography
                color="#212121"
                fontSize={22}
                fontWeight={600}
                width={'max-content'}
            >{title}</Typography>
            {i18n.language === 'ar' && func === 'back' && (
                <Link to={path} onClick={onClickFunc}>
                    <Icons.ARROW style={{ transform: i18n.language === 'ar' ? 'unset' : 'rotate(180deg)' }} />
                </Link>
            )}
            {i18n.language === 'ar' && func === 'next' &&  has_child && (
                <Box style={{ order: i18n.language === 'ar' ? -1 : 1, marginLeft: "auto", cursor: 'pointer' }} onClick={onClickFunc}>
                    <Icons.NEXT style={{ transform: i18n.language === 'ar' ? 'rotate(180deg)' : '' }} />
                </Box>
            )}
        </Box>
    )
}
export default BackTo;