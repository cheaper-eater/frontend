import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";
import PageContainer from "../components/pageContainer";
import { updatePassword } from "../api/auth";

const CreateNewPassword = ({ route }) => {
  const tailwind = useTailwind();
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const passwordProcessing = async () => {
    if (newPassword !== verifyPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match!",
      });
    } else {
      try {
        const response = await updatePassword(
          route.params.token,
          newPassword,
          route.params.id
        );
        if (!response.ok) {
          throw new Error("Backend Error: Try again later");
        }
        Toast.show({
          type: "success",
          text1: "Password reset successfully",
        });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.message,
        });
      }
    }
  };

  return (
    <PageContainer>
      <KeyboardAwareScrollView>
        <View style={tailwind("flex flex-1 sm:items-center")}>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          <View
            style={tailwind(
              "flex flex-1 justify-between sm:justify-center sm:w-1/2 md:w-1/3 xl:w-1/5"
            )}
          >
            <View>
              <Image
                style={tailwind("w-full h-[250px] mb-4")}
                resizeMode="contain"
                source={require("../assets/logos/logo.png")}
              />
              <IconInput
                style={tailwind("mb-4")}
                placeholder="New Password"
                icon={require("../assets/icons/black/key.png")}
                onChangeText={(text) => setNewPassword(text)}
                keyboardType="password"
                secureTextEntry={true}
              />
              <IconInput
                style={tailwind("mb-4")}
                placeholder="Verify New Password"
                icon={require("../assets/icons/black/key.png")}
                onChangeText={(text) => setVerifyPassword(text)}
                keyboardType="password"
                secureTextEntry={true}
              />
            </View>
            <View>
              <RoundButton
                style={tailwind("bg-green-500 mb-2")}
                title="Update your password"
                onPress={passwordProcessing}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </PageContainer>
  );
};

export default CreateNewPassword;
