import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";
import { updatePassword } from "../api/auth";

const CreateNewPassword = ({ route }) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex flex-1 sm:items-center")}>
      <View
        style={tailwind(
          "flex flex-1 justify-between sm:justify-center sm:w-1/2 md:w-1/3 xl:w-1/5"
        )}
      >
        <View>
          <Image
            style={tailwind("w-full h-[250px] mb-4")}
            resizeMode="contain"
            source={require("../assets/logos/celogo.png")}
          />
          <IconInput
            style={tailwind("mb-4")}
            placeholder="New Password"
            icon={require("../assets/icons/black/key.png")}
            keyboardType="password"
            secureTextEntry={true}
          />
          <IconInput
            style={tailwind("mb-4")}
            placeholder="Verify New Password"
            icon={require("../assets/icons/black/key.png")}
            keyboardType="password"
            secureTextEntry={true}
          />
        </View>
        <View>
          <RoundButton
            style={tailwind("bg-green-500 mb-2")}
            title="Update your password"
            onPress={updatePassword(
              route.params.token,
              "newPassword",
              route.params.id
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateNewPassword;
