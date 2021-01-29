// Third-party imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";

// Global imports
import Colors from "../../constants/Colors";
import Cartitem from "../../components/shop/CartItem";
import * as cartAction from "../../store/action/cart";
import * as orderAction from "../../store/action/orders";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const CartScreen = ({ navigation }) => {
  // Hooks
  const dispatch = useDispatch();
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
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : 1
    );
  });

  // Props
  const buttonProps = {
    title: "Order Now",
    color: Colors.secondary,
    disabled: cartItems.length === 0,
    onPress: () => dispatch(orderAction.addOrder(cartItems, cartTotalAmount)),
  };

  const flatListProps = {
    data: cartItems,
    keyExtractor: (item) => item.productId,
    renderItem: (itemData) => (
      <Cartitem
        title={itemData.item.productTitle}
        amount={itemData.item.sum}
        quantity={itemData.item.quantity}
        onRemove={() =>
          dispatch(cartAction.removeFromCart(itemData.item.productId))
        }
      />
    ),
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amout}>£ {cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button {...buttonProps} />
      </View>
      <FlatList {...flatListProps} />
    </View>
  );
};

// Navigation Settings
CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
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
