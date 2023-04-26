import {
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "../components/pageContainer";
import { RestaurantCard } from "../components/cards";
import ModalView from "../components/modal";
import { getBreakPoint } from "../utils/screen";
import { popularPicks } from "../api/get";
import { addressDetailsContext } from "../contexts/AddressContext";
import SearchBarComponent from "../components/searchBar";
import FoodTypes from "./foodTypes";

const Index = () => {
  const navigation = useNavigation();
  //saving location details to to the local storage of the website
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 4 };
  const window = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  // const popularRestaurants = require("./test.json").data.slice(0, 20);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [foodTypeScreen, showFoodTypeScreen] = useState(false);
  const foodTypesRef = useRef(null);
  const address = useContext(addressDetailsContext);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       foodTypesRef.current &&
  //       !foodTypesRef.current.contains(event.target) &&
  //       !searchBarRef.current.isFocused()
  //     ) {
  //       showFoodTypeScreen(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, []);

  useEffect(() => {
    (async () => {
      // if (
      //   address[0]?.address?.address1 &&
      //   address[0]?.address?.address1 !== "Set Location"
      // ) {
      setPopularRestaurants(await popularPicks());
      // }
    })();
  }, []);

  return (
    <PageContainer>
      {/* Runs for the first time when the location hasn't been set by the cookies*/}
      {address[0]?.address?.address1 === "Set Location" ||
      !address[0]?.address?.address1 ? (
        <>
          <ImageBackground
            style={[
              {
                flex: 1,
                justifyContent: "center",
              },
            ]}
            source={require("../assets/background/background.png")}
          >
            <ModalView
              visible={true}
              setVisible={setVisible}
              setPopularRestaurants={setPopularRestaurants}
            />
          </ImageBackground>
        </>
      ) : (
        <>
          <>
            <ModalView
              visible={visible}
              setVisible={setVisible}
              setPopularRestaurants={setPopularRestaurants}
            />
            <View style={tailwind("flex flex-row justify-between")}>
              <View>
                <Text style={tailwind("text-2xl font-bold")}>
                  Give yourself a treat!🥘
                </Text>
              </View>
              <View style={tailwind("flex flex-row")}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Checkout")}
                >
                  <Image
                    style={tailwind("w-9 h-9 mr-4")}
                    resizeMode="contain"
                    source={require("../assets/icons/black/cart.png")}
                  />
                </TouchableOpacity>
                <Image
                  style={[tailwind("w-9 h-9"), { borderRadius: 20 }]}
                  resizeMode="contain"
                  source={{ uri: faker.image.avatar() }}
                />
              </View>
            </View>
            <View style={tailwind("flex flex-row")}>
              <TouchableOpacity
                // Shows up the modal for the location setup when clicked on the location button
                onPress={() => setVisible(true)}
                style={tailwind("flex-row")}
              >
                <Image
                  style={tailwind("w-4 h-4")}
                  resizeMode="contain"
                  source={require("../assets/icons/black/location.png")}
                />
                <Text style={tailwind("font-light ml-2")}>
                  {/* {address?.address?.address1} */}
                  {address[0].address.address1}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={tailwind("flex flex-row items-center")}>
              <SearchBarComponent
                isFoodTypesOpen={foodTypeScreen}
                openFoodTypes={showFoodTypeScreen}
              />
            </View>
          </>

          <>
            {foodTypeScreen ? (
              <View ref={foodTypesRef}>
                <FoodTypes closeFoodTypes={() => showFoodTypeScreen(false)} />
              </View>
            ) : (
              <>
                <View
                  style={[
                    tailwind("flex flex-row justify-between"),
                    {
                      alignItems: "center",
                      alignContent: "center",
                      paddingBottom: 15,
                    },
                  ]}
                >
                  <Text style={[tailwind("text-2xl font-bold")]}>
                    Main Course
                  </Text>
                </View>
                <>
                  {popularRestaurants?.length != 0 ? (
                    <FlatList
                      data={popularRestaurants}
                      renderItem={({ item }) => {
                        return (
                          <View style={[tailwind("flex flex-1 ")]}>
                            <RestaurantCard
                              style={tailwind("m-2")}
                              title={item.title}
                              image={item.image}
                              rating={
                                item.rating === null
                                  ? "No Ratings Found"
                                  : item.rating.toFixed(1)
                              }
                              onPress={() => {
                                navigation.navigate("Menu", {
                                  postmates: item.ids.postmates,
                                  grubhub: item.ids.grubhub,
                                  doordash: item.ids.doordash,
                                });
                              }}
                            />
                          </View>
                        );
                      }}
                      key={getBreakPoint(window.width)}
                      numColumns={numColumns[getBreakPoint(window.width)]}
                      keyExtractor={(item) => item.id}
                    />
                  ) : (
                    <></>
                  )}
                </>
              </>
            )}
          </>
        </>
      )}
    </PageContainer>
  );
};

export default Index;
