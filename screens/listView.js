import {
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ListViewCard } from "../components/cards";
import PageContainer from "../components/pageContainer";
import { getBreakPoint } from "../utils/screen";
import { search } from "../api/search";
import { addressDetailsContext } from "../contexts/AddressContext";
import SearchBarComponent from "../components/searchBar";

const orderByDescending = (a, b) => b - a;
const orderByAscending = (a, b) => a - b;

const ListView = ({ route }) => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [filter, setFilter] = useState({
    desc: "distance: closest",
    by: "estimatedDeliveryTime",
    orderBy: orderByAscending,
  });
  const filters = [
    {
      desc: "distance: closest",
      by: "estimatedDeliveryTime",
      orderBy: orderByAscending,
    },
    {
      desc: "distance: farthest",
      by: "estimatedDeliveryTime",
      orderBy: orderByDescending,
    },
    { desc: "rating: best", by: "rating", orderBy: orderByDescending },
    { desc: "rating: worst", by: "rating", orderBy: orderByAscending },
    {
      desc: "delivery: cheapest",
      by: "deliveryFee",
      orderBy: orderByAscending,
    },
    {
      desc: "delivery: most expensive",
      by: "deliveryFee",
      orderBy: orderByDescending,
    },
  ];
  const [foodTypeScreen, showFoodTypeScreen] = useState(false);
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();
  const [searchResults, setSearchResults] = useState([]);
  const address = useContext(addressDetailsContext);
  const [showFilters, setShowFilters] = useState(false);

  const filterResults = (results) =>
    setSearchResults([
      ...results.sort((a, b) => filter.orderBy(a[filter.by], b[filter.by])),
    ]);

  useEffect(() => {
    (async () => {
      filterResults(await search(route.params.searchStr));
    })();
  }, [route.params.searchStr]);

  useEffect(() => {
    filterResults(searchResults);
  }, [filter]);

  return (
    <PageContainer style={tailwind("m-2")}>
      <View>
        <View style={tailwind("flex flex-row justify-between")}>
          <View>
            <Text style={tailwind("text-3xl font-bold")}>
              Hello {faker.name.firstName()} 👋
            </Text>
            <Text style={tailwind("text-xl font-light")}>
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
        <View style={tailwind("flex flex-row items-center")}>
          <SearchBarComponent
            isFoodTypesOpen={foodTypeScreen}
            openFoodTypes={showFoodTypeScreen}
          />
        </View>
      </View>
      <TouchableOpacity
        style={tailwind(
          `${
            showFilters ? "bg-none my-4 w-full" : "bg-white p-2 md:w-60"
          } rounded-xl self-end`
        )}
        onPress={() => {
          setShowFilters(!showFilters);
        }}
      >
        <Text
          style={tailwind(
            `${showFilters ? "mb-2" : ""} text-base font-bold self-end`
          )}
        >
          Filter by {filter.desc}
        </Text>
        <View
          style={tailwind(
            `${showFilters ? "grid grid-cols-2 gap-2 " : "hidden"} `
          )}
        >
          {filters.map((filterItem) => (
            <TouchableOpacity
              key={filterItem.desc}
              onPress={() => {
                setFilter(filterItem);
                setShowFilters(false);
              }}
              style={tailwind("bg-white p-2 rounded-xl")}
            >
              <Text style={tailwind("text-base font-bold")}>
                {filterItem.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
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
    </PageContainer>
  );
};

export default ListView;
