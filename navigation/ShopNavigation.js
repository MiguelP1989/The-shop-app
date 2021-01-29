// Third-party imports
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

// Global imports
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import CartScreen from "../screens/shop/CartScreen";

import Colors from "../constants/Colors";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

///

const ProdcuctsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

////

const OrdersNavigation = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const ShopNaviagtor = createDrawerNavigator(
  {
    Products: ProdcuctsNavigator,
    Orders: OrdersNavigation,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNaviagtor);
