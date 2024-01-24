import React, { useContext } from "react";
import LoginOrRegister from "./LoginOrRegister";
import { UserContext } from "./userContext";
import Chat from "./Chat";

function Routes() {
  const { userName, id } = useContext(UserContext);
  console.log("userName=============> ", userName);
  if (userName) {
    return <Chat />;
  }

  return <LoginOrRegister />;
}

export default Routes;
