// Third-party imports
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Global imports
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as userProductActions from "../../store/action/products";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const EditProductScreen = ({ navigation }) => {
  //Hooks
  const dispatch = useDispatch();
  const productId = navigation.getParam("productId");
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [title, setTitle] = useState(editProduct ? editProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editProduct ? editProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editProduct ? editProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editProduct) {
      dispatch(
        userProductActions.updateProduct(
          productId,
          title,
          imageUrl,
          description
        )
      );
    } else {
      dispatch(
        userProductActions.createProduct(title, description, imageUrl, price)
      );
    }
  }, [dispatch, productId, title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChange={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChange={(url) => setImageUrl(url)}
          />
        </View>
        {!editProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChange={(price) => setPrice(price)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChange={(description) => setDescription(description)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFnc = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitFnc}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
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
    borderWidth: 1,
  },
});

export default EditProductScreen;
