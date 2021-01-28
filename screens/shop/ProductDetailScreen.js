// Third-party imports
import React from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";

// Global imports
import Colors from "../../constants/Colors";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const ProductDetailScreen = ({ navigation }) => {
  // Variables
  const productId = navigation.getParam("productId");

  // Hooks
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.btn}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>£ {selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

// Navigation Settings
ProductDetailScreen.navigationOptions = (navigationData) => {
  const productlTitle = navigationData.navigation.getParam("productTitle");
  return {
    headerTitle: productlTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "open-sans",
  },
  btn: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
