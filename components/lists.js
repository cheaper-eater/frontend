import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useTailwind } from "tailwind-rn";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionList = ({
  title,
  children,
  required = false,
  listStyle,
  listBgColor,
}) => {
  const [open, setOpen] = useState(false);
  const tailwind = useTailwind();
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI / 2}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          toggleListItem();
          setOpen(!open);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      >
        <View
          style={[
            tailwind(
              " flex flex-row justify-between items-center border-y border-neutral-200 p-4 pl-6"
            ),
            listStyle,
          ]}
        >
          <View style={tailwind("pl-6")}>
            <Text style={tailwind("text-base")}>{title}</Text>
            {required ? (
              <Text style={tailwind("text-red-500")}>Required (*)</Text>
            ) : null}
          </View>
          <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
            <Image
              source={require("../assets/icons/black/right_arrow.png")}
              style={tailwind("w-5 h-5")}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      {Platform.OS === "web" ? (
        <Animated.View
          style={[listBgColor, { overflow: "hidden", height: bodyHeight }]}
        >
          <View
            style={tailwind("p-4 pl-6")}
            onLayout={(event) =>
              setBodySectionHeight(event.nativeEvent.layout.height)
            }
          >
            {children}
          </View>
        </Animated.View>
      ) : open ? (
        <View style={[listBgColor, tailwind("p-4 pl-6")]}>{children}</View>
      ) : null}
    </>
  );
};

export { AccordionList };
