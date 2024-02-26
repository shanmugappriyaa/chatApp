import axios from "axios";
import { UserContextProvider } from "./userContext";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const base_url =
  process.env.NODE_ENV === "development" ? "http://localhost:8000/" : "https://shan-chat.onrender.com/";
  axios.defaults.baseURL = base_url;
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
