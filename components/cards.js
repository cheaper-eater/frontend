import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { useTailwind } from "tailwind-rn";

const ListViewCard = ({
  title,
  image,
  rating,
  deliveryFee,
  deliveryTime,
  props,
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
export { ListViewCard, RestaurantCard };
