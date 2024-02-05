import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlineWechat } from "react-icons/ai";

import { IoMdAttach } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa6";
import { UserContext } from "../src/userContext";
import { uniqBy, values } from "lodash";
import axios from "axios";
import Person from "./Persons";
import moment from "moment";

function Chat() {
  const socketPath =
    process.env.NODE_ENV === "development"
      ? "ws://localhost:8000"
      : "ws://shan-chat.onrender.com";
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { userName, id, setId, setUserName } = useContext(UserContext);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [offlinePeople, setOfflinePeolple] = useState({});

  const divUnderMessages = useRef();

  useEffect(() => {
    connectToWs();
  }, [selectedUserId]);

  function connectToWs() {
    const ws = new WebSocket(socketPath);
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconnected.Trying to reconnect");
        connectToWs();
      }, 1000);
    });
  }

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach((userInfo) => {
      people[userInfo?.userId] = userInfo?.userName;
    });
    setOnlinePeople(people);
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    console.log({ ev, messageData });
    if (messageData["online"]) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      console.log(
        "sender---------> ",
        messageData.sender,
        selectedUserId,
        messageData.sender === selectedUserId
      );
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  }

  function sendMessage(ev, file = null) {
    if (ev) ev.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
        file,
      })
    );
    if (file) {
      axios.get("/user/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    } else {
      setNewMessageText("");
      setMessages((prev) => [
        ...prev,
        {
          text: newMessageText,
          sender: id,
          recipient: selectedUserId,
          _id: Date.now(),
        },
      ]);
    }
  }
  function sendFile(ev) {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };
  }
  useEffect(() => {
    const dive = divUnderMessages.current;
    if (dive) {
      dive.scrollIntoView({ behaviour: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    axios.get("/user/people").then((res) => {
      const offlinePeopleArr = res.data
        .filter((p) => p._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));

      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p;
      });
      console.log(offlinePeople, offlinePeopleArr);
      setOfflinePeolple(offlinePeople);
    });
  }, [onlinePeople]);

  useEffect(() => {
    if (selectedUserId) {
      axios.get("/user/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  function logout() {
    axios.post("/user/logout").then(() => {
      setWs(null);
      setId(null);
      setUserName(null);
    });
  }

  const onlinePeopleExlUser = { ...onlinePeople };
  delete onlinePeopleExlUser[id];
  const messageWithoutDups = uniqBy(messages, "_id");
  console.log("messageWithoutDups==================> ", messageWithoutDups);
  console.log("messages==================> ", messages);
  return (
    <div className="main-chat">
      <div className="left-chat">
        <div className="app-title">
          <div className="header-div">
            <AiOutlineWechat /> MernChat
            <div className="logout-div">
              <FaUserCheck />
              <span className="log-icon">{userName}</span>
              <button onClick={logout} className="log-out">
                Logout
              </button>
            </div>
          </div>
          <div>
            {Object.keys(onlinePeopleExlUser).map((userId, index) => (
              <Person
                key={userId}
                id={userId}
                online={true}
                userName={onlinePeopleExlUser[userId]}
                onClick={() => setSelectedUserId(userId)}
                selected={userId === selectedUserId}
              />
            ))}
          </div>
          <div>
            {Object.keys(offlinePeople).map((userId, index) => (
              <Person
                key={userId}
                id={userId}
                online={false}
                userName={offlinePeople[userId].userName}
                onClick={() => setSelectedUserId(userId)}
                selected={userId === selectedUserId}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="center-chat">
        <div className="cen-chat">
          {!selectedUserId && (
            <div className="message-center">
              <div className="message-text">
                {" "}
                &larr; Select a Person from the Side Bar
              </div>
            </div>
          )}
          {!!selectedUserId && (
            // <div className="relative">
            //   <div className="over-flow">

            //     <div ref={divUnderMessages}> </div>
            //   </div>
            // </div>
            <div>
              {messageWithoutDups.map((message) => (
                <div
                  key={message._id}
                  className={message.sender === id ? "text-right" : "text-left"}
                >
                  <div className="msg">{message.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form onSubmit={sendMessage} className="chat-div">
            <input
              type="text"
              value={newMessageText}
              onChange={(ev) => setNewMessageText(ev.target.value)}
              placeholder="Type Your Message Here"
              className="chat-input"
            />
            <button type="button" className="file-button">
              <IoMdAttach />
            </button>
            <button type="submit" className="send-button">
              <IoSendSharp />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Chat;
