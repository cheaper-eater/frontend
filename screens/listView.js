import { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { ListViewCard } from "../components/cards";
import PageContainer from "../components/pageContainer";
import { getBreakPoint } from "../utils/screen";
import { search } from "../api/search";

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

  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();
  const [searchResults, setSearchResults] = useState([]);
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
