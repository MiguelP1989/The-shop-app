// Third-party imports
import React from "react";
import { Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// Global imports
import productReducer from "./store/reducer/products";
import ShopNavigator from "./navigation/ShopNavigation";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const rootReducer = combineReducers({
  products: productReducer,
});
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
