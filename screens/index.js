import {
  Text,
  View,
  FlatList,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "../components/pageContainer";
import { RestaurantCard } from "../components/cards";
import { LocationModalView } from "../components/modal";
import { getBreakPoint } from "../utils/screen";
import { popularPicks } from "../api/get";
import { addressDetailsContext } from "../contexts/AddressContext";

const Index = () => {
  const navigation = useNavigation();
  //saving location details to to the local storage of the website
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 4 };
  const window = useWindowDimensions();

  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [, setVisible] = useState(false);

  const address = useContext(addressDetailsContext);

  useEffect(() => {
    (async () => {
      setPopularRestaurants(await popularPicks());
    })();
  }, []);

  return (
    <PageContainer setPopularRestaurants={setPopularRestaurants}>
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
            <LocationModalView
              visible={true}
              setVisible={setVisible}
              setPopularRestaurants={setPopularRestaurants}
            />
          </ImageBackground>
        </>
      ) : (
        <>
          <Text style={[tailwind("text-2xl font-bold")]}>Main Course</Text>
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
      )}
    </PageContainer>
  );
};

export default Index;
