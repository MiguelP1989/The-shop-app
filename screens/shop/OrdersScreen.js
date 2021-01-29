// Third-party imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";

// Global imports
import Colors from "../../constants/Colors";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const OrdersScreen = ({}) => {
  // Hooks
  const orders = useSelector((state) => state.orders.orders);

  console.log("orders", orders);
  return <View></View>;
};

// Navigation Settings
// OrdersScreen.navigationOptions = (navigationData) => {
//   return {};
// };

const styles = StyleSheet.create({});

export default OrdersScreen;
