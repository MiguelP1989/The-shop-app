import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

// Global imports
import Colors from "../../constants/Colors";

// Local imports

////////////////////////////////////////////////////////////////////////////////

const CostumeHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CostumeHeaderButton;
