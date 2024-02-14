import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Box, List, Typography } from "@mui/material";
import SectionTitle from "components/section-title/section-title.component";
import { CategoryChildProps } from 'interfaces/categories.model';
import { GET_CATEGORY_CHILD_BY_ID } from 'api/queries/categories.queries';
import ChildCategory from 'pages/PostAd/ChildCategory';
const RentProperty = () => {
    const { id } = useParams();
    const { t } = useTranslation('common');
    const {
        loading: isLoadingChildCategoryList,
        error: errorLoadingChildCategoryList,
        data: childCategoryList,
        refetch: refetchChildCategory
    } = useQuery<CategoryChildProps>(GET_CATEGORY_CHILD_BY_ID, {
        variables: {
            afl: 1
        },
    });
    useEffect(() => {
        if (errorLoadingChildCategoryList) {
            console.error('Error loading child category:', errorLoadingChildCategoryList);
        }
    }, [errorLoadingChildCategoryList])
    useEffect(() => {
        console.log('loading')
    }, [isLoadingChildCategoryList])
    useEffect(() => {
        if (id) {
            refetchChildCategory({
                categoryId: Number(id),
                afl: null,
                showOnScreen: null
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
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
                alignItems='center'
                maxWidth={1200}
            >
                <List>
                    <ChildCategory list={childCategoryList} />
                </List>
            </Box>
        </Box>
    );
};
export default RentProperty;