// Third-party imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";

// Global imports
import Colors from "../../constants/Colors";
import Cartitem from "../../components/shop/CartItem";
import * as cartAction from "../../store/action/cart";
import * as orderAction from "../../store/action/orders";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const CartScreen = ({}) => {
  // Hooks
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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

  const removeOrderHandler = () => {
    dispatch(cartAction.removeFromCart(itemData.item.productId));
  };

  const addOrderHandler = async (cartItems, cartTotalAmount) => {
    setIsLoading(true);
    try {
      await dispatch(orderAction.addOrder(cartItems, cartTotalAmount));
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  // Props
  const buttonProps = {
    title: "Order Now",
    color: Colors.secondary,
    disabled: cartItems.length === 0,
    onPress: () => addOrderHandler(cartItems, cartTotalAmount),
  };

  const flatListProps = {
    data: cartItems,
    keyExtractor: (item) => item.productId,
    renderItem: (itemData) => (
      <Cartitem
        title={itemData.item.productTitle}
        amount={itemData.item.sum}
        quantity={itemData.item.quantity}
        deletable
        onRemove={removeOrderHandler}
      />
    ),
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amout}>
            {/* to not en up with min number */}£{" "}
            {Math.round(cartTotalAmount.toFixed(2) * 100) / 200}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button {...buttonProps} />
        )}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
