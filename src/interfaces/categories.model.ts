export class CategoriesProps {
    active_for_listing?: boolean;
    has_child?: boolean;
    id: string;
    image: string;
    parent_id: number;
    show_on_screen: number
    title: string;
};

export class CategoryCardProps {
    classes?: {
        cardRoot?: string;
        cardContent?: string;
        spanStyle?: string;
        icon?: string;
        disabledCard?: string;
    };
    data?: CategoriesProps;
};

export class CategoriesListProps {
    categories?: CategoriesProps[]
}

export class CategoryChildProps {
    category_id?: number;
    afl?: number;
    categories?: {
        id?: string;
        title?: string;
        has_child?: boolean;
    }[];
}