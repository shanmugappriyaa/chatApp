import React, { useContext } from "react";
import LoginOrRegister from "./LoginOrRegister";
import { UserContext } from "./userContext";
import Chat from "./Chat";

function Routes() {
  const { userName, id } = useContext(UserContext);
  if (userName) {
     return <Chat></Chat>
    
  }

  return (
    // <Chat />
    <LoginOrRegister />
  );
}

export default Routes;
