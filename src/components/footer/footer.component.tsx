import React from 'react';
import { Grid, List, ListItem, Typography, Box, Stack, useMediaQuery } from '@mui/material';
import { Connect } from 'interfaces/footer.model';
import Icons from 'assets/icons';
import './footer.scss';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomizedButton from 'components/customized-button/customized-button.component';
const store: Connect[] = [
    {
        name: 'Google Play',
        logo: <Icons.GOOGLE_PLAY />,
    },
    {
        name: 'App Store',
        logo: <Icons.APPLE />,
    },
];
const socialNetwork: Connect[] = [
    {
        name: 'Facebook',
        logo: <Icons.FACEBOOK />,
    },
    {
        name: 'Twitter',
        logo: <Icons.TWITTER />,
    },
    {
        name: 'Instagram',
        logo: <Icons.INSTAGRAM />,
    },
    {
        name: 'Youtube',
        logo: <Icons.YOUTUBE />,
    },
    {
        name: 'LinkedIn',
        logo: <Icons.LINKEDIN />,
    },
    {
        name: 'Whatsapp',
        logo: <Icons.WHATSAPP />,
    },
];

const Footer: React.FC = () => {
    const { t } = useTranslation('common');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box component="footer" sx={{ py: 4, px: { xs: 4, md: 14 }, position: "relative", overflow: "hidden" }}>
            <Grid container spacing={1} justifyContent='center' className="top">
                <Box className="pages" display={isMobile ? 'block' : 'flex'} flexDirection={!isMobile ? 'row' : 'unset'} alignItems='baseline'>
                    <List sx={{ width: '100%', maxWidth: isMobile ? 'unset' : 204, bgcolor: 'background.paper', position: 'relative', top: 15 }}>
                        <Box sx={{ textAlignLast: 'left'}}>
                            <Icons.LOGO />
                        </Box>
                        <ListItem sx={{ textAlign: 'start' }}>{t('footer.location')}</ListItem>
                    </List>
                    <Box display={'flex'} width={'100%'} gap={isMobile ? '30px !important' : 'unset'}>
                        <List style={{ margin: isMobile ? 'unset' : '0 45px' }}>
                            <Typography width={'max-content'}>{t('footer.supports.title')}</Typography>
                            <ListItem>{t('header.contact')}</ListItem>
                            <ListItem>{t('footer.supports.faqs')}</ListItem>
                            <ListItem>{t('footer.supports.pricing-plans')}</ListItem>
                            <ListItem>{t('footer.supports.sitemap')}</ListItem>
                        </List>
                        <List style={{ margin: isMobile ? 'unset' : '0 45px' }}>
                            <Typography width={'max-content'}>{t('footer.quick-links.title')}</Typography>
                            <ListItem>{t('header.about')}</ListItem>
                            <ListItem sx={{ boxShadow: `0px -1px 0px 0px ${theme.palette.common.black} inset`, width: 'max-content' }}>{t('footer.quick-links.get-membership')}</ListItem>
                            <ListItem>{t('footer.quick-links.post-ads')}</ListItem>
                            <ListItem>{t('footer.quick-links.blog')}</ListItem>
                        </List>
                        <List style={{ margin: isMobile ? 'unset' : '0 45px' }}>
                            <Typography width={'max-content'}>{t('header.category')}</Typography>
                            <ListItem>{t('footer.category.mobile')}</ListItem>
                            <ListItem>{t('footer.category.electronics')}</ListItem>
                            <ListItem>{t('hero.vehicles')}</ListItem>
                            <ListItem>{t('footer.category.property')}</ListItem>
                        </List>
                    </Box>
                    <Box className="our-app">
                        <Typography width={'max-content'}>{t('footer.download.title')}</Typography>
                        <Box display='flex' justifyContent='space-between' margin='33px 0px 20px 0px;'>
                            {store.map((item: Connect, index: number) => (
                                <Box key={index}>
                                    <CustomizedButton
                                    {...item}
                                    name={item?.name === 'Google Play' ? t('footer.download.google-play') : item?.name === "App Store" ? t('footer.download.app-store') : ''}
                                    title={t('footer.download.get-now')}
                                    logo={item?.logo}
                                    btnStyle={{
                                        borderRadius: 8,
                                        border: '1px solid var(--grayscale-50, #EBEEF7)',
                                        boxShadow: '0px 12px 48px 0px rgba(0, 44, 109, 0.10)',
                                        padding: 10,
                                        lineHeight: 'unset',
                                        marginRight: '7px !important',
                                        gap: 15,
                                        color: 'var(--grayscale-500, #767E94)',
                                        textTransform: 'capitalize' 
                                    }}  
                                />
                                </Box>
                            ))}
                        </Box>
                        <Box display='flex' alignItems='center' position='relative' className="social-bar">
                            {socialNetwork.map((item, index) => (
                                <Box key={index} className="social-icon">{item.logo}</Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: isMobile ? 'center' : 'normal', md: 'space-evenly' }}
                flexWrap="wrap"
                padding='2rem 0'
                display='flex'
                alignItems='center'
                fontSize={14}
                textAlign={isMobile ? 'center' : 'unset'}
                margin={isMobile ? '0 auto' : 'unset'}
            >
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {`${t('title')} - ${t('footer.copyrights.classification')} © ${new Date().getFullYear()}. ${t('footer.copyrights.rights-reserved')}.`}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }} style={{marginLeft: isMobile ? 'unset' : '16px'}}>
                    {`${t('footer.copyrights.privacy-policy')} | ${t('footer.copyrights.terms-conditions')}`}
                </Typography>
            </Stack>
        </Box>
    );
};
export default Footer;