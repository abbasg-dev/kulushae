import gql from 'graphql-tag';

const FETCH_FORM = gql`
    query FetchForm($categoryId: Int!, $steps: Int) {
        fetchForm(category_id: $categoryId, steps: $steps) {
            category_id
            field_extras
            field_id
            field_name
            field_order
            field_request_type
            field_size
            field_type
            field_validation
            id
            steps
        }
    }
`;

const FETCH_AMENITIES = gql`
    query FetchAmenities {
        amenities {
            id
            title
        }
    }
`;

export {
    FETCH_FORM,
    FETCH_AMENITIES
}
