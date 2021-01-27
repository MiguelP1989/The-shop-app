// Third-party imports

// Global imports
import { PRODUCTS } from "../../data/dummy-data";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default productReducer = (state = initialState, action) => {
  return state;
};
