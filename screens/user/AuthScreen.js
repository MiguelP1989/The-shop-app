import React, { useReducer, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
  ImagePropTypes,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Global imports
import Input from "../../components/UI/input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/action/auth";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updateValidaties = {
      ...state.inputValidaties,
      [action.inputId]: action.isValid,
    };
    let updatedFormsIsValid = true;
    for (const key in updateValidaties) {
      updatedFormsIsValid = updatedFormsIsValid && updateValidaties[key];
    }
    return {
      formIsValid: updatedFormsIsValid,
      inputValues: updatedValues,
      inputValidaties: updateValidaties,
    };
  }
  return state;
};

const AuthScreen = ({ navigation }) => {
  // Hooks
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidaties: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occcurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputId: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        await dispatch(
          authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } else {
        await dispatch(
          authActions.logIn(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
        navigation.navigate("Shop");
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
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
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboarType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid  password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.action}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <View style={styles.btn}>
                  <Button
                    title={isSignUp ? "Sign Up" : "Login"}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                </View>
              )}
              <View style={styles.btn}>
                <Button
                  title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                  color={Colors.secondary}
                  onPress={() => {
                    setIsSignUp((prevState) => !prevState);
                  }}
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
