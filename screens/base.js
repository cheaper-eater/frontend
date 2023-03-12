import { View, SafeAreaView, StatusBar } from "react-native";
import { useTailwind } from "tailwind-rn";

const Base = ({ children }) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex flex-1 bg-gray-100")}>
      <View style={tailwind("flex flex-1 m-2")}>
        {children}
        <StatusBar style="auto" barStyle="dark-content" />
      </View>
    </SafeAreaView>
  );
};

export default Base;
