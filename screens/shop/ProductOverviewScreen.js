// Third-party imports
import React from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet, FlatList } from "react-native";

// Global imports
import ProductItem from "../../components/shop/ProductItem";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const ProductOverviewScreen = ({ navigation }) => {
  // Hooks
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.title}
            imageUrl={itemData.item.imageUrl}
            price={itemData.item.price}
            onViewDetail={() => {
              navigation.navigate({
                routeName: "ProductDetail",
                params: {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title,
                },
              });
            }}
            onAddToCart={() => {}}
          />
        )}
      />
    </View>
  );
};

// Navigation settings
ProductOverviewScreen.navigationOptions = () => {
  return {
    headerTitle: "All Products",
  };
};

export default ProductOverviewScreen;
