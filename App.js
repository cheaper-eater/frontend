import React, {useState} from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";


import Base from "./screens/base";
import Index from "./screens/index";
import ListView from "./screens/listView";
import Login from "./screens/login";
import SignUp from "./screens/signUp";
import AccountRecovery from "./screens/accountRecovery";
import DbTest from "./screens/dbTest";
import FoodTypes from "./screens/foodTypes";

export default function App() {

  const[authenticated, setAuthenticated] = useState(false);

  const auth = () => {

    console.log("Authenticated, redirecting to fooTypes");
    setAuthenticated(true);

  }


  if(authenticated){
    return (
      <TailwindProvider utilities={utilities}>
        <Base>
          <FoodTypes/>
        </Base>
      </TailwindProvider>
    )
  }

  return (
    <TailwindProvider utilities={utilities}>
      <Base>
        {/* <Login /> */}
        {/* <Index /> */}
        {/*<ListView />*/}
        {/* <MenuList/> */}
        <SignUp singUpAuth = { () => auth() } />
        {/*<AccountRecovery/>*/}
        {/* <DbTest /> */}
      </Base>
    </TailwindProvider>
  );
}
