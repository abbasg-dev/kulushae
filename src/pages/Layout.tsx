import { Outlet } from "react-router-dom";
import Header from "components/header/header.component";
import Footer from "components/footer/footer.component";
import { useTranslation } from 'react-i18next';
import 'styles/rtl.scss';

const Layout = () => {
    const { i18n } = useTranslation();
    return (
        <>
            <Header />
            <div className={i18n.language === 'en' ? 'ltr-layout' : 'rtl-layout'}>
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;