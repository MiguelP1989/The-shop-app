// Third-party imports

// Global imports
import { PRODUCTS } from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../action/products";
// Local imports

////////////////////////////////////////////////////////////////////////////////

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default productReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.productId
        ),
      };
    }
  }
  return state;
};
