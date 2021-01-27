// Third-party imports
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// Global imports
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
// import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
// import OrdersScreen from "../screens/shop/OrdersScreen";
// import CartScreen from "../screens/shop/CartScreen";

import Colors from "../constants/Colors";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProdcuctsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductOverviewScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

export default createAppContainer(ProdcuctsNavigator);
