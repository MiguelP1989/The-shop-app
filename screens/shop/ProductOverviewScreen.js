// Third-party imports
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // load products initially
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    // updating the products if user use the navdrawer
    const willDocusSub = navigation.addListener("willFocus", loadProducts);
    return () => {
      willDocusSub.remove();
    };
  }, [loadProducts]);

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

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Ups! Something went wrong...</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No products found. Start adding some!</Text>
      </View>
    );
  }

  return (
    <>
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
    </>
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverviewScreen;
