import { TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

const RoundButton = ({ style, title }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={[
        tailwind("flex justify-center items-center rounded-full p-4"),
        style,
      ]}
    >
      <Text style={tailwind("text-white text-xl font-bold")}>{title}</Text>
    </TouchableOpacity>
  );
};

export { RoundButton };
