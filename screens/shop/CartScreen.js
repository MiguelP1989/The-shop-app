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

// Local imports

////////////////////////////////////////////////////////////////////////////////

const CartScreen = ({ navigation }) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  console.log("cartTotalAmount", cartTotalAmount);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amout}>£ {cartTotalAmount}</Text>
        </Text>
        <Button title="Order Now" />
      </View>
      <View>
        <Text>hshshs</Text>
      </View>
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
