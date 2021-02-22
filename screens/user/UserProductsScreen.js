// Third-party imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  FlatList,
  Platform,
  Button,
  Alert,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Global imports
import Colors from "../../constants/Colors";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as userProductActions from "../../store/action/products";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const UserProductScreen = ({ navigation }) => {
  // Hooks
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    navigation.navigate("EditProduct", { productId: id });
  };

  const onDeleteHandler = (itemId) => {
    Alert.alert("Are you sure?", "Do you want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(userProductActions.deleteItem(itemId));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products found!!</Text>
      </View>
    );
  }

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
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => editProductHandler(itemData.item.id)}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => onDeleteHandler(itemData.item.id)}
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
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navData.navigation.navigate("EditProduct");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({});

export default UserProductScreen;
