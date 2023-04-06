import { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

const VerifyAccountEmail = ({ route }) => {
  const tailwind = useTailwind();
  const [verification, setVerification] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/auth/verifyAccountEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        verifyAccountEmailToken: route.params.token,
        userId: route.params.id,
      }),
    }).then(async (res) => {
      if (!res.ok) {
        if ((await res.json()).error == "invalid token") {
          setVerification(false);
        } else setVerification(true);
      }
    });
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
            source={require("../assets/logos/celogo.png")}
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
                fetch(
                  "http://localhost:8000/api/auth/resendVerificationEmail",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userId: route.params.id,
                    }),
                  }
                )
                  .then((response) => response.json())
                  .then((response) => console.log(response))
                  .catch((err) => console.error(err));
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
