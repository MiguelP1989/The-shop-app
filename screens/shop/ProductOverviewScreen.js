// Third-party imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList } from "react-native";

// Global imports
import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/action/cart";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const ProductOverviewScreen = ({ navigation }) => {
  // Hooks
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.title}
            imageUrl={itemData.item.imageUrl}
            price={itemData.item.price}
            onViewDetail={() => {
              navigation.navigate({
                routeName: "ProductDetail",
                params: {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title,
                },
              });
            }}
            onAddToCart={() => {
              dispatch(cartAction.addToCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

// Navigation settings
ProductOverviewScreen.navigationOptions = () => {
  return {
    headerTitle: "All Products",
  };
};

export default ProductOverviewScreen;
