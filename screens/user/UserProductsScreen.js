// Third-party imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, FlatList, Platform, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Global imports
import Colors from "../../constants/Colors";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as userProductActions from "../../store/action/products";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const UserProductScreen = ({}) => {
  // Hooks
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
          >
            <Button color={Colors.primary} title="Edit" onPress={() => {}} />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                dispatch(userProductActions.deleteItem(itemData.item.id));
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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

const styles = StyleSheet.create({});

export default UserProductScreen;
