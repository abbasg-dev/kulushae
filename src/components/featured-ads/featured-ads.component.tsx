import { useState } from 'react';
import { Box, Button, Grid, Stack, Typography, Card, CardContent, useMediaQuery, styled } from '@mui/material';
import { formatNumberWithCommas } from 'helpers/global';
import Images from 'assets/images';
import Icons from 'assets/icons';
import IconWithBadge from 'components/icon-with-badge/icon-with-badge.component';
import SectionTitle from 'components/section-title/section-title.component';
import { AdProps, AdCardProps } from 'interfaces/featured-ads.model';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme: Theme) => ({
    cardRoot: {
        width: 'unset',
        transition: "box-shadow 0.3s",
        cursor: 'pointer',
        borderRadius: "18px !important",
        background: theme.palette.secondary.main,
        textAlign: "center",
        height: 'unset',
        boxShadow: '0px 4px 74px 0px rgba(0, 0, 0, 0.10) !important',
        '& svg': {
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
        }
    },
    headline: {
        fontStyle: 'normal',
        lineHeight: 'normal !important',
        fontWeight: 'bold !important',
        textAlign: 'start',
        marginTop: '12px!important',
        marginBottom: '0!important',
    },
    mobileMedia: {
        width: 'unset !important',
        maxWidth: 'unset !important'
    }
}));
const AdCard: React.FC<AdCardProps> = (props: AdCardProps) => {
    const { classes, data, verifiedRankStyles, locationStyles, featuredStyles, bedroomBathroomAspectStyles, statusStyles, isMobile } = props;
    return (
        <Card className={classes.cardRoot} sx={{
            borderTopRightRadius: '5px!important',
            borderTopLeftRadius: '5px!important'
        }}>
            <Box position={'relative'}>
                <IconWithBadge
                    title={data?.status}
                    badgeStyle={statusStyles}
                />
                {data?.adBanner}
            </Box>
            <CardContent sx={{ padding: isMobile ? '16px 0px' : '16px', display: 'grid' }}>
                <Stack direction={'row'} display={'flex'}>
                    <IconWithBadge
                        icon={<Icons.VERIFIED className={isMobile ? classes.mobileMedia : ''} />}
                        title={data?.verified && 'Verified'}
                        badgeStyle={verifiedRankStyles}
                    />
                    {!isMobile && (
                        <IconWithBadge
                            icon={<Icons.RANK />}
                            title={data?.rank}
                            badgeStyle={verifiedRankStyles}
                        />
                    )}
                    <IconWithBadge
                        title={data?.featured && 'Featured'}
                        badgeStyle={featuredStyles}
                    />
                </Stack>
                <Box padding={isMobile && '0 8px'} textAlign={'start'}>
                    <Box className={classes.headline}>
                        <Typography 
                            fontWeight={'bold'}
                            fontSize={isMobile ? 15 : 'unset'}
                        >{`${formatNumberWithCommas(data?.price)} AED / Yearly`}</Typography>
                        <Typography fontSize={isMobile ? 15 : 'unset'}>{data?.title}</Typography>
                    </Box>
                    <IconWithBadge
                        icon={<Icons.LOCATION className={isMobile ? classes.mobileMedia : ''} />}
                        title={data?.location}
                        badgeStyle={locationStyles}
                    />
                </Box>
                <Stack direction={'row'} display={'flex'} sx={{ clear: 'inline-start !important', gap: isMobile ? 0 : '15px!important' }}>
                    <IconWithBadge
                        icon={<Icons.BEDROOM className={isMobile ? classes.mobileMedia : ''} />}
                        title={data?.bedroom}
                        badgeStyle={bedroomBathroomAspectStyles}
                    />
                    <IconWithBadge
                        icon={<Icons.BATHROOM className={isMobile ? classes.mobileMedia : ''} />}
                        title={data?.bathroom}
                        badgeStyle={bedroomBathroomAspectStyles}
                    />
                    <IconWithBadge
                        icon={<Icons.ASPECT_RATIO className={isMobile ? classes.mobileMedia : ''} />}
                        title={formatNumberWithCommas(data?.squareFeet)}
                        badgeStyle={bedroomBathroomAspectStyles}
                    />
                </Stack>
            </CardContent>
        </Card>
    )
}
const CustomGridContainer = styled(Grid)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
}));
const FeaturedAds = () => {
    const { t } = useTranslation('common');
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const initialAdsToShow = 8;
    const [adsToShow, setAdsToShow] = useState<number>(initialAdsToShow);
    const adsList: AdProps[] = [
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'New Orleans is located at the place where the Mississippi River empties into the Gulf of Mexico',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        },
        {
            verified: true,
            rank: 'Member',
            featured: true,
            price: 55000,
            title: 'Penthouse available in Dubai',
            location: 'Creek Horizon Tower 2',
            bedroom: 3,
            bathroom: 2,
            squareFeet: 2241,
            adBanner: <Images.AD_BANNER />,
            status: 'For Rent'
        }
    ]
    const handleLoadMoreAds = () => {
        setAdsToShow(adsToShow + 4);
    };
    const verifiedRankStyles = {
        display: 'inline-flex',
        gap: '5px!important',
        borderRadius: 100,
        background: '#EFEFEF',
        alignItems: 'center',
        fontSize: 11,
        padding: '2px 7px',
        margin: isMobile ? '0 5px' : '0 5px 0 0'

    };
    const featuredStyles = {
        padding: '5px 9px',
        borderRadius: 100,
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 11
    };
    const locationStyles = {
        display: 'inline-flex',
        gap: '5px!important',
        alignItems: 'center',
        fontSize: 11,
        padding: '2px 0',
        margin: '8px 0px!important',
        float: 'left',
    };
    const bedroomBathroomAspectStyles = {
        borderRadius: '4px!important',
        border: '1px solid #EFEFEF',
        display: isMobile ? 'block' : 'inline-flex',
        gap: '8px!important',
        alignItems: 'center',
        fontSize: 11,
        padding: '4px 15px',
        margin: '0px 5px !important',
    };
    const loadMoreStyles = {
        padding: '13px 60px',
        borderRadius: 50,
        background: theme.palette.common.white,
        color: theme.palette.common.black,
        boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.06)',
        fontSize: 14,
        textTransform: 'capitalize',
        border: 'unset',
    }
    const statusStyles = {
        padding: '5px 9px',
        position: 'absolute',
        top: '12%',
        width: 'max-content',
        left: 0,
        borderRadius: '0px 3px 3px 0px',
        background: theme.palette.common.white,
        fontSize: 11
    }
    return (
        <>
            <Stack width="100%" margin={isMobile ? '40px 0' : 'unset'} position={"relative"}>
                <Box sx={{ placeSelf: "center" }}>
                    <SectionTitle fontSize={35} fontWeight={700} title={t('featuredAds.title')} />
                </Box>
            </Stack>
            <CustomGridContainer container spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                maxWidth={1280}
                margin={isMobile ? 'unset' : '85px auto'}
                width={!isMobile ? '%80' : ''}
            >
                {adsList && adsList.slice(0, adsToShow).map((ad: AdProps, index: number) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        padding={!isMobile ? '7px' : '10px 5px;'}
                        maxWidth={'unset!important'}
                        width={isMobile ? '50vw' : 'unset'}
                        style={{
                            borderTopRightRadius: isMobile ? 5 : '',
                            borderTopLeftRadius: isMobile ? 5 : '',
                        }}
                    >
                        <AdCard
                            classes={classes}
                            data={ad}
                            verifiedRankStyles={verifiedRankStyles}
                            featuredStyles={featuredStyles}
                            locationStyles={locationStyles}
                            bedroomBathroomAspectStyles={bedroomBathroomAspectStyles}
                            statusStyles={statusStyles}
                            isMobile={isMobile}
                        />
                    </Grid>
                ))}
            </CustomGridContainer>
            {adsToShow < adsList.length ? (
                <Box textAlign="center" margin={isMobile ? '40px auto 0 auto' : 'unset'}>
                    <Button sx={loadMoreStyles} variant="outlined" size="large" onClick={handleLoadMoreAds}>
                        {t('featuredAds.load')}
                    </Button>
                </Box>
            ) : (
                <Box textAlign="center">
                    <Typography variant="body1">
                        No more Featured Ads
                    </Typography>
                </Box>
            )}
        </>
    );
}
export default FeaturedAds; 