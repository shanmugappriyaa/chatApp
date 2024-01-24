import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";

function LoginOrRegister() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName, setId } = useContext(UserContext);
  const [isLoginOrReg, setIsLoginOrReg] = useState("login");

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrReg === "register" ? "register" : "login";
    const { data } = await axios.post(`user/${url}`, {
      userName: name,
      password,
    });
    console.log('login/reg------------->',data);
    setUserName(name);
    setId(data.id);
  }
  return (
    <div className="login-screen">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          className="login-user"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="login-user"
        />
        <button className="login-btn">
          {isLoginOrReg === "register" ? "Register" : "Login"}
        </button>
        <div>
          {isLoginOrReg === "register" && (
            <div>
              Already a member?
              <button
                className="login-button"
                onClick={() => setIsLoginOrReg("login")}
              >
                Login Here
              </button>
            </div>
          )}
          {isLoginOrReg === "login" && (
            <div>
              Don't have an Account
              <button
                className="login-button"
                onClick={() => setIsLoginOrReg("register")}
              >
                Register Here
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginOrRegister;
