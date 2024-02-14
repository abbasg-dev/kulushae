import { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Box, Typography, useTheme } from "@mui/material";
import SectionTitle from "components/section-title/section-title.component";
import { CategoryCard, useCategoryCardStyles } from 'components/categories/categories.component';
import { CategoriesListProps, CategoriesProps } from 'interfaces/categories.model';
import { GET_CATEGORIES } from 'api/queries/categories.queries';
import * as ROUTES from 'constants/routes';
const PostAd = () => {
    const { t } = useTranslation('common');
    const theme = useTheme();
    const classes = useCategoryCardStyles(theme);
    const navigate = useNavigate();
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
            console.error('Error loading categories:', errorLoadingCategories);
        }
    }, [errorLoadingCategories])
    useEffect(() => {
        console.log('loading')
    }, [isLoadingCategories])
    const onClickCategory = (data: CategoriesProps) => {
        let path;
        switch (data?.title) {
            case 'Classified':
                path = ROUTES.CLASSIFIED;
                break;
            case 'Rent Property':
                path = ROUTES.RENT_PROPERTY;
                break;
            case 'Buy Property':
                path = ROUTES.BUY_PROPERTY;
                break;
            case 'Vehicle':
                path = ROUTES.VEHICLE;
                break;
            case 'Motors':
                path = ROUTES.MOTORS;
                break;
            case 'Travelling':
                path = ROUTES.TRAVELING;
                break;
            case 'Electronics':
                path = ROUTES.ELECTRONICS;
                break;
            case 'Home Appliances':
                path = ROUTES.HOME_APPLIANCE;
                break;
            case 'Vendor Services':
                path = ROUTES.VENDOR_SERVICES;
                break;
            case 'Mobile & Tablets':
                path = ROUTES.MOBILE_AND_TABLETS;
                break;
            case 'Furniture':
                path = ROUTES.FURNITURE;
                break;
            case 'Community':
                path = ROUTES.COMMUNITY;
                break;
            case 'Jobs':
                path = ROUTES.JOBS;
                break;
            default:
                path = ROUTES.HOME;
        }
        let id = data?.id;
        navigate(generatePath(`${path}`, { id }));
    }
    return (
        <Box sx={{ margin: '50px 0' }}>
            <Box margin="auto" gap={'5px !important'} display="grid" sx={{ placeItems: "center" }}>
                <SectionTitle fontSize={35} fontWeight={700} title={t('post-ad.place-ad')} />
                <Typography>{t('post-ad.description')}</Typography>
            </Box>
            <Box
                margin='50px auto'
                display='flex'
                justifyContent='center'
                maxWidth={1200}
                sx={{ flexWrap: 'wrap' }}
            >
                {categoriesList?.categories
                    ?.filter((category: CategoriesProps) => category?.active_for_listing && category?.has_child)
                    ?.map((category: CategoriesProps, index: number) => (
                        <div key={index} onClick={() => onClickCategory(category)}>
                            <CategoryCard data={category} classes={classes} />
                        </div>
                    ))}
            </Box>
        </Box>
    );
};
export default PostAd;