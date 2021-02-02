// Third-party imports

// Global imports
import { ADD_ORDER } from "../action/orders";
import Orders from "../../models/orders";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const initialState = {
  orders: [],
};

export default ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const newOrder = new Orders(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return { ...state, orders: state.orders.concat(newOrder) };
    }
  }
  return state;
};
