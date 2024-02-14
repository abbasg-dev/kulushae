export class PostAdProps {
    title?: string;
    phoneNumber?: string;
    bedrooms?: number;
    roomType?: string;
    bathrooms?: number;
    size?: number;
    price?: number;
    tourUrl?: string;
    propertyReferenceId?: number;
    minimumContrastPeriod?: string;
    noticePeriod?: string;
    securityDeposit?: number;
    realEstateAgencies?: string;
    keyword?: string;
    amenities?: string[];
    building?: string;
    neighborhood?: string;
}
export class FetchFrmData {
    title?: string;
    contact_number?: string;
    price?: string;
    description?: string;
    images?: string[];
    url_360?: string;
    youtube_url?: string;
    annual_community_fee?: string;
    furnished?: boolean;
    size?: string;
    total_closing_fee?: string;
    bedrooms?: string;
    bathrooms?: string;
    developer?: string;
    ready_by?: Date;
    reference_number?: string;
    buyer_transfer_fee?: string;
    seller_transfer_fee?: string;
    maintenance_fee?: string;
    occupancy_status?: string;
    amenities?: Amenities[];
}
export class Amenities {
    amenities?: {
        id?: string;
        title?: string;
        __typename?: string;
    }[];
}