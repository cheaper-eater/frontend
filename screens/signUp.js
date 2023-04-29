import { useRef } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { IconInput } from "../components/inputs";
import PageContainer from "../components/pageContainer";
import { signUp } from "../api/auth";

const SignUp = () => {
  const { navigate } = useNavigation();
  const tailwind = useTailwind();
  const email = useRef("");
  const name = useRef("");
  const password = useRef("");
  return (
    <PageContainer>
      <Toast />
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
              source={require("../assets/logos/logo.png")}
            />
            <IconInput
              style={tailwind("mb-4")}
              placeholder="name"
              icon={require("../assets/icons/black/person.png")}
              ref={name}
            />
            <IconInput
              style={tailwind("mb-4")}
              placeholder="email"
              icon={require("../assets/icons/black/at.png")}
              keyboardType="email-address"
              ref={email}
            />
            <IconInput
              style={tailwind("mb-4")}
              placeholder="password"
              icon={require("../assets/icons/black/key.png")}
              secureTextEntry={true}
              ref={password}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const res = await signUp(
                    name.current.value,
                    email.current.value,
                    password.current.value
                  );
                  const data = await res.json();
                  if (res.ok) {
                    Toast.show({
                      type: "success",
                      text1: "Account created successfully!",
                      text2:
                        "Please check your email to complete verification.",
                    });
                    name.current.clear();
                    email.current.clear();
                    password.current.clear();
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "Error creating account",
                      text2: data.message,
                    });
                  }
                } catch (error) {
                  console.error(error);
                  Toast.show({
                    type: "error",
                    text1: "Error creating account",
                    text2: error.message,
                  });
                }
              }}
              style={[
                tailwind(
                  "bg-green-500 mb-2 flex justify-center items-center rounded-full p-4"
                ),
              ]}
            >
              <Text style={tailwind("text-white text-xl font-bold")}>
                Sign Up
              </Text>
            </TouchableOpacity>

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
            <View style={tailwind("flex-row")}>
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
            </View>
          </View>
        </View>
      </View>
    </PageContainer>
  );
};

export default SignUp;
