import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useRef } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";
import PageContainer from "../components/pageContainer";
import { login } from "../api/auth";

const Login = () => {
  const { navigate } = useNavigation();
  const tailwind = useTailwind();
  const email = useRef("");
  const password = useRef("");
  return (
    <PageContainer>
      <View style={tailwind("flex flex-1 sm:items-center")}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <View
          style={tailwind(
            "flex flex-1 justify-between sm:justify-center sm:w-1/2 md:w-1/3 xl:w-1/5"
          )}
        >
          <View>
            <Image
              style={tailwind("w-full h-[200px] mb-4")}
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
            <IconInput
              style={tailwind("mb-4")}
              placeholder="Password"
              icon={require("../assets/icons/black/key.png")}
              secureTextEntry={true}
              ref={password}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigate("ForgotPassword");
              }}
            >
              <Text
                style={tailwind(
                  "text-center text-lg font-bold mb-2 text-green-500"
                )}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>

            <RoundButton
              onPress={async () => {
                try {
                  const response = await login(
                    email.current.value,
                    password.current.value
                  );
                  if (!response.ok) {
                    throw new Error(`Server Error: ${response.status}`);
                  }
                  Toast.show({
                    type: "success",
                    text1: "Login successful!",
                  });
                  email.current.clear();
                  password.current.clear();
                } catch (error) {
                  console.error("error:", error);
                  Toast.show({
                    type: "error",
                    text1: error.message,
                  });
                }
              }}
              style={tailwind("bg-green-500 mb-2")}
              title="Login"
            />

            <View style={tailwind("flex flex-row justify-center")}>
              <Text style={tailwind("text-lg font-bold mb-4 mr-1")}>
                {"Don't have an account?"}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigate("SignUp");
                }}
              >
                <Text
                  style={tailwind("text-xl text-lg font-bold text-green-500")}
                >
                  Sign up!
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={tailwind("text-lg font-bold text-center mb-4")}>
              Sign in with
            </Text>
            <View style={tailwind("flex items-center")}>
              <View style={tailwind("flex-row justify-between w-1/2")}>
                <TouchableOpacity>
                  <Image
                    style={tailwind("w-10 h-10")}
                    resizeMode="contain"
                    source={require("../assets/icons/socialmedia/google.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                    style={tailwind("w-10 h-10")}
                    resizeMode="contain"
                    source={require("../assets/icons/socialmedia/facebook.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                    style={tailwind("w-10 h-10")}
                    resizeMode="contain"
                    source={require("../assets/icons/socialmedia/twitter.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PageContainer>
  );
};

export default Login;
