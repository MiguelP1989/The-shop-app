// Third-party imports
import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";

// Global imports
import productReducer from "./store/reducer/products";
import cartReducer from "./store/reducer/cart";
import ordersReducer from "./store/reducer/orders";
import authReducer from "./store/reducer/auth";

// wrap conatiner to give acces to redux
import ShopNavigator from "./navigation/ShopNavigation";
import NavigationContainer from "./navigation/NavigationContainer";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  // Hooks
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <Apploading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
