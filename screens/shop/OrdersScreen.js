// Third-party imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  FlatList,
  Platform,
  View,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Global imports
import Colors from "../../constants/Colors";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/action/orders";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const OrdersScreen = ({}) => {
  // Hooks
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      {!isLoading || (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <OrderItem
              items={itemData.item.items}
              total={itemData.item.totalAmount}
              date={itemData.item.readableDate}
            />
          );
        }}
      />
    </>
  );
};

// Navigation Settings
OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
