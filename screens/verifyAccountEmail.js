import { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { resendVerificationEmail, verifyAccountEmail } from "../api/auth";

const VerifyAccountEmail = ({ route }) => {
  const tailwind = useTailwind();
  const [verification, setVerification] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await verifyAccountEmail(route.params.token, route.params.id);
      if (!res.ok) {
        if ((await res.json()).error == "invalid token") {
          setVerification(false);
        } else setVerification(true);
      }
    })();
  }, []);

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
        </View>
        <Text style={tailwind("text-black text-xl font-bold")}>
          {!verification ? "Your link has expired." : ""}
        </Text>
        <View>
          <TouchableOpacity
            style={[
              tailwind(
                "bg-green-600 mb-4 flex justify-center items-center p-2"
              ),
            ]}
            onPress={() => {
              if (!verification) {
                resendVerificationEmail(route.params.id);
              }
            }}
          >
            <Text style={tailwind("text-white text-lg font-bold")}>
              {verification
                ? "YOUR EMAIL IS BEEN VERIFIED SUCCESSFULLY ✔️"
                : "Re-send Email"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VerifyAccountEmail;
