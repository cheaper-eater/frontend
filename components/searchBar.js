import { useTailwind } from "tailwind-rn";
import {
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { autocompleteSearch } from "../api/autocomplete";
import { search } from "../api/search";

/**
 * Search bar component
 * @param {boolean} state of the foodTypes component
 * @param {function} function to change the state of the foodTypes component
 * @returns Search bar component
 */
const SearchBar = ({ isFoodTypesOpen, openFoodTypes }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const searchInput = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  useEffect(() => {
    (async () => {
      if (searchQuery) {
        setAutocompleteResults(await autocompleteSearch(searchQuery));
      }
    })();
  }, [searchQuery]);

  const clearSearch = () => {
    openFoodTypes(false);
    setAutocompleteResults([]);
    searchInput.current.value = "";
  };

  const showSearchResults = (query) => {
    // autocomplete queries contain address information in parenthesis, this results in incorrect search
    // results. To combat that, text with parenthesis is being removed.
    clearSearch();
    navigation.navigate("Search", {
      searchStr: query,
    });
  };

  return (
    <>
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

        <TextInput
          ref={searchInput}
          placeholder="What would you like to eat?"
          onChangeText={(text) => setSearchQuery(text)}
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
            showSearchResults(text);
          }}
        />
      </View>
      <View>
        {autocompleteResults && searchQuery ? (
          <View style={tailwind("ml-4")}>
            {autocompleteResults.map(({ uuid, title, image }) => (
              <TouchableOpacity
                key={uuid}
                style={tailwind("flex flex-row items-center mb-2")}
                onPress={async () => {
                  clearSearch();

                  const { ids, isRetail } = (await search(title)).find(
                    (res) => res.title === title
                  );
                  navigation.navigate("Menu", {
                    ...ids,
                    isRetail: isRetail,
                  });
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={tailwind("w-10 h-10 rounded-full mr-2")}
                  resizeMethod="cover"
                />
                <Text style={tailwind("flex flex-1")}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default SearchBar;
