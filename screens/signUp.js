import { useRef } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

import { IconInput } from "../components/inputs";

const SignUp = () => {
  const tailwind = useTailwind();
  const email = useRef("");
  const name = useRef("");
  const password = useRef("");
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
            onPress={() => {
              fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: name.current.value,
                  email: email.current.value,
                  password: password.current.value,
                }),
              });
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

            <TouchableOpacity>
              <Text
                style={tailwind("text-xl text-lg font-bold text-green-500")}
              >
                login!
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tailwind("flex-row")}>
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              <TouchableOpacity>
                <Image
                  style={tailwind("w-10 h-10")}
                  resizeMode="contain"
                  source={require("../assets/icons/socialmedia/google.png")}
                />
              </TouchableOpacity>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <TouchableOpacity>
                <Image
                  style={tailwind("w-10 h-10")}
                  resizeMode="contain"
                  source={require("../assets/icons/socialmedia/facebook.png")}
                />
              </TouchableOpacity>
            </a>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
