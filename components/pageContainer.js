import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import Header from "./header";

const PageContainer = ({ children, style, setPopularRestaurants }) => {
  const tailwind = useTailwind();

  return (
    <View style={[tailwind("flex flex-1"), style]}>
      <Header setPopularRestaurants={setPopularRestaurants} />
      {children}
    </View>
  );
};

export default PageContainer;
