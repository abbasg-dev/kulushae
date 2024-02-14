import { Helmet } from 'react-helmet';
import Hero from "components/hero/hero.component";
import Categories from "components/categories/categories.component";
import FeaturedAds from "components/featured-ads/featured-ads.component";
import { useTranslation } from 'react-i18next';
const Home = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Helmet>
        <title>{t("title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no" />
      </Helmet>
      <Hero />
      <Categories />
      <FeaturedAds />
    </>
  );
};

export default Home;
