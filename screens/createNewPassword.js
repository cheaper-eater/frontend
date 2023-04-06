import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";

const CreateNewPassword = ({ route }) => {
  const tailwind = useTailwind();

  const updatePassword = async () => {
    await fetch("http://localhost:8000/api/auth/resetAccountPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passwordResetToken: route.params.token,
        newPassword: "newPassword",
        userId: route.params.id,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
  };
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
            onPress={updatePassword}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateNewPassword;
