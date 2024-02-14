import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Icons from "assets/icons";
import { CustomTab, CustomTabPanel } from "components/tabs/tabs.component";
import * as ROUTES from 'constants/routes';
import { useLocation } from 'react-router-dom';
import EmailLogin from "pages/Authentication/Login/EmailLogin";
import PhoneNumberLogin from "pages/Authentication/Login/PhoneNumberLogin";
import SocialAuthentication from "pages/social-login.component";
import BackTo from "components/back-to/back-to.component";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
    tabs: {
        '& .MuiTabs-flexContainer': {
            justifyContent: 'space-around'
        },
        '& .MuiTabs-indicator': {
            backgroundColor: '#000'
        }
    }
}));
const Login = () => {
    const { t } = useTranslation("common");
    const theme = useTheme();
    const classes = useStyles();
    const location = useLocation();
    const currentLocationState = location?.state?.method;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [tabValue, setTabValue] = useState<number>(0);
    useEffect(() => {
        if (currentLocationState !== undefined && currentLocationState === 'email') {
            setTabValue(0);
        } else if (currentLocationState !== undefined && currentLocationState === 'phone-number') {
            setTabValue(1);
        }
    }, [currentLocationState])
    return (
        <>
            <Box sx={{ minHeight: "100vh" }}>
                <BackTo title={(currentLocationState !== undefined && currentLocationState?.method === 'email') || tabValue === 0 ?
                    `${t(`authentication.login.login`)} ${t('authentication.login.with_email')}`
                    : (currentLocationState !== undefined && currentLocationState?.method === 'phone-number') || tabValue === 1 ?
                        `${t(`authentication.login.login`)} ${t('authentication.login.with_phone_number')}`
                        : ''
                } path={ROUTES.LOGIN_METHODS} func="back" />
                <Stack
                    sx={{
                        width: isMobile ? '100%!important' : '25%',
                        padding: '0 30px',
                        overflow: "hidden",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "grid",
                        justifyItems: "center",
                    }}
                >
                    <CustomTab tabValue={tabValue} setTabValue={setTabValue} classes={classes}>
                        <CustomTabPanel label={
                            <Box color="#000" fontSize={14} textTransform="capitalize" gap={'5px!important'} display={'grid'} sx={{ placeItems: 'center' }}>
                                <Icons.EMAIL_OPEN />
                                {t('authentication.login.social.email')}
                            </Box>
                        }>
                            <EmailLogin />
                        </CustomTabPanel>
                        <CustomTabPanel label={
                            <Box color="#000" fontSize={14} textTransform="capitalize" gap={'5px!important'} display={'grid'} sx={{ placeItems: 'center' }}>
                                <Icons.PHONE_NUMBER />
                                {t('authentication.login.mobile')}
                            </Box>
                        }>
                            <PhoneNumberLogin />
                        </CustomTabPanel>
                    </CustomTab>
                    <SocialAuthentication />
                </Stack >
            </Box >
        </>
    );
};
export default Login;
