import FormBox from "components/form-box/form-box.component";
import FormInput from "components/form-input/form-input.component";
import { useTranslation } from "react-i18next";
import Icons from "assets/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterByEmail } from "interfaces/authentication.model";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useState } from "react";
import { Alert, Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import { useMutation } from '@apollo/client';
import { EMAIL_REGISTER_MUTATION } from "api/queries/auth.queries";
import Toaster from "components/toaster/toaster.component";
const EmailRegister = () => {
    const { t } = useTranslation("common");
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const EmailRegisterSchema = yup.object().shape({
        firstName: yup.string().required(t('authentication.register.first_name_required')),
        lastName: yup.string().required(t('authentication.register.last_name_required')),
        email: yup.string().email(t('authentication.login.email_format')).required(t('authentication.login.email_required')),
        password: yup.string().required(t('authentication.login.password_required'))
    })
    const emailRegisterMethods = useForm<RegisterByEmail>({
        resolver: yupResolver<yup.AnyObjectSchema>(EmailRegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });
    const {
        control,
        formState: { errors },
    } = emailRegisterMethods;
    const [emailRegisterMutation] = useMutation(EMAIL_REGISTER_MUTATION);
    const onSubmitEmailRegister: SubmitHandler<RegisterByEmail> = async (data) => {
        try {
            const { firstName, lastName, password, email } = data;
            const response = await emailRegisterMutation({
                variables: { firstName, lastName, password, email },
            });
            const userData = JSON.stringify(response.data);
            localStorage.setItem("userData", userData);
            setOpenSuccess(true);
            emailRegisterMethods.reset({ firstName: '', lastName: '', email: '', password: '' });
            emailRegisterMethods.formState.isSubmitSuccessful = false;
        } catch (error) {
            const { message } = error;
            setErrorMessage(message);
            setOpenAlert(true);
            emailRegisterMethods.formState.isSubmitSuccessful = false;
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
                onSubmit={onSubmitEmailRegister}
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                sx={{ display: "grid" }}
                submitValue={t('authentication.register.sign_up')}
                methods={emailRegisterMethods}
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
                title={'Congratulations!'}
                description={'You’ve Successfully Registered!'}
                handleClose={handleCloseSuccess}
                icon={<Icons.SUCCESS style={{ margin: '15px 0' }} />}
            />
        </>
    )
}
export default EmailRegister;