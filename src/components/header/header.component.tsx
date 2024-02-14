import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import ControlledSelect from 'components/select/select.component';
import ControlledButton from 'components/button/button.component';
import { countries, categories, languages } from 'data';
import { setLanguagePreference } from 'helpers/global';
import Icons from 'assets/icons';
import { AppBar, Divider, Stack, Toolbar, Typography, Drawer, List, ListItem, useMediaQuery, Container, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { GET_CATEGORIES, GET_CATEGORY_CHILD_BY_ID } from 'api/queries/categories.queries';
import { useQuery } from '@apollo/client';
import { CategoriesListProps, CategoriesProps, CategoryChildProps } from 'interfaces/categories.model';
import Carousel, { consts } from "react-elastic-carousel";
import { makeStyles } from '@mui/styles';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
const useStyles = makeStyles(() => {
    return {
        carouselContainer: {
            backgroundColor: "#FFF",
            padding: "15px 145px",
            '& .rec-slider': {
                alignItems: 'center'
            }
        },
        carouselItem: {
            backgroundColor: "#fff",
            padding: "10px",
            margin: 'auto !important',
        },
    };
});
const Header: React.FC = () => {
    const { i18n, t } = useTranslation('common');
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedValue, setSelectedValue] = React.useState({
        language: i18n.language.toLowerCase(),
        category: '',
        country: ''
    });
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const onSelectChange = (type) => (value) => {
        if (type === 'language') {
            i18n.changeLanguage(value);
            setLanguagePreference(value);
        }
        setSelectedValue((prevSelectedValue) => ({
            ...prevSelectedValue,
            [type]: value
        }));
    };
    let postAdStyles = {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRadius: 8,
        boxShadow: "0px 4px 32px 0px rgba(202, 204, 255, 0.99)",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 600,
        padding: "7px 30px",
    }
    const openDrawer = () => {
        setDrawerOpen(true);
    }
    const closeDrawer = () => {
        setDrawerOpen(false);
    }
    const openMenu = () => {
        setIsMenuOpened(true);
    }
    const closeMenu = () => {
        setIsMenuOpened(false);
    }
    const {
        loading: isLoadingCategories,
        error: errorLoadingCategories,
        data: categoriesList
    } = useQuery<CategoriesListProps>(GET_CATEGORIES, {
        variables: {
            showOnScreen: 1,
        },
    });
    const {
        loading: isLoadingChildCategory,
        error: errorLoadingChildCategory,
        data: childCategory,
        refetch: refetchChildCategory
    } = useQuery<CategoryChildProps>(GET_CATEGORY_CHILD_BY_ID, {
        variables: {
            afl: 1
        },
    });
    useEffect(() => {
        if (errorLoadingCategories) {
            console.error('Error loading categories:', errorLoadingCategories);
        }
    }, [errorLoadingCategories])
    useEffect(() => {
        if (errorLoadingChildCategory) {
            console.error('Error loading child category:', errorLoadingChildCategory);
        }
    }, [errorLoadingChildCategory])
    useEffect(() => {
        console.log('loading')
    }, [isLoadingCategories, isLoadingChildCategory])
    useEffect(() => {
        if (categoriesList) {
            categoriesList.categories.forEach((category: CategoriesProps) => {
                if (category.has_child) {
                    refetchChildCategory({
                        category_id: category.id,
                        afl: 1
                    })
                }
            });
        }
    }, [categoriesList, refetchChildCategory]);
    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1024, itemsToShow: 6 },
        { width: 1200, itemsToShow: 7 }
    ];
    const handleCarouselChange = (currentIndex) => {
        setActiveIndex(currentIndex);
    };
    const carouselArrow = ({ type, onClick, isEdge }) => {
        const pointer = type === consts.PREV ? <Icons.ARROW style={{ transform: 'rotate(180deg)' }} /> : <Icons.ARROW />
        return (
            <Button onClick={onClick} disabled={isEdge}>
                {pointer}
            </Button>
        )
    }
    const onPostAdClick = () => {
        if (isLoggedIn) {
            navigate(ROUTES.POST_AD);
        } else {
            navigate(ROUTES.LOGIN_METHODS);
        }
    }
    return (
        <>
            <AppBar position="static" sx={{ bgcolor: "common.white", zIndex: 2000, position: 'relative', background: isMenuOpened ? '#F5F5F5' : '#FFF' }} style={{ boxShadow: 'none' }} className={'ltr-layout'}>
                <Toolbar disableGutters sx={{ flexDirection: "column" }}>
                    <Stack sx={{ width: '100%' }} divider={<Divider flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}>
                        <Stack direction="row" pt={{ xs: 1, md: 1.5 }} pb={{ xs: 1 }} px={{ xs: 2, md: 4 }} alignItems="center" justifyContent="space-between" spacing={1}>
                            {isMobile ? (
                                <>
                                    <Icons.LOGO width={isMobile && '100px'} />
                                    <ControlledButton value={t('header.post_ad')} customStyle={postAdStyles} />
                                    <IconButton onClick={openDrawer}>
                                        <MenuIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <Stack sx={{ width: '100%' }} direction="row" alignItems="center" spacing={2}>
                                    <Icons.LOGO />
                                    <Stack direction="row" alignItems="center" justifyContent="end" flex={1} style={{ marginRight: 150 }} spacing={{ xs: 0.5, md: 2 }}>
                                        <Box display='flex' alignItems='center'>
                                            <ControlledButton value="Category" callBackFunc={openMenu} customStyle={{
                                                fontSize: '1rem',
                                                color: 'rgba(0, 0, 0, 0.87)',
                                                background: 'transparent',
                                                textTransform: 'capitalize',
                                                boxShadow: 'unset',
                                                cursor: 'pointer'
                                            }} />
                                            <Stack direction="row" display='flex' justifyContent='space-between' margin='0 12px' fontWeight='bold' style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                                <Typography marginX={1} color={theme.palette.text.primary}>{t("header.about")}</Typography>
                                                <Typography marginX={1} color={theme.palette.text.primary}>{t("header.contact")}</Typography>
                                            </Stack>
                                        </Box>
                                        <Box display='flex' alignItems='center'>
                                            <ControlledButton value={t('header.post_ad')} customStyle={postAdStyles} callBackFunc={onPostAdClick} />
                                            <Box marginLeft={2}>
                                                <ControlledSelect
                                                    data={countries}
                                                    type="countries"
                                                    handleChange={onSelectChange('country')}
                                                    value={selectedValue.country}
                                                    label={t("header.country")}
                                                />
                                            </Box>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, md: 1 }}>
                                        {isLoggedIn ? (
                                            <>
                                                <Icons.HEART />
                                                <Icons.BELL />
                                                <Icons.USER />
                                            </>
                                        ) : (
                                            <Link
                                                color="#000"
                                                style={{
                                                    cursor: 'pointer',
                                                    textTransform: 'capitalize',
                                                    textDecoration: 'unset',
                                                    width: 'max-content',
                                                    color: 'rgba(0, 0, 0, 0.87)',
                                                    textShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px'
                                                }}
                                                to={ROUTES.LOGIN_METHODS}
                                            >{t('header.login_sign_up')}</Link>
                                        )}
                                        <ControlledSelect
                                            data={languages}
                                            type="languages"
                                            handleChange={onSelectChange('language')}
                                            value={selectedValue.language}
                                        />
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
                <List>
                    <ListItem>
                        <ControlledSelect
                            data={categories}
                            type="categories"
                            handleChange={onSelectChange('category')}
                            value={selectedValue.category}
                            label={t("header.category")}
                        />
                    </ListItem>
                    <ListItem><Typography marginX={1} color={theme.palette.text.primary}>{t("header.about")}</Typography></ListItem>
                    <ListItem><Typography marginX={1} color={theme.palette.text.primary}>{t("header.contact")}</Typography></ListItem>
                    <ListItem>
                        <ControlledSelect
                            data={countries}
                            type="countries"
                            handleChange={onSelectChange('country')}
                            value={selectedValue.country}
                            label={t("header.country")}
                        />
                    </ListItem>
                    {isLoggedIn ? (
                        <>
                            <ListItem><Icons.HEART /></ListItem>
                            <ListItem><Icons.BELL /></ListItem>
                            <ListItem><Icons.USER /></ListItem>
                        </>
                    ) : (
                        <Link
                            color="#000"
                            style={{
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                textDecoration: 'unset',
                                width: 'max-content',
                                color: 'rgba(0, 0, 0, 0.87)',
                                textShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px'
                            }}
                            to={ROUTES.LOGIN_METHODS}
                        >{t('header.login_sign_up')}</Link>
                    )}
                    <ListItem>
                        <ControlledSelect
                            data={languages}
                            type="languages"
                            handleChange={onSelectChange('language')}
                            value={selectedValue.language}
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Drawer anchor="top" open={isMenuOpened} onClose={closeMenu} PaperProps={{ sx: { marginTop: '75px!important' } }}>
                <Carousel
                    breakPoints={breakPoints}
                    className={classes?.carouselContainer}
                    isRTL={false}
                    pagination={false}
                    onChange={handleCarouselChange}
                    renderArrow={carouselArrow}
                >
                    {categoriesList && categoriesList?.categories?.map((card: CategoriesProps, index: number) => {
                        return (
                            <Box key={index} className={classes?.carouselItem}>
                                <Box sx={{ textAlign: "center" }}>
                                    {/* {card?.image.includes("undefined") ? <Icons.NO_IMAGE /> : card?.image } */}
                                    <Icons.NO_IMAGE />
                                </Box>
                                <Typography fontSize={18} fontWeight={600} color={activeIndex?.item?.children?.map((activeItem) => activeItem?.props?.children === card?.title ? '#B9B9B9' : '#000')}>{card?.title}</Typography>
                            </Box>
                        )
                    }
                    )}
                </Carousel>
                <Container sx={{
                    borderTop: '1px solid #D9D9D9;', direction: i18n.language.toLowerCase() === 'en' ? 'ltr' : 'rtl',
                    padding: '40px 160px',
                    maxWidth: '90%'
                }}>
                    {
                        categoriesList &&
                        categoriesList?.categories.map((category: CategoriesProps) => {
                            return activeIndex?.item?.children.map((activeItem) => {
                                if (
                                    activeItem?.props?.children === category?.title &&
                                    category.has_child &&
                                    category?.active_for_listing
                                ) {
                                    return childCategory?.categories.map((childItem, index) => (
                                        <ListItem key={index} sx={{ fontSize: 14, fontWeight: 400 }}>{childItem?.title}</ListItem>
                                    ));
                                }
                                return null;
                            })
                        })
                    }
                </Container>
            </Drawer>
        </>
    );
};
export default Header;