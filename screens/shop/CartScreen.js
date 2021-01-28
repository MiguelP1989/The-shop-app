// Third-party imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  FlatList,
} from "react-native";

// Global imports
import Colors from "../../constants/Colors";
import Cartitem from "../../components/shop/CartItem";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const CartScreen = ({ navigation }) => {
  // Hooks
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amout}>£ {cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.secondary}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => {
          return (
            <Cartitem
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              quantity={itemData.item.quantity}
              onRemove={() => {}}
            />
          );
        }}
      />
    </View>
  );
};

// Navigation Settings
CartScreen.navigationOptions = (navigationData) => {
  return {};
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amout: {
    color: Colors.primary,
  },
});

export default CartScreen;
