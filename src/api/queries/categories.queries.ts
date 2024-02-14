import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
  query Category($showOnScreen: Int, $categoryId: Int) {
    categories(show_on_screen: $showOnScreen, category_id: $categoryId) {
      active_for_listing
      has_child
      id
      image
      parent_id
      show_on_screen
      title
    }
  }
`;

const GET_CATEGORY_CHILD_BY_ID = gql`
  query Category($categoryId: Int, $afl: Int, $showOnScreen: Int) {
    categories(category_id: $categoryId, afl: $afl, show_on_screen: $showOnScreen) {
      id
      title
      has_child
    }
  }
`;

export {
  GET_CATEGORIES,
  GET_CATEGORY_CHILD_BY_ID
}
