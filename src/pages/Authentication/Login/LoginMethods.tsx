import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Stack } from "@mui/material";
import CustomizedButton from "components/customized-button/customized-button.component";
import ControlledButton from "components/button/button.component";
import { SocialAuth } from "interfaces/authentication.model";
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icons from "assets/icons";
import * as ROUTES from 'constants/routes';
import 'pages/Authentication/authentication.scss';
const LoginMethods = () => {
    const { t } = useTranslation('common');
    const theme = useTheme();
    const navigate = useNavigate();
    const socialAuth: SocialAuth[] = [
        {
            name: t('authentication.login.social.email'),
            icon: <Icons.MAIL />,
            url: ROUTES.LOGIN,
            method: 'email'
        },
        {
            name: t('authentication.login.social.phone_number'),
            icon: <Icons.PHONE_NUMBER />,
            url: ROUTES.LOGIN,
            method: 'phone-number'
        },
        {
            name: t('authentication.login.social.facebook'),
            icon: <Icons.FACEBOOK_AUTH />
        },
        {
            name: t('authentication.login.social.google'),
            icon: <Icons.GOOGLE_AUTH />
        },
        {
            name: t('authentication.login.social.apple'),
            icon: <Icons.APPLE />
        }
    ];
    const onSignUpClick = () => navigate(ROUTES.REGISTER)
    return (
        <>
            <Box sx={{ minHeight: '100vh' }}>
                <Stack
                    sx={{
                        overflow: 'hidden',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'grid',
                        justifyItems: 'center'
                    }}
                >
                    <Typography sx={{ fontSize: '24px!important', fontWeight: '700!important', margin: '55px auto' }}>{t('authentication.login.login')}</Typography>
                    <Box sx={{ display: 'grid' }}>
                        {socialAuth.map((item: SocialAuth, index: number) => (
                            <Link key={index} to={item?.url} state={{ method: item?.method }}>
                                <CustomizedButton
                                    {...item}
                                    theme={theme}
                                    name={`${t('authentication.login.social.continue_with') + ' ' + item?.name}`}
                                    logo={item.icon}
                                    btnStyle={{
                                        background: '#FFF',
                                        border: '1px solid #EEE',
                                        color: '#212121',
                                        margin: '8px 0px',
                                        fontSize: '14px !important',
                                        fontWeight: 500,
                                        boxShadow: 'unset',
                                        textTransform: 'capitalize',
                                        alignItems: 'center',
                                        width: '-webkit-fill-available',
                                        justifyContent: 'left',
                                        gap: 20
                                    }}
                                />
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ 
                        marginTop: '40px !important',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        gap: '30px!important', 
                        display: 'grid',
                        justifyItems: 'center' 
                    }}>
                        <Typography dangerouslySetInnerHTML={{ __html: t('authentication.login.agreement-statement') }} className='agreement'></Typography>
                        <ControlledButton 
                            value={t('authentication.login.new-here') +' '+ t('authentication.register.sign_up')} 
                            customStyle={{
                                padding: '15px 40px',
                                alignItems: 'center',
                                borderRadius: 80,
                                background: '#000',
                                width: 'max-content',
                                fontSize: 14,
                                fontWeight: 700,
                                margin: '0 20px',
                                textTransform: 'capitalize'
                            }}
                            callBackFunc={onSignUpClick}
                        />
                    </Box>
                </Stack>
            </Box>
        </>
    )
}
export default LoginMethods;