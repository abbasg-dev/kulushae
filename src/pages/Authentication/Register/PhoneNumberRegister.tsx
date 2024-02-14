import { ReactNode, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import FormBox from "components/form-box/form-box.component";
import FormInput from "components/form-input/form-input.component";
import CustomTelInput from "components/tel-input/tel-Input.component";
import Toaster from "components/toaster/toaster.component";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterByPhoneNumber } from "interfaces/authentication.model";
import * as ROUTES from 'constants/routes';
import Icons from "assets/icons";
const PhoneNumberRegister = () => {
    const { t } = useTranslation("common");
    const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const EmailRegisterSchema = yup.object().shape({
        firstName: yup.string().required(t('authentication.register.first_name_required')),
        lastName: yup.string().required(t('authentication.register.last_name_required')),
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
    const phoneNumberRegisterMethods = useForm<RegisterByPhoneNumber>({
        resolver: yupResolver<yup.AnyObjectSchema>(EmailRegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
        },
    });
    const {
        control,
        formState: { errors },
    } = phoneNumberRegisterMethods;
    const onSubmitPhoneNumberRegister: SubmitHandler<RegisterByPhoneNumber> = async (data) => {
        try {
            const { firstName, lastName, password } = data;
            const phoneNumber = data.phoneNumber.replace(/\s/g, '');
            setOpenSuccess(true);
            phoneNumberRegisterMethods.reset({ firstName: '', lastName: '', phoneNumber: '', password: '' });
            phoneNumberRegisterMethods.formState.isSubmitSuccessful = false;
            setTimeout(() => {
                setOpenSuccess(false)
                navigate(ROUTES.OTP_CODE, { 
                    state: { 
                        data: {
                            phoneNumber: phoneNumber, 
                            firstName: firstName, 
                            lastName: lastName, 
                            password: password,
                            key: 'reg-by-phone'
                        } 
                    }
                })
            }, 2000);
        } catch (error) {
            const { message } = error;
            setErrorMessage(message);
            setOpenAlert(true);
            phoneNumberRegisterMethods.formState.isSubmitSuccessful = false;
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
                onSubmit={onSubmitPhoneNumberRegister}
                initialValues={{ firstName: '', lastName: '', phoneNumber: '', password: '' }}
                sx={{ display: "grid" }}
                submitValue={t('authentication.register.sign_up')}
                methods={phoneNumberRegisterMethods}
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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} paddingTop={'unset !important'}>
                        <Controller control={control} name={'firstName'} render={({ field }) => (
                            <Box
                                display="flex"
                                borderRadius={'12px!important'}
                                padding="5px 10px"
                                alignItems="center"
                                gap={'10px!important'}
                                margin={'10px 0'}
                                border={errors['firstName'] ? '1px solid red !important' : '1px solid rgba(0, 0, 0, 0.20)'}
                            >
                                <Box display="flex" alignItems="center">{<Icons.USER_DATA />}</Box>
                                <FormInput
                                    name='firstName'
                                    required
                                    fullWidth
                                    placeholder={t('authentication.register.first_name')}
                                    type="text"
                                    {...field}
                                />
                            </Box>
                        )}
                        />
                        <Typography color="red">{errors['firstName'] ? (errors['firstName']?.message as ReactNode) : ''}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} paddingTop={'unset !important'}>
                        <Controller control={control} name={'lastName'} render={({ field }) => (
                            <Box
                                display="flex"
                                borderRadius={'12px!important'}
                                padding="5px 10px"
                                alignItems="center"
                                gap={'10px!important'}
                                margin={'10px 0'}
                                border={errors['lastName'] ? '1px solid red !important' : '1px solid rgba(0, 0, 0, 0.20)'}
                            >
                                <Box display="flex" alignItems="center">{<Icons.USER_DATA />}</Box>
                                <FormInput
                                    name='lastName'
                                    required
                                    fullWidth
                                    placeholder={t('authentication.register.last_name')}
                                    type="lastName"
                                    {...field}
                                />
                            </Box>
                        )}
                        />
                        <Typography color="red">{errors['lastName'] ? (errors['lastName']?.message as ReactNode) : ''}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} paddingTop={'unset !important'}>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <CustomTelInput onChange={onChange} value={value} error={errors['phoneNumber'] ? errors['phoneNumber']?.message : ''} />
                            )}
                        />
                        <Typography color="red">{errors['phoneNumber'] ? (errors['phoneNumber']?.message as ReactNode) : ''}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} paddingTop={'unset !important'}>
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
                    </Grid>
                </Grid>
            </FormBox>
            <Toaster
                open={openSuccess}
                description={
                    <Box color="#212121" fontSize={18}>
                        <Typography component={'span'} fontWeight={700} marginRight={1} display="inline">
                            {t('authentication.register.otp_code')}
                        </Typography>
                        <Typography component={'span'} style={{ display: "inline" }}>
                            {t('authentication.register.otp_sent_msg')}
                        </Typography>
                    </Box>
                }
                handleClose={handleCloseSuccess}
            />
        </>
    )
}
export default PhoneNumberRegister;