import { useTranslation } from "react-i18next";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { CustomTab, CustomTabPanel } from 'components/tabs/tabs.component';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import ByEmail from 'pages/Authentication/ForgetPassword/ByEmail';
import ByPhoneNumber from 'pages/Authentication/ForgetPassword/ByPhoneNumber';
import BackTo from "components/back-to/back-to.component";
import * as ROUTES from 'constants/routes';
const useStyles = makeStyles(() => ({
    muiBox: {
        '& .MuiTabs-root': {
            width: '100%',
            border: '1px solid #000',
            boxShadow: '0px 4px 9px 0px rgba(0, 0, 0, 0.08)',
            borderRadius: '16px !important'
        }
    },
    tabs: {
        '& .MuiTabs-flexContainer': {
            justifyContent: 'normal',
            width: '100%'
        },
        '& .MuiButtonBase-root': {
            borderRadius: 15,
            background: '#fff',
            boxShadow: '0px 4px 9px 0px rgba(0, 0, 0, 0.08)',
            color: '#000',
            width: '50%'
        },
        '& .MuiTabs-indicator': {
            backgroundColor: 'unset'
        },
        '& .MuiButtonBase-root.Mui-selected': {
            background: '#000 !important',
            color: '#fff !important',
        },
        '& .MuiButtonBase-root.Mui-selected .MuiBox-root': {
            color: 'unset !important'
        }
    }
}));
const ForgetPassword = () => {
    const { t } = useTranslation("common");
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [tabValue, setTabValue] = useState<number>(0);
    return (
        <>
            <Box sx={{ minHeight: "100vh" }}>
                <BackTo path={ROUTES.LOGIN} title={t('authentication.forget_password.forget_pwd')} func="back" />
                <Stack
                    sx={{
                        padding: '0 30px',
                        overflow: "hidden",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "grid",
                        justifyItems: "center",
                        width: isMobile ? "100%" : '40%'
                    }}
                >
                    <CustomTab tabValue={tabValue} setTabValue={setTabValue} classes={classes}>
                        <CustomTabPanel label={
                            <Box color="#000" fontSize={14} textTransform="capitalize" sx={{ placeItems: 'center' }}>
                                {t('authentication.login.social.email')}
                            </Box>
                        }>
                            <ByEmail />
                        </CustomTabPanel>
                        <CustomTabPanel label={
                            <Box color="#000" fontSize={14} textTransform="capitalize" sx={{ placeItems: 'center' }}>
                                {t('authentication.login.mobile')}
                            </Box>
                        }>
                            <ByPhoneNumber />
                        </CustomTabPanel>
                    </CustomTab>
                </Stack>
            </Box>
        </>
    );
}
export default ForgetPassword