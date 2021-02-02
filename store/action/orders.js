export const ADD_ORDER = "ADD_ORDER";

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
