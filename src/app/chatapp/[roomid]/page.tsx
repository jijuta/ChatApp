"use client";

import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

// const socket = io("http://localhost:4000/");
const socket = io("https://chatserver-q3gi.onrender.com/");

interface Message {
  username: string;
  message: string;
  sentByCurrentUser?: boolean;
  timestamp: string;
  room: string;
  online: number;
}

export default function Page({ params }: { params: { roomid: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [send, setSend] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(params.roomid);
  const [online, setOnline] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setOnline(message.online);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.on("getonlineuser", (onlineuserdata) => {
      setOnline(onlineuserdata);
    });

    return () => {
      socket.off("getonlineuser");
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (send.trim() !== "" && username.trim() !== "" && room.trim() !== "") {
      const timestamp = getCurrentTime();
      const message: Message = {
        username,
        message: send,
        timestamp,
        room,
        online,
      };
      socket.emit("message", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, sentByCurrentUser: true },
      ]);
      setSend("");
    }
  }

  function handleJoinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username.trim() !== "" && room.trim() !== "") {
      socket.emit("getonlineuser", { room, online });
      socket.emit("join", { username, room });
      setUsername(username);
      setRoom(room);
    }
  }

  return (
    <>
      <div className="flex flex-col h-[90vh] bg-transparent">
        <h1 className="font-extrabold font-font-font-sans text-4xl sm:text-xl mb-2 text-center text-violet-100">
          Private Chat ( {online} Users Online)
        </h1>
        <div className="flex sm:flex-col flex-grow overflow-hidden">
          <div className="flex flex-col w-3/4 sm:h-[72vh] sm:w-full border-gray-700 border-r sm:border-0">
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-scroll px-5 py-2 scrolleffect sm:border-b border-gray-700"
            >
              <ul className="space-y-4 ">
                {messages.map((messageObj, index) => (
                  <li
                    key={index}
                    className={`p-[14px] px-6 sm:flex 2xl:flex sm:px-4 sm:py-2  flex-wrap h-fit gap-3 items-center justify-evenly rounded-3xl  ${
                      messageObj.sentByCurrentUser
                        ? "bg-purple-700 text-right min-w-[10rem] sm:min-w-[5rem]  max-w-fit ml-auto"
                        : "bg-red-600 text-left min-w-[10rem] sm:min-w-[5rem] max-w-fit mr-auto"
                    }`}
                  >
                    <span className=" text-gray-200 sm:text-[16px] sm:font-mono ">
                      {messageObj.username} :
                    </span>
                    <pre className="text-white text-xl sm:text-[16px] sm:font-serif sm:font-light font-bold text-wrap auto-cols-max overflow-hidden">
                      {messageObj.message}
                    </pre>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="bg-transparent p-2 ">
              <input
                className="text-white text-lg sm:w-[75%] sm:py-[4px] sm:pl-4 bg-transparent border border-gray-400 focus:outline-none placeholder-gray-600 py-4 px-10 rounded-full w-[75%] sm:rounded-xl"
                type="text"
                value={send}
                onChange={(e) => setSend(e.target.value)}
                placeholder="Type your message"
              />
              <button
                className="text-black sm:text-[17px] sm:text-center sm:w-[20%] text-2xl font-extrabold bg-green-600 border-2 border-black hover:bg-black hover:text-white hover:border-green-600 rounded-full sm:rounded-md px-10 sm:p-1 py-3 ml-4 w-[20%] sm:text-white"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
          <div className="flex flex-col w-[25%] bg-transparent p-4  my-auto sm:flex-row sm:justify-between ">
            <form
              onSubmit={handleJoinRoom}
              className="flex flex-col space-y-4 sm:flex-row sm:mb-4 sm:gap-5  "
            >
              <input
                className="sm:hidden text-white text-lg bg-transparent border border-gray-300 focus:outline-none placeholder-gray-400 py-2 px-4 sm:rounded-md sm:w-48 sm:pl-2 sm:p-1  rounded-full sm:h-10 "
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Username"
              />
              {/* sm */}
              <input
                className="sm:visible 2xl:hidden  text-white text-lg bg-transparent border border-gray-300 focus:outline-none placeholder-gray-400 py-2 px-4 sm:rounded-md sm:w-40 sm:pl-2 sm:p-1  rounded-full sm:h-10 "
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              {/* <input
                className="sm:hidden text-white text-lg bg-transparent border border-white focus:outline-none sm:h-10  placeholder-gray-400 py-2 px-4 sm:rounded-md sm:w-20 sm:pl-2 sm:p-1 rounded-full"
                type="text"
                // value={params.roomid}
                onChange={(e) => setRoom(params.roomid)}
                placeholder="Room Name"
              /> */}
              {/* sm */}
              {/* <input
                className="sm:visible 2xl:hidden text-white text-lg bg-transparent border border-white focus:outline-none sm:h-10  placeholder-gray-400 py-2 px-4 sm:rounded-md sm:w-20 sm:pl-2 sm:p-1 rounded-full"
                type="text"
                // value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Room"
              /> */}
              <button
                className="text-black text-lg sm:text-[18px] font-extrabold bg-blue-600 border-2 border-blue-600 hover:bg-black hover:blue-600 hover:text-white rounded-full py-2 sm:rounded-md sm:w-20 sm:h-10 sm:text-white"
                type="submit"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
