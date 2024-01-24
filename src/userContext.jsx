import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get("/user/profile").then((response) => {
      setId(response.data.userId);
      setUserName(response.data.userName);
    });
  }, []);
  return (
    <UserContext.Provider value={{ userName, setUserName, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
