import { useState } from 'react';
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import SectionTitle from 'components/section-title/section-title.component';
import ControlledSelect from "components/select/select.component";
import ControlledButton from 'components/button/button.component';
// import InputField from 'components/form-input/form-input.component';
import { vehicles } from 'data';
import Icons from 'assets/icons';
import Images from 'assets/images';
import { useTheme } from '@mui/material';
import { CSSProperties } from '@mui/styles';
import { useTranslation } from 'react-i18next';
const Hero = () => {
    const { i18n, t } = useTranslation('common');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    let getStartedStyles: CSSProperties = {
        textAlign: 'center',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        height: 67,
        zIndex: 2,
        textWrap: 'nowrap',
        position: 'relative',
        textTransform: 'capitalize',
        fontSize: 18,
        borderRadius: 41,
        boxShadow: '0px 4px 32px 0px rgba(104, 104, 104, 0.99)',
        padding: '17px 50px',
        marginLeft: i18n.language === 'en' ? 'auto' : 'unset',
        marginRight: i18n.language === 'ar' ? 'auto' : 'unset',
    }
    const [selectedValue, setSelectedValue] = useState({
        vehicles: '',
    });
    const [newOrUsedVehicle, setNewOrUsedVehicle] = useState<string>('')
    const onSelectChange = (type) => (value) => {
        setSelectedValue((prevSelectedValue) => ({
            ...prevSelectedValue,
            [type]: value
        }));
    };
    const onChangeVehicle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewOrUsedVehicle(event.target.value);
    }
    return (
        <Stack
            width="100%"
            marginTop={isMobile ? '1rem' : '4rem'}
            position={'relative'}
        >
            <Box
                position={'absolute'}
                top={'50%'}
                left={0}
                sx={{ transform: 'translate(0, -50%)' }}
            ><Icons.SM_HALF_CIRCLE /></Box>
            <Stack
                direction="row"
                display='flex'
                alignItems="center"
                justifyContent="space-between"
            >
                <Box flex={1} display={'flex'}>
                    <Box position={'relative'} left={66} top={20}><Icons.SM_CUBE /></Box>
                    <Box marginLeft={'auto'}><Icons.SM_CIRCLES /></Box>
                </Box>
                <Box flex={1}></Box>
            </Stack>
            <Stack
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                maxWidth={1280}
                margin={isMobile ? 'unset' : '0 auto'}
                padding={isMobile ? '5px !important' : 'unset'}
                width="100%"
            >
                <Box flex={1} width={isMobile ? '100%' : '50%'}>
                    <SectionTitle
                        fontSize={isMobile ? 40 : 60}
                        fontWeight={isMobile ? 500 : 600}
                        title={t('hero.intro')}
                    />
                    <Box marginTop={isMobile ? '40px !important' : '70px !important'} width={!isMobile && i18n.language === 'en' ? '90%' : !isMobile && i18n.language === 'ar' ? '85%' : '100%'}>
                        <Stack
                            direction="row"
                            display='flex'
                            padding={isMobile ? 'unset' : '12px 0px !important'}
                            borderRadius={90}
                            sx={{ background: '#F3F3F3' }}
                            width={isMobile ? '100%' : 'unset'}
                        >
                            <ControlledSelect
                                data={vehicles}
                                type="vehicles"
                                handleChange={onSelectChange('vehicles')}
                                value={selectedValue.vehicles}
                                label={t('hero.vehicles')}
                            ></ControlledSelect>
                            <Box padding={'0 12px'} paddingLeft={!isMobile && i18n.language === 'ar' ? '' : 0} alignSelf="center"><Icons.SEARCH /></Box>
                            <ControlledButton customStyle={getStartedStyles} value={t('hero.start')} />
                        </Stack>
                    </Box>
                    <Box
                        position={'relative'}
                        right={isMobile ? 'unset' : !isMobile && i18n.language === 'ar' ? 'unset' : 95}
                        bottom={15}
                        textAlign={!isMobile && i18n.language === 'ar' ? 'center' : 'unset'}
                    >
                        <Typography
                            style={{
                                textAlignLast: isMobile ? 'unset' : 'center'
                            }}
                            position={'relative'}
                            top={isMobile && i18n.language === 'ar' ? 50 :  isMobile && i18n.language === 'en' ? 55 : 40}
                            left={isMobile && i18n.language === 'ar' ? -12 : isMobile && i18n.language === 'en' ? 5 : 50}
                            fontSize={isMobile ? 'unset' : 23}
                            fontFamily={'Nanum Pen, sans-serif'}
                        >{t('hero.get-started')}</Typography>
                        <Box style={{
                            float: !isMobile && i18n.language === 'en' ? 'inline-end' : isMobile ? 'unset' : 'unset',
                            width: isMobile && '80%',
                            margin: isMobile && '0 auto',
                            display: isMobile && 'flex',
                            justifyContent: isMobile && 'center',
                            position: !isMobile && i18n.language === 'ar' ? 'relative' : 'unset',
                            transform: i18n.language === 'ar'? 'rotateX(0deg) rotateY(170deg)' : 'unset',
                            right: !isMobile && i18n.language === 'ar'? 70 : 'unset',
                        }}>
                            <Images.GET_STARTED />
                        </Box>
                    </Box>
                </Box>
                {!isMobile && (
                    <Box flex={1} width="50%" textAlign={i18n.language === 'en' ? 'right' : 'left'}>
                        <Images.SUPPORT />
                    </Box>
                )}
            </Stack>
        </Stack>
    )
}

export default Hero;