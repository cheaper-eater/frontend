import React from "react";
import { TailwindProvider } from "tailwind-rn";
import AddressDetailsProvider from "./contexts/AddressContext";
import utilities from "./tailwind.json";
// import Checkout from "./screens/checkout";
// import Base from "./screens/base";
// import Login from "./screens/login";
// import Index from "./screens/index";
// import ListView from "./screens/listView";
// import SignUp from "./screens/signUp";
// import AccountRecovery from "./screens/accountRecovery";
// import DbTest from "./screens/dbTest";
// import AddressDetailsProvider from "./contexts/AddressContext";
import Pages from "./routes/routes";
// import CreateNewPassword from "./screens/createNewPassword";

export default function App() {
  return (
    <AddressDetailsProvider>
      <TailwindProvider utilities={utilities}>
        {/* <Login /> */}
        {/* <Index /> */}
        {/* <ListView /> */}
        {/* <SignUp/> */}
        {/* <Checkout /> */}
        {/* <CreateNewPassword /> */}
        {/* <AccountRecovery /> */}
        {/* <DbTest /> */}
        <Pages />
      </TailwindProvider>
    </AddressDetailsProvider>
  );
}
