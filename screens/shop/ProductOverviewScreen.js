// Third-party imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Global imports
import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/action/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";

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
ProductOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navData.navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default ProductOverviewScreen;
