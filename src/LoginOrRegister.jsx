import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { IoIosChatboxes } from "react-icons/io";

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
    console.log("login/reg------------->", data);
    setUserName(name);
    setId(data.id);
  }
  return (
    <div className="container w-100 min-vw-100">
      <div className="row min-vh-100 login-bg">
        <div className="col-12 login-section">
          <div className="login-screen  pe-5 py-3">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="d-flex flex-row">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                  className="form-control"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="form-control mx-3"
                />
                <button className="btn btn-primary">
                  {isLoginOrReg === "register" ? "Register" : "Login"}
                </button>
              </div>
              <div>
                {isLoginOrReg === "register" && (
                  <div className="text-center mt-2">
                    Already a member?
                    <a
                      href="#"
                      onClick={() => setIsLoginOrReg("login")}
                      className="px-1"
                    >
                      Login
                    </a>
                    Here
                  </div>
                )}
                {isLoginOrReg === "login" && (
                  <div className="text-center mt-2">
                    <small>
                      Don't have an Account ?
                      <a
                        href="#"
                        onClick={() => setIsLoginOrReg("register")}
                        className="px-1"
                      >
                        Register
                      </a>
                      Here
                    </small>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 max-vh-20 d-flex">
          <div className="col-6 d-flex flex-column align-items-center">
            <IoIosChatboxes className="chat-image" />
            <label className="text-white mt-3">Stay connect with your loved one</label>
          </div>
          <div className="col-6 d-flex flex-column align-items-end">
            <h1 className="text-white fw-bold">
              {" "}
              Engage and retain with dynamic conversations
            </h1>
            <label className="text-white">
              Power custom in-app communication with Shan-Chat's reliable chat
              API. Drive engagement, retention and conversions with the most
              feature-rich and scalable chat platform for web and mobile apps.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginOrRegister;
