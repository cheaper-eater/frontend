import { Text, View, Image, FlatList, useWindowDimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { useContext, useEffect, useState } from "react";
import { ListViewCard } from "../components/cards";
import PageContainer from "../components/pageContainer";
import { getBreakPoint } from "../utils/screen";
import { search } from "../api/search";
import { addressDetailsContext } from "../contexts/AddressContext";

const ListView = ({ route }) => {
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();
  const [searchResults, setSearchResults] = useState([]);
  const address = useContext(addressDetailsContext);
  useEffect(() => {
    (async () => {
      setSearchResults(await search(route.params.searchStr));
    })();
  }, []);

  return (
    <PageContainer style={tailwind("m-2")}>
      <View>
        <View style={tailwind("flex flex-row justify-between")}>
          <View>
            <Text style={tailwind("text-3xl font-bold")}>
              Hello {faker.name.firstName()} 👋
            </Text>
            <Text style={tailwind("text-lg font-light")}>
              {"It's lunch time!"}
            </Text>
          </View>
          <Image
            style={tailwind("w-5 h-5")}
            resizeMode="contain"
            source={require("../assets/icons/black/search.png")}
          />
        </View>
        <View style={tailwind("my-3")}>
          <Text style={tailwind("text-2xl font-bold")}>Nearby food</Text>
          <View style={tailwind("flex flex-row items-center")}>
            <Image
              style={tailwind("w-4 h-4")}
              resizeMode="contain"
              source={require("../assets/icons/black/location.png")}
            />
            <Text style={tailwind("font-light ml-2")}>
              {address[0].address.address1}
            </Text>
          </View>
        </View>
      </View>
      {searchResults.length != 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => {
            return (
              <View style={[tailwind("flex flex-1 ")]}>
                <ListViewCard
                  style={tailwind("m-2")}
                  title={item.title}
                  image={item.image}
                  deliveryFee={item.deliveryFee}
                  deliveryTime={item.estimatedDeliveryTime}
                  rating={
                    item.rating === null
                      ? "No Ratings Found"
                      : item.rating.toFixed(1)
                  }
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
    </PageContainer>
  );
};

export default ListView;
