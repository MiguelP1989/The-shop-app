// Third-party imports
import React from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet, FlatList } from "react-native";

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

const ProductOverviewScreen = () => {
  // Hooks
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
      />
    </View>
  );
};
// Styles
// const styles = StyleSheet.create({})

export default ProductOverviewScreen;
