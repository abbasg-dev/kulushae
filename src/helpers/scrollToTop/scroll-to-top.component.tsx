import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ScrollProps } from 'interfaces/mui-components.model';
import * as ROUTES from 'constants/routes';
import Icons from 'assets/icons';
import './scroll-to-top.scss';

const ScrollToTop = (props: ScrollProps) => {

    const { children } = props;
    const location = useLocation();
    const [showScroll, setShowScroll] = useState<boolean>(false);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (location.pathname === ROUTES.LOGIN) {
            setShowScroll(false)
        }
    }, [location])

    return (
        <>
            {children}
            <div 
                className={`scroll-to-top ${showScroll ? 'show' : 'hide'}`} 
                onClick={scrollToTop} style={{ width: 95 }}
            >
                <Icons.SCROLL />
            </div>
        </>
    )
};

export default ScrollToTop;