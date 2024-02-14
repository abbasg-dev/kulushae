import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Icons from "assets/icons";
import { CustomTab, CustomTabPanel } from "components/tabs/tabs.component";
import { Link, useLocation } from 'react-router-dom';
import EmailRegister from "pages/Authentication/Register/EmailRegister";
import PhoneNumberRegister from "pages/Authentication/Register/PhoneNumberRegister";
import * as ROUTES from 'constants/routes';
import "pages/Authentication/authentication.scss";
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
const Register = () => {
    const { t } = useTranslation("common");
    const location = useLocation();
    const theme = useTheme();
    const classes = useStyles();
    const currentLocationState = location?.state?.method;
    const [tabValue, setTabValue] = useState<number>(0);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
                <BackTo path={ROUTES.LOGIN_METHODS} title={t('authentication.register.create_account')} func="back" />
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
                        width: isMobile ? "100%" : 'unset'
                    }}
                >
                    <CustomTab tabValue={tabValue} setTabValue={setTabValue} classes={classes}>
                        <CustomTabPanel label={
                            <Box color="#000" fontSize={14} textTransform="capitalize" gap={'5px!important'} display={'grid'} sx={{ placeItems: 'center' }}>
                                <Icons.EMAIL_OPEN />
                                {t('authentication.login.social.email')}
                            </Box>
                        }>
                            <EmailRegister />
                        </CustomTabPanel>
                        <CustomTabPanel label={
                            <Box color="#000" fontSize={14} textTransform="capitalize" gap={'5px!important'} display={'grid'} sx={{ placeItems: 'center' }}>
                                <Icons.PHONE_NUMBER />
                                {t('authentication.login.mobile')}
                            </Box>
                        }>
                            <PhoneNumberRegister />
                        </CustomTabPanel>
                    </CustomTab>
                    <Box sx={{
                        marginTop: '15px !important',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        gap: '30px!important',
                        display: 'grid',
                        justifyItems: 'center'
                    }}>
                        <Typography color="#86878B !important" textAlign="center" fontSize="10px !important" fontStyle="normal">
                            {t('authentication.register.have_account')}
                            <Link style={{ fontWeight: "700", textDecoration: "unset", marginLeft: 5, color: "#000" }} to={ROUTES.LOGIN_METHODS}>
                                {t('authentication.register.sign_in')}
                            </Link>
                        </Typography>
                    </Box>
                </Stack >
            </Box >
        </>
    );
};
export default Register;
