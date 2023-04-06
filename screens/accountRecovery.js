import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useRef } from "react";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";
import { passwordReset } from "../api/auth";

const AccountRecovery = () => {
  const tailwind = useTailwind();
  const email = useRef("");

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
            onPress={passwordReset(email.current.value)}
          />
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
        </View>
      </View>
    </View>
  );
};

export default AccountRecovery;
