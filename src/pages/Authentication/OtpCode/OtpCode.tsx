import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/client';
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from "firebase/auth";
import FormBox from "components/form-box/form-box.component";
import CustomOTPInput from "components/custom-otp-input/custom-otp-input.component";
import ControlledButton from "components/button/button.component";
import Toaster from "components/toaster/toaster.component";
import { Alert, Box, Collapse, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { OtpData, RegisterByPhoneNumber } from "interfaces/authentication.model";
import { auth } from "includes/firebase";
import { USER_VERIFICATION_MUTATION, PHONE_NUMBER_REGISTER_MUTATION } from "api/queries/auth.queries";
import { login } from "store/slices/authSlice";
import Icons from "assets/icons";
import * as ROUTES from 'constants/routes';
const OtpCode = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const userData: RegisterByPhoneNumber = state?.data;
    const { t } = useTranslation("common");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const otpSchema = yup.object().shape({
        pin: yup.string()
            .matches(/^\d{6}$/, t('authentication.register.otp.otp_validate'))
            .required(t('authentication.register.otp.otp_required')),
    });
    const otpMethods = useForm<OtpData>({
        resolver: yupResolver<yup.AnyObjectSchema>(otpSchema),
        defaultValues: {
            pin: '',
        },
    });
    const {
        control,
        formState: { errors },
    } = otpMethods;
    const [seconds, setSeconds] = useState<number>(36);
    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [recaptchaToken, setRecaptchaToken] = useState<string>(null);
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);
    const pinLength = otpMethods.watch('pin')?.length || 0;
    const [userVerificationMutation] = useMutation(USER_VERIFICATION_MUTATION);
    const [phoneNumberRegisterMutation] = useMutation(PHONE_NUMBER_REGISTER_MUTATION);
    let recaptchaVerifier;
    const setUpRecaptha = async (number) => {
        recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
        );
        recaptchaVerifier.render();
        const result = await signInWithPhoneNumber(auth, number, recaptchaVerifier);
        setRecaptchaToken(result?.verificationId)
        return result
    }
    const onSubmitOtp: SubmitHandler<OtpData> = async (data) => {
        const response = await userVerificationMutation({
            variables: {
                value: userData?.phoneNumber,
                type: 'phone'
            },
        });
        const isExist = response?.data?.userVerfication?.isExist;
        if (userData?.key === 'reg-by-phone') {
            if (isExist) {
                setErrorMessage(t('authentication.register.otp.user_exist'));
                setOpenAlert(true);
            } else if (recaptchaToken) {
                const credential = PhoneAuthProvider.credential(recaptchaToken, data?.pin);
                signInWithCredential(auth, credential).then((userCredential) => userCredential)
                await phoneNumberRegisterMutation({
                    variables: {
                        phoneNumber: state?.data?.phoneNumber,
                        firstName: state?.data?.firstName,
                        lastName: state?.data?.lastName,
                        password: state?.data?.password,
                    },
                });
                const userData = JSON.stringify(response.data);
                localStorage.setItem("userData", userData);
                otpMethods.reset({ pin: '' });
                setOpenSuccess(true);
                setTimeout(() => {
                    handleCloseSuccess();
                    dispatch(login());
                }, 2000);
            }
        } else if (userData?.key === 'forget-pass-by-phone') {
            if (isExist) {
                navigate(ROUTES.CREATE_NEW_PASSWORD);
                const userData = JSON.stringify(response.data);
                localStorage.setItem("userData", userData);
            } else {
                setErrorMessage(t('authentication.register.otp.user_not_exist'));
                setOpenAlert(true);
            }
        } else {
            setErrorMessage(t('authentication.register.otp.something_wrong'));
            setOpenAlert(true);
        }
    }
    useEffect(() => {
        if (userData?.phoneNumber) {
            setUpRecaptha(userData?.phoneNumber)
        }
    }, [userData?.phoneNumber])
    const handleClose = () => { setOpenAlert(false) }
    const handleCloseSuccess = () => { setOpenSuccess(false) }
    const onResendCodeClick = (reloadRecaptcha = true) => {
        if (reloadRecaptcha && recaptchaVerifier) {
            recaptchaVerifier.reset();
            recaptchaVerifier.render();
        }
    };
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
                    <Typography
                        component="span"
                        color="#212121"
                        fontSize={16}
                        fontWeight={600}
                        margin={'45px 0 !important'}
                    >
                        {t('authentication.register.otp.verify_phone')}
                    </Typography>
                    <FormBox
                        onSubmit={onSubmitOtp}
                        initialValues={{ pin: '' }}
                        sx={{ display: "grid" }}
                        submitValue={t('common.verify')}
                        methods={otpMethods}
                        submitStyle={{
                            borderRadius: 40,
                            border: '1px solid #000',
                            background: pinLength === 6 ? '#000' : '#FFF',
                            color: pinLength === 6 ? '#FFF' : '#000',
                            fontSize: 14,
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            margin: '10px 0'
                        }}
                        disableSubmit={pinLength < 6}
                    >
                        <Box margin={'30px 0!important'}>
                            <Controller
                                name="pin"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <CustomOTPInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            isMobile={isMobile}
                                        />
                                    )
                                }}
                            />
                            <Typography color="red" margin="4px 16px !important">{errors['pin'] ? (errors['pin']?.message as ReactNode) : ''}</Typography>
                        </Box>
                        <div style={{ margin: isMobile ? '0 5px' : '0 1rem' }} id="recaptcha-container"></div>
                        <ControlledButton
                            customStyle={{
                                color: seconds > 0 ? "#212121" : 'blue',
                                fontSize: 16,
                                fontWeight: 600,
                                background: 'transparent',
                                border: 'unset',
                                boxShadow: 'unset',
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                                margin: isMobile ? '12px 5px' : '12px 1rem'
                            }}
                            value={<Typography component="span" dangerouslySetInnerHTML={{ __html: `${t('authentication.register.otp.resend_code')} ${seconds > 0 ? `${t('authentication.register.otp.in')} <span style="color: #000; font-weight: 700">${seconds}</span> ${t('authentication.register.otp.seconds')}` : ''}` }} />}
                            disabled={seconds > 0}
                            callBackFunc={() => onResendCodeClick(false)}
                        />
                    </FormBox>
                    <Link
                        style={{
                            textDecoration: "unset",
                            textTransform: "capitalize",
                            color: "#000",
                            fontSize: 14,
                            cursor: "pointer",
                            margin: "25px 0"
                        }}
                        to={ROUTES.HOME}
                    >{t('authentication.register.otp.home_redirect')}</Link>
                </Stack>
            </Box>
            <Toaster
                open={openSuccess}
                title={`${t('common.congratulations')}!`}
                description={t('authentication.register.register_success')}
                handleClose={handleCloseSuccess}
                icon={<Icons.SUCCESS style={{ margin: '15px 0' }} />}
            />
        </>
    );
}
export default OtpCode