import React, { useReducer, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Global imports
import Input from "../../components/UI/input";
import Colors from "../../constants/Colors";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const AuthScreen = ({}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        colors={["#ffe3ff", Colors.primary, Colors.secondary, "white"]}
        style={styles.grandient}
      >
        <View style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboarType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address"
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboarType="default"
              secureTextEntry
              required
              minLenght={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid  password"
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.action}>
              <View style={styles.btn}>
                <Button
                  title="Login"
                  color={Colors.primary}
                  onPress={() => {}}
                />
              </View>
              <View style={styles.btn}>
                <Button
                  title="Switch to Sign Up"
                  color={Colors.secondary}
                  onPress={() => {}}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    borderRadius: 10,
    elevation: 5,
  },
  grandient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    marginTop: 20,
  },
  btn: {
    marginBottom: 10,
  },
});

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

export default AuthScreen;
