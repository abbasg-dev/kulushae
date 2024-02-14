import FormBox from "components/form-box/form-box.component";
import FormInput from "components/form-input/form-input.component";
import { useTranslation } from "react-i18next";
import Icons from "assets/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ForgetPassProps } from "interfaces/authentication.model";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useState } from "react";
import { Alert, Box, Collapse, IconButton, Typography } from "@mui/material";
import Toaster from "components/toaster/toaster.component";
import { useMutation } from "@apollo/client";
import { USER_VERIFICATION_MUTATION } from "api/queries/auth.queries";
const ByEmail = () => {
    const { t } = useTranslation("common");
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const ByEmailSchema = yup.object().shape({
        email: yup.string().email(t('authentication.login.email_format')).required(t('authentication.login.email_required')),
    })
    const byEmailMethods = useForm<ForgetPassProps>({
        resolver: yupResolver<yup.AnyObjectSchema>(ByEmailSchema),
        defaultValues: {
            email: ''
        },
    });
    const {
        control,
        formState: { errors },
    } = byEmailMethods;
    const [forgetPasswordByEmailMutation] = useMutation(USER_VERIFICATION_MUTATION);
    const onSubmitByEmail: SubmitHandler<ForgetPassProps> = async (data) => {
        const response = await forgetPasswordByEmailMutation({
            variables: {
                value: data?.email,
                type: 'email'
            },
        });
        const isExist = response?.data?.userVerfication?.isExist;
        try {
            if (isExist) {
                setOpenSuccess(true);
                byEmailMethods.reset({ email: '' });
                byEmailMethods.formState.isSubmitSuccessful = false;
            } else {
                setErrorMessage(t('authentication.register.otp.user_not_exist'));
                setOpenAlert(true);
                byEmailMethods.formState.isSubmitSuccessful = false;
            }
        } catch (error) {
            const { message } = error;
            setErrorMessage(message);
            setOpenAlert(true);
            byEmailMethods.formState.isSubmitSuccessful = false;
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
                onSubmit={onSubmitByEmail}
                initialValues={{ email: '' }}
                sx={{ display: "grid" }}
                submitValue={t('authentication.forget_password.continue')}
                methods={byEmailMethods}
                submitStyle={{
                    borderRadius: 40,
                    background: '#000',
                    color: '#FFF',
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
            </FormBox>
            <Toaster
                open={openSuccess}
                title={`${t('common.great')}!`}
                description={t('authentication.forget_password.email_sent_msg')}
                handleClose={handleCloseSuccess}
                icon={<Icons.AGREE style={{ margin: '15px 0' }} />}
            />
        </>
    )
}
export default ByEmail;