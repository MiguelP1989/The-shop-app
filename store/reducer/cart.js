// Third-party imports

// Global imports
import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../action/cart";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const initialState = {
  items: {},
  totalAmount: 0,
};

export default cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        // already have the item in the card
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {
        // new item in the cart
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      }
  }
  console.log("sttttae", state);
  return state;
};
