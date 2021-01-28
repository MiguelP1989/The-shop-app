// Third-party imports
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

// Global imports
import Colors from "../../constants/Colors";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const ProductItem = ({ title, price, imageUrl, onViewDetail, onAddToCart }) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={onViewDetail} useForeground>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price.toFixed(2)}£</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={onViewDetail}
          />
          <Button
            color={Colors.primary}
            title="To cart"
            onPress={onAddToCart}
          />
        </View>
      </View>
    </TouchableCmp>
  );
};

// Styles
const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    height: 300,
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
});

export default ProductItem;
