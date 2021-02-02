import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    // any async code
    try {
      const resp = await fetch(
        "https://nativeshop-fa24b-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );

      if (!resp.ok) {
        throw new Error("Something went wrong!");
      }

      const respData = await resp.json();
      const loadedProducts = [];
      // sending an array cause we receive an object
      for (const key in respData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            respData[key].title,
            respData[key].imageUrl,
            respData[key].description,
            respData[key].price
          )
        );
      }
      console.log("loadedProducts", loadedProducts);

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw err;
    }
  };
};

export const deleteItem = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId: productId,
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // any async code
    const resp = await fetch(
      "https://nativeshop-fa24b-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const respData = await resp.json();
    console.log("respData", respData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: respData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
