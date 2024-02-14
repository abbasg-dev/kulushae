import FormBox from "components/form-box/form-box.component";
import { useTranslation } from "react-i18next";
import Icons from "assets/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ForgetPassProps } from "interfaces/authentication.model";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useState } from "react";
import { Alert, Collapse, IconButton, Typography } from "@mui/material";
import CustomTelInput from "components/tel-input/tel-Input.component"
import { useNavigate } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
const ByPhoneNumber = () => {
    const { t } = useTranslation("common");
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const byPhoneNumberSchema = yup.object().shape({
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
    })
    const byPhoneNumberMethods = useForm<ForgetPassProps>({
        resolver: yupResolver<yup.AnyObjectSchema>(byPhoneNumberSchema),
        defaultValues: {
            phoneNumber: ''
        },
    });
    const {
        control,
        formState: { errors },
    } = byPhoneNumberMethods;
    const onSubmitByPhoneNumber: SubmitHandler<ForgetPassProps> = async (data) => {
        try {
            const phoneNumber = data.phoneNumber.replace(/\s/g, '');
            byPhoneNumberMethods.reset({ phoneNumber: '' });
            byPhoneNumberMethods.formState.isSubmitSuccessful = false;
            navigate(ROUTES.OTP_CODE, {
                state: {
                    data: {
                        phoneNumber: phoneNumber,
                        key: 'forget-pass-by-phone'
                    }
                }
            });
        } catch (error) {
            const { message } = error;
            setErrorMessage(message);
            setOpenAlert(true);
            byPhoneNumberMethods.formState.isSubmitSuccessful = false;
        }
    }
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
                onSubmit={onSubmitByPhoneNumber}
                initialValues={{ phoneNumber: '' }}
                sx={{ display: "grid" }}
                submitValue={t('authentication.forget_password.continue')}
                methods={byPhoneNumberMethods}
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
                <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <CustomTelInput onChange={onChange} value={value} error={errors['phoneNumber'] ? errors['phoneNumber']?.message : ''} />
                    )}
                />
                <Typography color="red">{errors['phoneNumber'] ? (errors['phoneNumber']?.message as ReactNode) : ''}</Typography>
            </FormBox>
        </>
    )
}
export default ByPhoneNumber;