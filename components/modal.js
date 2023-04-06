import { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { autocompleteLocation } from "../api/autocomplete";
import { detailLocation } from "../api/detail";
import { setLocation } from "../api/set";
import { popularPicks } from "../api/get";
import { setLocalStorage } from "../api/localStorage";
import { addressDetailsContext } from "../contexts/AddressContext";

const ModalView = ({ visible, setVisible, setPopularRestaurants }) => {
  const tailwind = useTailwind();
  const window = useWindowDimensions();
  const [addressInput, setAddressInput] = useState("");
  const [addressArray, setAddressArray] = useState([]);
  const address = useContext(addressDetailsContext);

  // Fetch call to the backend to get the autocomplete location
  useEffect(() => {
    autocompleteLocation(addressInput).then((x) => setAddressArray(x));
  }, [addressInput]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible} style>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 5,
            maxHeight:
              Platform.OS === "web" ? window.height * 0.6 : window.height * 0.4,
            maxWidth: Platform.OS === "web" ? null : window.width * 0.99,
          }}
        >
          <View
            style={[
              tailwind(
                "flex flex-row rounded-full justify-center items-center p-4 mb-4"
              ),
            ]}
          >
            <Image
              style={[
                tailwind("mx-4"),
                { width: window.width * 0.09, height: window.height * 0.06 },
              ]}
              source={require("../assets/icons/black/location.png")}
              resizeMode="contain"
            />
            <TextInput
              style={[
                tailwind("w-full h-full outline-none"),
                { fontSize: window.width * 0.04 },
              ]}
              placeholder="Enter delivery address"
              placeholderTextColor={"#ababab"}
              onChangeText={(text) => setAddressInput(text)}
            />
          </View>
          <FlatList
            style={{
              borderWidth: 1,
              borderRadius: 10,
              minWidth:
                Platform.OS === "web"
                  ? window.width - window.width * 0.3
                  : window.width - window.width * 0.1,
              maxHeight:
                Platform.OS === "web"
                  ? window.height - window.height * 0.3
                  : null,
            }}
            data={addressArray}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                // Logic on onPress() fetch calls suggested by Alfredo Sequeida
                // All the fetch calls for getting the selected address details and then stting up the cookies and fetching popular restaurants
                onPress={async () => {
                  const detailData = await detailLocation(addressArray[index]);
                  await setLocation(detailData);
                  address[1](detailData);
                  await setLocalStorage("address", detailData);
                  const results = await popularPicks();
                  setPopularRestaurants(results);
                  setVisible(false);
                }}
              >
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: index === 4 ? 0 : 1,
                  }}
                >
                  <Text style={{ fontSize: 25 }}>
                    {item.addressLine1 + ", " + item.addressLine2}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;
