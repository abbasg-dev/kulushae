import { useTranslation } from "react-i18next";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PhoneCredentials } from "interfaces/authentication.model";
import { ReactNode, useState } from "react";
import FormBox from "components/form-box/form-box.component";
import { Alert, Box, Collapse, IconButton, Typography } from "@mui/material";
import FormInput from "components/form-input/form-input.component";
import Icons from "assets/icons";
import { useMutation } from '@apollo/client';
import { PHONE_NUMBER_LOGIN_MUTATION } from "api/queries/auth.queries";
import CustomTelInput from "components/tel-input/tel-Input.component";
import "yup-phone"
import Toaster from "components/toaster/toaster.component";
import { useDispatch } from "react-redux";
import { login } from "store/slices/authSlice";
import { Link } from "react-router-dom";
import * as ROUTES from 'constants/routes';
const PhoneNumberLogin = () => {
    const { t, i18n } = useTranslation("common");
    const dispatch = useDispatch();
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const PhoneNumberLoginSchema = yup.object().shape({
        phoneNumber: yup.string().nullable().test(
            'is-valid-phone',
            t('authentication.login.invalid_no_phone'),
            (value) => {
                if (value === null || value === '') {
                    return true;
                }
                try {
                    const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
                    const number = phoneUtil.parseAndKeepRawInput(value, '');
                    return phoneUtil.isValidNumber(number);
                } catch (error) {
                    return false;
                }
            }).required(t('authentication.login.phone_no_required')),
        password: yup.string().required(t('authentication.login.password_required'))
    })
    const phoneNumberLoginMethods = useForm<PhoneCredentials>({
        resolver: yupResolver<yup.AnyObjectSchema>(PhoneNumberLoginSchema),
        defaultValues: {
            phoneNumber: '',
            password: '',
        },
    });
    const {
        control,
        formState: { errors },
    } = phoneNumberLoginMethods;
    const [emailLoginMutation] = useMutation(PHONE_NUMBER_LOGIN_MUTATION);
    const onSubmitPhoneNumberLogin: SubmitHandler<PhoneCredentials> = async (data) => {
        try {
            const { password } = data;
            const phoneNumber = data.phoneNumber.replace(/\s/g, '');
            const response = await emailLoginMutation({
                variables: { password, phoneNumber },
            });
            const userData = JSON.stringify(response.data);
            localStorage.setItem("userData", userData);
            setOpenSuccess(true);
            setTimeout(() => dispatch(login()), 2000);
            phoneNumberLoginMethods.reset({ phoneNumber: '', password: '' });
            phoneNumberLoginMethods.formState.isSubmitSuccessful = false;
        } catch (error) {
            const { message } = error;
            setErrorMessage(message);
            setOpenAlert(true);
            phoneNumberLoginMethods.formState.isSubmitSuccessful = false;
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
                onSubmit={onSubmitPhoneNumberLogin}
                initialValues={{ phoneNumber: '', password: '' }}
                sx={{ display: "grid" }}
                submitValue={t('authentication.login.login')}
                methods={phoneNumberLoginMethods}
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
                <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <CustomTelInput onChange={onChange} value={value} error={errors['phoneNumber'] ? errors['phoneNumber']?.message : ''} />
                    )}
                />
                <Typography color="red">{errors['phoneNumber'] ? (errors['phoneNumber']?.message as ReactNode) : ''}</Typography>
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
                title={'Congratulations!'}
                description={'You’ve logged in successfully'}
                handleClose={handleCloseSuccess}
                icon={<Icons.SUCCESS style={{ margin: '15px 0' }} />}
            />
        </>
    )
}
export default PhoneNumberLogin;