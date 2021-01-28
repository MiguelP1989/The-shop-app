// Third-party imports
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

const CartItem = ({ quantity, title, onRemove, amount }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.text} numberOfLines={5}>
          {title}
        </Text>
      </View>
      <View style={styles.amountBtn}>
        <Text style={styles.text}>£ {amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.deleteBtn}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 6,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexShrink: 1,
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  amountBtn: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  deleteBtn: {
    marginLeft: 10,
  },
});

export default CartItem;
