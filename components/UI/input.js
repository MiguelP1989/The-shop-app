import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };

    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  errorText,
  initialValue,
  initiallyValid,
  onInputChange,
  required,
  email,
  min,
  max,
  minLength,
  ...props
}) => {
  // Hooks
  const [inputState, inputDispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid,
    touched: false,
  });
  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    inputDispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  const lostFocusHandler = () => {
    inputDispatch({ type: INPUT_BLUR });
  };

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, id, onInputChange]);

  // Props
  const textInputProps = {
    ...props,
    style: styles.input,
    value: inputState.value,
    onChangeText: textChangeHandler,
    onBlur: lostFocusHandler,
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputProps} />
      {inputState.touched && !inputState.isValid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText} </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "tomato",
    fontSize: 13,
  },
});

export default Input;
