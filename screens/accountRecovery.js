import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRef } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";
import PageContainer from "../components/pageContainer";
import { passwordReset } from "../api/auth";

const AccountRecovery = () => {
  const { navigate } = useNavigation();
  const tailwind = useTailwind();
  const email = useRef("");

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
                placeholder="Email"
                icon={require("../assets/icons/black/at.png")}
                keyboardType="email-address"
                ref={email}
              />
            </View>
            <View>
              <RoundButton
                style={tailwind("bg-green-500 mb-2")}
                title="Send a request"
                onPress={async () => {
                  try {
                    const response = await passwordReset(email.current.value);
                    if (!response.ok) {
                      throw new Error("Invalid email");
                    }
                    Toast.show({
                      type: "success",
                      text1: "Check your email!",
                    });
                  } catch (err) {
                    console.error("error:" + err);
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: err.message,
                    });
                  }
                }}
              />
              <View style={tailwind("flex flex-row justify-center")}>
                <Text style={tailwind("text-lg font-bold mb-4 mr-1")}>
                  already have an account?
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigate("Login");
                  }}
                >
                  <Text
                    style={tailwind("text-xl text-lg font-bold text-green-500")}
                  >
                    login!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </PageContainer>
  );
};

export default AccountRecovery;
