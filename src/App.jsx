import axios from "axios";
import { UserContextProvider } from "./userContext";
import Routes from "./Routes";
import Counter from "./counter";

function App() {
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
