import React, { useEffect } from 'react';
import { Box, Card, CardContent, Stack, Typography, useMediaQuery } from "@mui/material";
import SectionTitle from 'components/section-title/section-title.component';
// import { formatNumberWithCommas } from 'helpers/global';
import { CategoriesListProps, CategoriesProps, CategoryCardProps } from 'interfaces/categories.model';
import Icons from 'assets/icons';
import Images from 'assets/images';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { GET_CATEGORIES } from 'api/queries/categories.queries';
import { useQuery } from '@apollo/client';
export const useCategoryCardStyles = makeStyles((theme: Theme) => ({
    cardRoot: {
        maxWidth: "250px",
        transition: "box-shadow 0.3s",
        cursor: 'pointer',
        borderRadius: "20px !important",
        background: theme.palette.secondary.main,
        boxShadow: "0px 4px 44px 0px rgba(0, 0, 0, 0.07) !important",
        textAlign: "center",
        height: '195px',
        '&:hover': {
            background: theme.palette.primary.main,
            '& p': {
                color: theme.palette.secondary.main,
            },
            '& $spanStyle': {
                color: theme.palette.secondary.main,
            },
            '& $icon': {
                backgroundColor: theme.palette.secondary.main,
            },
        }
    },
    disabledCard: {
        pointerEvents: 'none',
        opacity: 0.5
    },
    cardContent: {
        position: "relative",
        height: '100% !important',
        width: '100% !important'
    },
    spanStyle: {
        fontSize: 14,
        fontWeight: 400,
        position: 'relative',
        top: 10
    },
    icon: {
        borderRadius: "50%",
        height: 80,
        width: 80,
        display: "flex",
        justifyContent: "center",
        padding: "25px 0",
        margin: "0px auto 15px",
        alignItems: "center"
    }
}));
export const CategoryCard: React.FC<CategoryCardProps> = (props: CategoryCardProps) => {
    const { data, classes } = props;
    const isDisabled = !data?.active_for_listing || false;
    console.log(data?.image)
    return (
        <Card className={`${classes?.cardRoot} ${isDisabled ? classes?.disabledCard : ''}`}>
            <CardContent className={classes?.cardContent}>
                <Box height={'100%'} width={'100%'} textAlign={'center'} display={'grid'} alignContent={'center'} justifyContent={'center'}>
                    <Box className={classes?.icon}>
                        {/* {data?.image.includes("undefined") ? <Icons.NO_IMAGE /> : data?.image } */}
                        <Icons.NO_IMAGE />
                    </Box>
                    <Typography fontSize={18} fontWeight={600} lineHeight={'normal'}>
                        {data?.title}
                        {/* <br />
                        <span className={classes.spanStyle}>{`${formatNumberWithCommas(data?.adds)} Adds`}</span> */}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
const Categories = () => {
    const { t } = useTranslation('common');
    const theme = useTheme();
    const classes = useCategoryCardStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const initialCategoriesToShow = 12;
    const {
        loading: isLoadingCategories,
        error: errorLoadingCategories,
        data: categoriesList
    } = useQuery<CategoriesListProps>(GET_CATEGORIES, {
        variables: {
            showOnScreen: 1,
        },
    });
    useEffect(() => {
        if (errorLoadingCategories) {
            console.log('error: ', errorLoadingCategories)
        }
    }, [errorLoadingCategories])
    useEffect(() => {
        console.log('loading')
    }, [isLoadingCategories])
    return (
        <>
            <Stack width="100%" margin={isMobile ? '40px 0' : '135px 0 0 0'} position={"relative"}>
                <Box sx={{ placeSelf: "center" }}>
                    <SectionTitle fontSize={35} fontWeight={700} title={t('categories.title')} />
                </Box>
                <Box position={'absolute'} left={0} sx={{ transform: 'translate(0, 25%)' }}><Images.INTERSECT_LEFT /></Box>
                <Box position={'absolute'} right={0} sx={{ transform: 'translate(0, 65%)' }}><Images.INTERSECT_RIGHT /></Box>
            </Stack>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                maxWidth: 1200,
                margin: isMobile ? '45px' : '50px auto',
                width: !isMobile ? '50%' : 'unset'
            }}>
                {categoriesList && categoriesList?.categories?.slice(0, initialCategoriesToShow).map((card: CategoriesProps, index: number) => (
                    <div key={index} style={{ flex: isMobile ? '50%' : '25%', padding: '8px' }}>
                        <CategoryCard classes={classes} data={card} />
                    </div>
                ))}
            </div>
        </>
    );
};
export default Categories;