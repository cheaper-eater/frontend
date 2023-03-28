import { useRef, useState } from "react";
import {
  Animated,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTailwind } from "tailwind-rn";

const ListViewCard = ({
  title,
  image,
  rating,
  deliveryFee,
  deliveryTime,
  props,
  onPress,
  style,
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={[
        tailwind("bg-white rounded-xl"),
        style,
        Platform.OS === "web"
          ? tailwind("min-h-[320px]")
          : tailwind("min-h-[400px]"),
      ]}
      onPress={() => {
        onPress();
      }}
    >
      <View
        style={tailwind(
          "flex flex-row items-center text-white bg-black/40 absolute z-10 m-4 p-2.5 rounded-xl"
        )}
      >
        <Image
          style={tailwind("w-4 h-4")}
          resizeMode="contain"
          source={require("../assets/icons/gold/star.png")}
        />
        <Text style={tailwind("text-white ml-2 font-bold")}>{rating}</Text>
      </View>
      <Image
        source={{
          uri: image,
        }}
        style={tailwind("object-cover w-full h-[200px] rounded-t-xl")}
      />
      <View style={tailwind("flex flex-1 justify-between p-2")}>
        <Text style={tailwind("text-lg font-bold")}>{title}</Text>
        <View
        // style={
        //   tailwind(
        //   "flex w-full flex-row justify-between pt-2 font-bold"
        // )
        // }
        >
          {props}
          <Text>
            Delivery Fee:
            {deliveryFee == undefined ? " Not Available" : " $" + deliveryFee}
          </Text>
          <Text>
            Delivery Time:{" "}
            {deliveryTime == undefined ? "Not Available" : deliveryTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RestaurantCard = ({ title, image, style, rating, onPress }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={[tailwind("bg-white rounded-xl min-h-[300px]"), style]}
      onPress={() => {
        onPress();
      }}
    >
      <View
        style={tailwind(
          "flex flex-row items-center text-white bg-black/40 absolute z-10 m-4 p-2.5 rounded-xl"
        )}
      >
        <Image
          style={tailwind("w-4 h-4")}
          resizeMode="contain"
          source={require("../assets/icons/gold/star.png")}
        />
        <Text style={tailwind("text-white ml-2 font-bold")}>{rating}</Text>
      </View>
      <Image
        source={{
          uri: image,
        }}
        style={tailwind("object-cover w-full h-[200px] rounded-t-xl")}
      />
      <View style={tailwind("flex flex-1 justify-between p-2")}>
        <Text style={tailwind("text-lg font-bold")}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MenuCard = ({ title, image, style, desc, price }) => {
  const [count, setCount] = useState(0);
  const flip = useRef(new Animated.Value(0)).current;
  const [flipRotation, setFlipRotation] = useState(0);
  flip.addListener(({ value }) => setFlipRotation(value));
  const tailwind = useTailwind();
  const frontStyle = {
    transform: [
      {
        rotateY: flip.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const backStyle = {
    transform: [
      {
        rotateY: flip.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "0deg"],
        }),
      },
    ],
  };

  /**
   * Function to front fliping
   */
  const frontFlip = () => {
    Animated.timing(flip, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Function to back fliping
   */
  const backFlip = () => {
    Animated.timing(flip, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {flipRotation > 90 ? (
        <TouchableOpacity
          onPress={() => (flipRotation ? backFlip() : frontFlip())}
        >
          <Animated.View
            style={[
              tailwind("bg-white rounded-xl min-h-[330px]"),
              style,
              { alignItems: "center", justifyContent: "center", padding: "1%" },
              { ...backStyle },
            ]}
          >
            <Text style={tailwind("text-2xl font-bold")}>Description</Text>
            <View
              style={{
                padding: "2%",
              }}
            >
              <Text
                style={[
                  tailwind("text-lg font-medium"),
                  { textAlign: "center" },
                ]}
              >
                {title}
              </Text>
              <Text style={{ textAlign: "center" }}>
                {desc === "" ? "No description available" : desc}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <>
          <Animated.View
            style={[
              tailwind("bg-white rounded-xl min-h-[330px]"),
              { justifyContent: "space-between" },
              style,
              { ...frontStyle },
            ]}
          >
            <View style={tailwind("flex flex-col absolute z-10")}>
              {!(price.postmates === undefined) ? (
                <View
                  style={tailwind(
                    "flex flex-row items-center text-white bg-black/40 z-10 m-1 p-2.5 rounded-xl"
                  )}
                >
                  <Image
                    style={tailwind("w-5 h-5 rounded-md")}
                    source={require("../assets/logos/services/postmates.png")}
                  />
                  <Text style={tailwind("text-white ml-2 font-bold")}>
                    $ {price.postmates / 100}
                  </Text>
                </View>
              ) : (
                <></>
              )}
              {!(price.grubhub === undefined) ? (
                <View
                  style={tailwind(
                    "flex flex-row items-center text-white bg-black/40 z-10 m-1 p-2.5 rounded-xl"
                  )}
                >
                  <Image
                    style={tailwind("w-5 h-5 rounded-md")}
                    source={require("../assets/logos/services/grubhub.png")}
                  />
                  <Text style={tailwind("text-white ml-2 font-bold")}>
                    $ {price.grubhub / 100}
                  </Text>
                </View>
              ) : (
                <></>
              )}
              {!(price.doordash === undefined) ? (
                <View
                  style={tailwind(
                    "flex flex-row items-center text-white bg-black/40 z-10 m-1 p-2.5 rounded-xl"
                  )}
                >
                  <Image
                    style={tailwind("w-5 h-5 rounded-md")}
                    source={require("../assets/logos/services/doordash.png")}
                  />
                  <Text style={tailwind("text-white ml-2 font-bold")}>
                    $ {price.doordash / 100}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
            <Image
              source={
                image === ""
                  ? require("../assets/background/noImage.png")
                  : { uri: image }
              }
              style={tailwind("object-cover w-full h-[200px] rounded-t-xl")}
            />
            <View style={tailwind("justify-between p-2")}>
              <TouchableOpacity
                onPress={() => (flipRotation ? backFlip() : frontFlip())}
              >
                <Text style={tailwind("text-lg font-bold")} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={{ paddingTop: "1%" }} numberOfLines={2}>
                  {desc === "" ? "No description available" : desc}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                {
                  flex: 1,
                  minWidth: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: "2%",
                  paddingBottom: "2%",
                  maxHeight: "15%",
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 100,
                  backgroundColor: "rgba(82, 250, 100, 0.2)",
                }}
                onPress={() => {
                  count == 0 ? setCount(0) : setCount(count - 1);
                }}
              >
                <Image
                  style={tailwind("w-4 h-4")}
                  resizeMode="contain"
                  source={require("../assets/icons/black/minus.png")}
                />
              </TouchableOpacity>
              <Text style={tailwind("text-2xl font-bold")}>{count}</Text>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 100,
                  backgroundColor: "rgba(82, 250, 100, 0.2)",
                }}
                onPress={() => {
                  setCount(count + 1);
                }}
              >
                <Image
                  style={tailwind("w-4 h-4")}
                  resizeMode="contain"
                  source={require("../assets/icons/black/plus.png")}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
};
export { ListViewCard, RestaurantCard, MenuCard };
