import React from "react";
import { TailwindProvider } from "tailwind-rn";
import AddressDetailsProvider from "./contexts/AddressContext";
import utilities from "./tailwind.json";
import Pages from "./routes/routes";

export default function App() {
  return (
    <AddressDetailsProvider>
      <TailwindProvider utilities={utilities}>
        <Pages />
      </TailwindProvider>
    </AddressDetailsProvider>
  );
}
