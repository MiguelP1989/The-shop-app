import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";

import Colors from "../constants/Colors";
import * as authActions from "../store/action/auth";

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        navigation.navigate("Auth");

        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate("Auth");
        return;
      }
      navigation.navigate("Shop");
      dispatch(authActions.authenticate(token, userId));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View styles={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartUpScreen;
