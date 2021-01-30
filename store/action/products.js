export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const deleteItem = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId: productId,
  };
};
