/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, useWindowDimensions, View, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { pure } from "react-recompose";
import PageContainer from "../components/pageContainer";
import { getBreakPoint } from "../utils/screen";
import { addressDetailsContext } from "../contexts/AddressContext";
import { MenuCard } from "../components/cards";
import { detailStore } from "../api/detail";
import { CustomizationModal } from "../components/modal";
import { setLocalStorage } from "../api/localStorage";

const MenuView = ({ route }) => {
  const [visible, setVisible] = useState(false);
  const [modalClickId, setModalClickId] = useState();
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();
  const address = useContext(addressDetailsContext);
  const [menuData, setMenuData] = useState();
  const [pageData, setPageData] = useState(
    menuData === undefined ? undefined : [menuData.menu[0]]
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setMenuData(
        // await detailStore({
        //   postmates: route.params.postmates,
        //   grubhub: route.params.grubhub,
        //   doordash: route.params.doordash,
        // })
        require("./menu.json")
      );
    })();
  }, []);

  useEffect(() => {
    if (menuData != undefined) {
      setPageData([menuData.menu[0]]);
    }
  }, [menuData]);

  return (
    <PageContainer style={tailwind("m-2")}>
      {modalClickId != undefined ? (
        <CustomizationModal
          modalVisible={visible}
          setModalVisible={setVisible}
          data={require("./p_data2.json").data}
        />
      ) : null}
      {menuData != undefined ? (
        <>
          <>
            <View style={tailwind("flex flex-row justify-between")}>
              <View>
                <Text style={tailwind("text-3xl font-bold")}>
                  {menuData.name}
                </Text>
                <Text
                  style={[
                    tailwind("text-2xl font-medium"),
                    { marginTop: "1.2%" },
                  ]}
                >
                  Hello {faker.name.firstName()} 👋
                </Text>
              </View>
            </View>
            <View style={tailwind("my-3")}>
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
          </>
          <>
            {pageData != undefined ? (
              <FlatList
                data={pageData}
                onEndReached={() => {
                  if (page != menuData.menu.length) {
                    setPage(page + 1);
                    setPageData([...pageData, ...[menuData.menu[page]]]);
                  }
                }}
                renderItem={({ item }) => {
                  return (
                    <>
                      <Text style={tailwind("font-extrabold text-3xl")}>
                        {item.category}
                      </Text>
                      <FlatList
                        data={item.items}
                        renderItem={({ item }) => {
                          return (
                            <View style={[tailwind("flex flex-1 ")]}>
                              <MenuCard
                                modalObjectSetter={setModalClickId}
                                ids={item.ids}
                                setModalVisible={setVisible}
                                style={tailwind("m-2")}
                                title={item.name}
                                desc={item.description}
                                image={item.image}
                                price={item.prices}
                              />
                            </View>
                          );
                        }}
                        key={getBreakPoint(window.width)}
                        numColumns={numColumns[getBreakPoint(window.width)]}
                        keyExtractor={(_, index) => index}
                      />
                    </>
                  );
                }}
              />
            ) : (
              <></>
            )}
          </>
        </>
      ) : (
        <></>
      )}
    </PageContainer>
  );
};

export default pure(MenuView);
