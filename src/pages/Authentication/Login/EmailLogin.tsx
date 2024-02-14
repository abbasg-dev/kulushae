import FormBox from "components/form-box/form-box.component";
import FormInput from "components/form-input/form-input.component";
import { useTranslation } from "react-i18next";
import Icons from "assets/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EmailCredentials } from "interfaces/authentication.model";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useState } from "react";
import { Alert, Box, Collapse, IconButton, Typography } from "@mui/material";
import { useMutation } from '@apollo/client';
import { EMAIL_LOGIN_MUTATION } from "api/queries/auth.queries";
import Toaster from "components/toaster/toaster.component";
import { useDispatch } from "react-redux";
import { login } from "store/slices/authSlice";
import { Link } from "react-router-dom";
import * as ROUTES from 'constants/routes';
const EmailLogin = () => {
    const { t, i18n } = useTranslation("common");
    const dispatch = useDispatch();
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const EmailLoginSchema = yup.object().shape({
        email: yup.string().email(t('authentication.login.email_format')).required(t('authentication.login.email_required')),
        password: yup.string().required(t('authentication.login.password_required'))
    })
    const emailLoginMethods = useForm<EmailCredentials>({
        resolver: yupResolver<yup.AnyObjectSchema>(EmailLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const {
        control,
        formState: { errors },
    } = emailLoginMethods;
    const [emailLoginMutation] = useMutation(EMAIL_LOGIN_MUTATION);
    const onSubmitEmailLogin: SubmitHandler<EmailCredentials> = async (data) => {
        try {
            const { password, email } = data;
            const response = await emailLoginMutation({
                variables: { password, email },
            });
            const userData = JSON.stringify(response.data);
            localStorage.setItem("userData", userData);
            setOpenSuccess(true);
            setTimeout(() => dispatch(login()), 2000);
            emailLoginMethods.reset({ email: '', password: '' });
            emailLoginMethods.formState.isSubmitSuccessful = false;
        } catch (error) {
            const { message } = error;
            setErrorMessage(message);
            setOpenAlert(true);
            emailLoginMethods.formState.isSubmitSuccessful = false;
        }
    }
    const handleCloseSuccess = () => { setOpenSuccess(false) }
    const handleClose = () => { setOpenAlert(false) }
    return (
        <>
            {errorMessage && (
                <Collapse in={openAlert}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleClose}
                            >
                                <Icons.CLOSE />
                            </IconButton>
                        }
                    >
                        {errorMessage}
                    </Alert>
                </Collapse>
            )}
            <FormBox
                onSubmit={onSubmitEmailLogin}
                initialValues={{ email: '', password: '' }}
                sx={{ display: "grid" }}
                submitValue={t('authentication.login.login')}
                methods={emailLoginMethods}
                submitStyle={{
                    borderRadius: 40,
                    border: '1px solid #000',
                    background: '#FFF',
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    margin: '25px 0'
                }}
            >
                <Controller control={control} name={'email'} render={({ field }) => (
                    <Box
                        display="flex"
                        borderRadius={'12px!important'}
                        padding="5px 10px"
                        alignItems="center"
                        gap={'10px!important'}
                        margin={'10px 0'}
                        border={errors['email'] ? '1px solid red !important' : '1px solid rgba(0, 0, 0, 0.20)'}
                    >
                        <Box display="flex" alignItems="center">{<Icons.MAIL />}</Box>
                        <FormInput
                            name='email'
                            required
                            fullWidth
                            placeholder={t('authentication.login.social.email')}
                            type="email"
                            {...field}
                        />
                    </Box>
                )}
                />
                <Typography color="red">{errors['email'] ? (errors['email']?.message as ReactNode) : ''}</Typography>
                <Controller control={control} name={'password'} render={({ field }) => (
                    <Box
                        display="flex"
                        borderRadius={'12px!important'}
                        padding="5px 10px"
                        alignItems="center"
                        gap={'10px!important'}
                        margin={'10px 0'}
                        border={errors['password'] ? '1px solid red !important' : '1px solid rgba(0, 0, 0, 0.20)'}
                    >
                        <Box display="flex" alignItems="center">{<Icons.LOCK />}</Box>
                        <FormInput
                            name='password'
                            required
                            fullWidth
                            placeholder={t('authentication.login.password')}
                            type="password"
                            {...field}
                        />
                    </Box>
                )}
                />
                <Typography color="red">{errors['password'] ? (errors['password']?.message as ReactNode) : ''}</Typography>
                <Box sx={{ margin: 0, padding: 0, textAlign: i18n.language === 'en' ? 'right' : i18n.language === 'ar' ? 'left' : ''  }} >
                    <Link style={{ color: "#000", fontSize: 14, textDecoration: "unset", cursor: "pointer", textTransform: "capitalize" }} to={ROUTES.FORGET_PASSWORD}>{t('authentication.login.forgot_pass')}</Link>
                </Box>
            </FormBox>
            <Toaster
                open={openSuccess}
                title={`${t('common.congratulations')}!`}
                description={t('authentication.login.login_success')}
                handleClose={handleCloseSuccess}
                icon={<Icons.SUCCESS style={{ margin: '15px 0' }} />}
            />
        </>
    )
}
export default EmailLogin;