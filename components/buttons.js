import { TouchableOpacity, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import React, { useEffect, useState } from "react";

const RoundButton = ({ style, title, onPress }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[
        tailwind("flex justify-center items-center rounded-full p-4"),
        style,
      ]}
    >
      <Text style={tailwind("text-white text-xl font-bold")}>{title}</Text>
    </TouchableOpacity>
  );
};

const RadioButton = ({
  data,
  style,
  boxStyle,
  textStyle,
  initialSelection = -1,
  circleSize = 18,
  selectedButton = () => {},
  boxActiveBgColor = "#e1f5fe33",
  deactiveCircleColor = "#e2e2e2",
  activeCircleColor = "#03a9f4",
  boxDeactiveBgColor = "#fff",
  box = false,
}) => {
  const tailwind = useTailwind();
  const [activeIndex, setActiveIndex] = useState(-1);

  const changeRadio = (item, activeIndex) => {
    setActiveIndex(activeIndex);
    selectedButton(item);
  };

  useEffect(() => {
    if (initialSelection !== -1 && initialSelection <= data.length) {
      changeRadio(data[initialSelection - 1], initialSelection - 1);
    }
  }, [initialSelection]);

  return (
    <View style={style}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              box
                ? tailwind(
                    "flex flex-row rounded-lg border-2 px-2.5 py-3 mt-2.5"
                  )
                : tailwind("flex flex-row mt-2.5"),
              box && {
                backgroundColor:
                  activeIndex === index ? boxActiveBgColor : boxDeactiveBgColor,
                borderColor:
                  activeIndex === index
                    ? activeCircleColor
                    : deactiveCircleColor,
              },
              boxStyle,
            ]}
            activeOpacity={0.9}
            onPress={() => changeRadio(item, index)}
          >
            <View style={tailwind("flex flex-1 justify-center items-center")}>
              <View
                style={[
                  tailwind("rounded-full items-center justify-center"),
                  {
                    borderWidth: 1,
                    borderColor:
                      activeIndex === index
                        ? activeCircleColor
                        : deactiveCircleColor,
                    width: circleSize + 5,
                    height: circleSize + 5,
                  },
                ]}
              >
                <View
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                >
                  <View>
                    <View
                      style={[
                        tailwind("border-2 rounded-full"),
                        {
                          backgroundColor:
                            activeIndex === index
                              ? activeCircleColor
                              : deactiveCircleColor,
                          borderColor:
                            activeIndex === index
                              ? activeCircleColor
                              : deactiveCircleColor,
                          width: circleSize,
                          height: circleSize,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                tailwind("justify-center items-start px-2.5"),
                { flex: 6 },
              ]}
            >
              <Text
                style={[
                  {
                    color: "#383838",
                  },
                  textStyle,
                ]}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CheckBox = ({
  data,
  style,
  boxStyle,
  textStyle,
  boxSize = 18,
  selectedBoxes = () => {},
  boxActiveBgColor = "#e1f5fe33",
  deactiveBoxColor = "#e2e2e2",
  activeBoxColor = "#03a9f4",
  boxDeactiveBgColor = "#fff",
  box = false,
}) => {
  const tailwind = useTailwind();
  const [activeIndex, setActiveIndex] = useState([]);

  const changeSelectedBox = (item) => {
    if (activeIndex.indexOf(item) != -1) {
      setActiveIndex(
        activeIndex
          .slice(0, activeIndex.indexOf(item))
          .concat(activeIndex.slice(activeIndex.indexOf(item) + 1))
      );
    } else {
      setActiveIndex(activeIndex.concat([item]));
    }
  };

  useEffect(() => {
    selectedBoxes(activeIndex);
  }, [activeIndex]);

  return (
    <View style={style}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              box
                ? tailwind(
                    "flex flex-row rounded-lg border-2 px-2.5 py-3 mt-2.5"
                  )
                : tailwind("flex flex-row mt-2"),
              box && {
                backgroundColor:
                  activeIndex.indexOf(item) != -1
                    ? boxActiveBgColor
                    : boxDeactiveBgColor,
                borderColor:
                  activeIndex.indexOf(item) != -1
                    ? activeBoxColor
                    : deactiveBoxColor,
              },
              boxStyle,
            ]}
            activeOpacity={0.9}
            onPress={() => changeSelectedBox(item, index)}
          >
            <View style={tailwind("flex flex-1 items-center justify-center")}>
              <View
                style={[
                  tailwind(
                    "border-x border-y rounded justify-center items-center"
                  ),
                  {
                    borderColor:
                      activeIndex.indexOf(item) != -1
                        ? activeBoxColor
                        : deactiveBoxColor,
                    width: boxSize + 5,
                    height: boxSize + 5,
                  },
                ]}
              >
                <View
                  style={{
                    opacity: activeIndex.indexOf(item) !== -1 ? 1 : 0,
                  }}
                >
                  <View>
                    <View
                      style={[
                        tailwind("border-x border-y rounded"),
                        {
                          backgroundColor:
                            activeIndex.indexOf(item) != -1
                              ? activeBoxColor
                              : deactiveBoxColor,
                          borderColor:
                            activeIndex.indexOf(item) != -1
                              ? activeBoxColor
                              : deactiveBoxColor,
                          width: boxSize,
                          height: boxSize,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                tailwind("justify-center items-start px-px"),
                { flex: 6 },
              ]}
            >
              <Text
                style={[
                  {
                    color: "#383838",
                  },
                  textStyle,
                ]}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export { RoundButton, RadioButton, CheckBox };
