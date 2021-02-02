import Orders from "../../models/orders";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        "https://nativeshop-fa24b-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json"
      );

      if (!resp.ok) {
        throw new Error("Something went wrong!");
      }
      const respData = await resp.json();

      const loadedOrders = [];
      for (const key in respData) {
        loadedOrders.push(
          new Orders(
            key,
            respData[key].cartItems,
            respData[key].totalAmount,
            new Date(respData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, loadedOrders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const resp = await fetch(
      "https://nativeshop-fa24b-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    const respData = await resp.json();
    console.log("respDATA", respData);

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resp.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
