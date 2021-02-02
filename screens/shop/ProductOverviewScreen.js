// Third-party imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, Platform, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Global imports
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as cartAction from "../../store/action/cart";
import * as productActions from "../../store/action/products";
import CustomHeaderButton from "../../components/UI/HeaderButton";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const ProductOverviewScreen = ({ navigation }) => {
  // Hooks
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  const selectitemHandler = (id, title) => {
    navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  const onAddToCartHandler = (item) => {
    dispatch(cartAction.addToCart(item));
  };

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
            onSelect={() => {
              selectitemHandler(itemData.item.id, itemData.item.title);
            }}
            onAddToCart={onAddToCartHandler}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() =>
                selectitemHandler(itemData.item.id, itemData.item.title)
              }
            />
            <Button
              color={Colors.primary}
              title="To cart"
              onPress={() => onAddToCartHandler(itemData.item)}
            />
          </ProductItem>
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
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default ProductOverviewScreen;
