export class AdProps {
    verified?: boolean;
    rank?: string;
    featured?: boolean;
    price?: number;
    title?: string;
    location?: string;
    bedroom?: number;
    bathroom?: number;
    squareFeet?: number;
    adBanner?: JSX.Element;
    status?: string;
};

export class AdCardProps {
    classes?: {
        cardRoot?: string;
        headline?: string;
        mobileMedia?: string;
    };
    data?: AdProps;
    verifiedRankStyles?: Record<string, string | number>;
    locationStyles?: Record<string, string | number>;
    featuredStyles?: Record<string, string | number>;
    bedroomBathroomAspectStyles?: Record<string, string | number>;
    loadMoreStyles?: Record<string, string | number>;
    statusStyles?: Record<string, string | number>;
    isMobile?: boolean;
};