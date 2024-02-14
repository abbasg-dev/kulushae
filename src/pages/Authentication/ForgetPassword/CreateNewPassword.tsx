import FormBox from "components/form-box/form-box.component";
import FormInput from "components/form-input/form-input.component";
import { useTranslation } from "react-i18next";
import Icons from "assets/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreatePassProps } from "interfaces/authentication.model";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useState } from "react";
import { Alert, Box, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import Toaster from "components/toaster/toaster.component";
import BackTo from "components/back-to/back-to.component";
import * as ROUTES from 'constants/routes';
import client from "api/api";
import { UPDATE_PASSWORD_BY_EMAIL_MUTATION } from "api/queries/auth.queries";
import { useNavigate } from 'react-router-dom';
const CreateNewPassword = () => {
    const { t } = useTranslation("common");
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const ByEmailSchema = yup.object().shape({
        newPassword: yup.string().required(t('authentication.create_password.new_password_required')),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], t('authentication.create_password.passwords_must_match'))
            .required(t('authentication.create_password.confirm_password_required'))
    })
    const createNewPasswordMethods = useForm<CreatePassProps>({
        resolver: yupResolver<yup.AnyObjectSchema>(ByEmailSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        },
    });
    const {
        control,
        formState: { errors },
    } = createNewPasswordMethods;
    const onSubmitCreateNewPassword: SubmitHandler<CreatePassProps> = async (data) => {
        const response = await client.mutate({
            mutation: UPDATE_PASSWORD_BY_EMAIL_MUTATION,
            variables: {
                password: data?.confirmPassword
            }
        });
        try {
            if (response?.data) {
                setOpenSuccess(true);
                createNewPasswordMethods.reset({ newPassword: '', confirmPassword: '' });
                createNewPasswordMethods.formState.isSubmitSuccessful = false;
                localStorage.clear();
                navigate(ROUTES.LOGIN);
            } else {
                setErrorMessage(t('update_pass_failed'));
                setOpenAlert(true);
            }
        } catch (error) {
            const { message } = error;
            setErrorMessage(message);
            setOpenAlert(true);
            createNewPasswordMethods.formState.isSubmitSuccessful = false;
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
            <Box sx={{ minHeight: "100vh" }}>
                <BackTo path={ROUTES.FORGET_PASSWORD} title={t('authentication.create_password.create_new_pass')} func="back" />
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
                        width: isMobile ? "100%" : '50%'
                    }}
                >
                    <FormBox
                        onSubmit={onSubmitCreateNewPassword}
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        sx={{ display: "grid" }}
                        submitValue={t('common.verify')}
                        methods={createNewPasswordMethods}
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
                        <Controller control={control} name={'newPassword'} render={({ field }) => (
                            <Box
                                display="flex"
                                borderRadius={'12px!important'}
                                padding="5px 10px"
                                alignItems="center"
                                gap={'10px!important'}
                                margin={'10px 0'}
                                border={errors['newPassword'] ? '1px solid red !important' : '1px solid rgba(0, 0, 0, 0.20)'}
                            >
                                <Box display="flex" alignItems="center">{<Icons.LOCK />}</Box>
                                <FormInput
                                    name='newPassword'
                                    required
                                    fullWidth
                                    placeholder={t('authentication.create_password.new_password')}
                                    type="password"
                                    {...field}
                                />
                            </Box>
                        )}
                        />
                        <Typography color="red">{errors['newPassword'] ? (errors['newPassword']?.message as ReactNode) : ''}</Typography>
                        <Controller control={control} name={'confirmPassword'} render={({ field }) => (
                            <Box
                                display="flex"
                                borderRadius={'12px!important'}
                                padding="5px 10px"
                                alignItems="center"
                                gap={'10px!important'}
                                margin={'10px 0'}
                                border={errors['confirmPassword'] ? '1px solid red !important' : '1px solid rgba(0, 0, 0, 0.20)'}
                            >
                                <Box display="flex" alignItems="center">{<Icons.LOCK />}</Box>
                                <FormInput
                                    name='confirmPassword'
                                    required
                                    fullWidth
                                    placeholder={t('authentication.create_password.confirm_password')}
                                    type="password"
                                    {...field}
                                />
                            </Box>
                        )}
                        />
                        <Typography color="red">{errors['confirmPassword'] ? (errors['confirmPassword']?.message as ReactNode) : ''}</Typography>
                    </FormBox>
                </Stack>
            </Box>
            <Toaster
                open={openSuccess}
                title={`${t('common.great')}!`}
                description={t('authentication.create_password.new_password_created')}
                handleClose={handleCloseSuccess}
                icon={<Icons.AGREE style={{ margin: '15px 0' }} />}
            />
        </>
    )
}
export default CreateNewPassword;