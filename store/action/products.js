export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREACTE_PRODUCT = "CREACTE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteItem = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId: productId,
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  console.log("id, title, description, imageUrl, price", title);
  return {
    type: CREACTE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  console.log("id, title, description, imageUrl, price", description);
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};
