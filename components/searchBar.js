import { useTailwind } from "tailwind-rn";
import {
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * Search bar component
 * @param {boolean} state of the foodTypes component
 * @param {function} function to change the state of the foodTypes component
 * @returns Search bar component
 */
const SearchBar = ({ isFoodTypesOpen, openFoodTypes }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Platform.OS === "web" ? (
        !isFoodTypesOpen ? (
          <Image
            style={tailwind("w-5 h-5 flex-row")}
            resizeMode="contain"
            source={require("../assets/icons/black/search.png")}
          />
        ) : (
          <TouchableOpacity onPress={() => openFoodTypes(false)}>
            <Image
              style={tailwind("w-5 h-5 flex-row")}
              resizeMode="contain"
              source={require("../assets/icons/black/back.png")}
            />
          </TouchableOpacity>
        )
      ) : (
        <Image
          style={tailwind("w-5 h-5 flex-row")}
          resizeMode="contain"
          source={require("../assets/icons/black/search.png")}
        />
      )}

      <View>
        <TextInput
          placeholder="What would you like to eat?"
          onFocus={() => openFoodTypes(true)}
          style={{
            flexDirection: "row",
            height: 40,
            margin: 12,
            borderLeftWidth: 1,
            padding: 10,
            width: !(Platform.OS === "web")
              ? Dimensions.get("screen").width * 0.85
              : Dimensions.get("screen").width * 0.4,
          }}
          onSubmitEditing={({ nativeEvent: { text } }) => {
            openFoodTypes(false);
            navigation.navigate("Search", {
              searchStr: text,
            });
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;
