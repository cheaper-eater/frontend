import { useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import PageContainer from "../components/pageContainer";
import { RestaurantCard } from "../components/cards";
import FoodTypes from "./foodTypes";

const getBreakPoint = (width) => {
  const breakPoints = { sm: 640, md: 768, lg: 1024, xl: 1280 };
  if (width <= breakPoints.sm) {
    return "sm";
  }
  if (width <= breakPoints.lg) {
    return "lg";
  } else {
    return "xl";
  }
};

const MenuList = () => {
  let FOOD_TYPE = [
    {
      id: 0,
      image: require("../assets/icons/foodtypes/main.png"),
      title: "Main",
    },
    {
      id: 1,
      image: require("../assets/icons/foodtypes/dessert.png"),
      title: "Dessert",
    },
    {
      id: 2,
      image: require("../assets/icons/foodtypes/appetizer.png"),
      title: "Appetizer",
    },
    {
      id: 3,
      image: require("../assets/icons/foodtypes/drinks.png"),
      title: "Drinks",
    },
    {
      id: 4,
      image: require("../assets/icons/foodtypes/fastfood.png"),
      title: "FastFood",
    },
    {
      id: 5,
      image: require("../assets/icons/foodtypes/seafood.png"),
      title: "SeaFood",
    },
  ];

  let RestaurantArray = [];

  for (let i = 0; i < 11; i++) {
    RestaurantArray.push({
      title: faker.company.name(),
      id: i,
      image: faker.image.food(),
    });
  }

  const tailwind = useTailwind();
  const numColumns = { sm: 2, lg: 4, xl: 4 };
  const window = useWindowDimensions();

  const [foodTypeScreen, showFoodTypeScreen] = useState(false);
  return (
    <PageContainer>
      <TouchableWithoutFeedback
        onPress={() =>
          foodTypeScreen == false
            ? console.log("Already Showing")
            : showFoodTypeScreen(false)
        }
      >
        <View>
          <View style={tailwind("flex flex-row justify-between")}>
            <View>
              <Text style={tailwind("text-3xl font-bold")}>Delivery 🥘</Text>
            </View>
            <Image
              style={[tailwind("w-9 h-9"), { borderRadius: 20 }]}
              resizeMode="contain"
              source={{ uri: faker.image.avatar() }}
            />
          </View>

          <View style={tailwind("flex flex-row items-center")}>
            <Image
              style={tailwind("w-4 h-4")}
              resizeMode="contain"
              source={require("../assets/icons/black/location.png")}
            />
            <Text style={tailwind("font-light ml-2")}>
              {faker.address.city()}
            </Text>
          </View>

          <View style={tailwind("flex flex-row items-center")}>
            <Image
              style={tailwind("w-5 h-5")}
              resizeMode="contain"
              source={require("../assets/icons/black/search.png")}
            />
            <TextInput
              placeholder="What would you like to eat?"
              onFocus={() => setTimeout(() => showFoodTypeScreen(true), 100)}
              style={{
                height: 40,
                margin: 12,
                borderLeftWidth: 1,
                padding: 10,
                width: Platform.OS === "web" ? window.width / 2 : window.width,
              }}
            ></TextInput>
          </View>

          {foodTypeScreen ? (
            <View>
              <FoodTypes closeFoodTypes={() => showFoodTypeScreen(false)} />
            </View>
          ) : (
            <View>
              <View style={tailwind("flex flex-row items-center")}>
                <Text style={[tailwind("text-2xl font-bold")]}>
                  Choose Category
                </Text>
              </View>

              <View style={[tailwind("items-center")]}>
                <FlatList
                  style={{ maxWidth: window.width }}
                  horizontal={true}
                  data={FOOD_TYPE}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={tailwind("rounded-full items-center m-2")}
                      >
                        <Image
                          source={item.image}
                          style={[
                            tailwind("object-cover rounded-full"),
                            {
                              width:
                                Platform.OS === "web"
                                  ? window.width / 8
                                  : window.width / 6,
                              height:
                                Platform.OS === "web"
                                  ? window.width / 8
                                  : window.width / 6,
                            },
                          ]}
                        />
                        <Text style={tailwind("text-base font-bold")}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  key={getBreakPoint(window.width)}
                  keyExtractor={(item) => item.id}
                />
              </View>

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

                <TouchableOpacity>
                  <Text style={[tailwind("font-bold text-orange-500")]}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={RestaurantArray}
                renderItem={({ item }) => {
                  return (
                    <View style={[tailwind("flex flex-1 ")]}>
                      <RestaurantCard
                        style={tailwind("m-2")}
                        title={item.title}
                        image={item.image}
                        rating={(Math.random() * (5 - 1) + 1).toFixed(1)}
                      />
                    </View>
                  );
                }}
                key={getBreakPoint(window.width)}
                numColumns={numColumns[getBreakPoint(window.width)]}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </PageContainer>
  );
};

export default MenuList;
