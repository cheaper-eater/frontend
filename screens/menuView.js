/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Text,
  useWindowDimensions,
  View,
  FlatList,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { pure } from "react-recompose";
import PageContainer from "../components/pageContainer";
import { getBreakPoint } from "../utils/screen";
import { MenuCard } from "../components/cards";
import { detailStore } from "../api/detail";
import { CustomizationModal } from "../components/modal";

const MenuView = ({ route }) => {
  const [visible, setVisible] = useState(false);
  const [modalClickId, setModalClickId] = useState();
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();
  const [menuData, setMenuData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [pageData, setPageData] = useState(
    menuData === undefined ? undefined : [menuData.menu[0]]
  );
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      setMenuData(
        await detailStore(
          {
            postmates: route.params.postmates,
            grubhub: route.params.grubhub,
            doordash: route.params.doordash,
          },
          route.params.isRetail
        )
        // require("./menu.json")
      );
    })();
  }, []);

  useEffect(() => {
    if (menuData?.menu?.length) {
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
          <View>
            <Text style={tailwind("text-3xl font-extrabold")}>
              {menuData.name}
            </Text>
          </View>
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
              <View style={tailwind("flex flex-1 justify-center items-center")}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={true}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={tailwind("flex flex-1 justify-center items-center")}
                  >
                    <View
                      style={[
                        tailwind(
                          "m-10 bg-white p-5 pt-10 rounded-2xl items-center"
                        ),
                        {
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 4,
                          elevation: 5,
                        },
                      ]}
                    >
                      <Image
                        style={tailwind("w-14 h-14")}
                        source={require("../assets/icons/gold/warning.png")}
                      />
                      <Text
                        style={tailwind("mb-4 text-center text-xl font-bold")}
                      >
                        Menu not available at the moment
                      </Text>
                      <Pressable
                        style={[
                          tailwind("rounded-3xl p-3 bg-sky-600 m-2"),
                          { elevation: 2 },
                        ]}
                        onPress={() => {
                          navigation.goBack();
                        }}
                      >
                        <Text
                          style={tailwind("text-white font-bold text-center")}
                        >
                          Explore other restaurants
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
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
