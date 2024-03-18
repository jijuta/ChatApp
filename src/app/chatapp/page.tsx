"use client";

import { Meteors } from "@/components/ui/meteors";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const { v4: uuidv4 } = require("uuid");

function Room() {
  const router = useRouter();
  const [room, setRoom] = useState("");

  const makeuuid = () => {
    const uuid = uuidv4();
    setRoom(uuid);
  };

  useEffect(() => {
    makeuuid();
  }, []);

  const handleSubmit = (e: any, room: string) => {
    e.preventDefault();
    router.push(`/chatapp/${room}`);
  };

  return (
    <>
      <div className="flex sm:flex-col justify-center items-center gap-[15rem] sm:gap-[8rem] rounded-3xl bg-transparent w-[100%] h-dvh flex-row overflow-hidden">
        <div className="relative max-w-sm w-[50rem] sm:w-[80%] h-[15rem] md:h-2/2  ">
          <div className="absolute inset-0 h-full w-[30rem] sm:w-[100%] bg-gradient-to-r from-transparent to-blue-600 transform scale-[1.20] rounded-full blur-3xl flex justify-center items-center" />
          <div className="relative h-full w-[30rem] sm:w-[100%]  border border-white px-8 sm:py-6 overflow-hidden rounded-2xl shadow-2xl flex justify-center items-center">
            <div className="join flex flex-col justify-center items-center text-center">
              <h1 className="font-extrabold font-mono text-4xl sm:text-xl mb-4 text-center text-violet-100">
                Join Room
              </h1>
              <input
                className=" text-white text-lg bg-transparent border-2 mb-4 border-white focus:outline-none sm:h-10 placeholder-gray-400 py-2 px-4 w-full sm:rounded-md sm:w-20 sm:pl-2 sm:p-1 rounded-3xl"
                type="text"
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Write Room Name ..."
              />
              <button
                onClick={() => {
                  handleSubmit(event, room);
                }}
                className="visible sm:hidden text-white p-4 text-lg sm:text-[18px] font-extrabold bg-transparent border-2 border-white hover:bg-black hover:blue-600 hover:text-white rounded-full py-2 sm:rounded-md sm:w-20 sm:h-10 sm:text-white mt-4"
                type="submit"
              >
                Join Room
              </button>
              {/* sm wala niichu hai  */}
              <button
                className="sm:visible 2xl:hidden text-white sm:text-[18px] font-extrabold bg-transparent border-2 border-white hover:bg-black hover:blue-600 hover:text-white rounded-full p-4 px-6 sm:rounded-md  sm:text-white mt-4"
                type="submit"
                onClick={() => {
                  handleSubmit(event, room);
                }}
              >
                Join
              </button>
            </div>
            <Meteors number={12} />
          </div>
        </div>
        <div className="relative max-w-sm w-[50rem] sm:w-[80%] h-[15rem] md:h-2/2 ">
          <div className="absolute inset-0 h-full w-[30rem] sm:w-[100%] bg-gradient-to-r from-pink-800 to-transparent-500 transform scale-[1.20] rounded-full blur-3xl flex justify-center items-center" />
          <div className="relative h-full w-[30rem] sm:w-[100%] border-2 border-white px-8 sm:py-6 overflow-hidden rounded-2xl shadow-2xl flex justify-center items-center">
            <div className="join flex flex-col justify-center items-center text-center">
              <h1 className="font-extrabold font-mono text-4xl sm:text-xl mb-4 text-center text-violet-100">
                Create Room
              </h1>
              <button
                className="visible sm:hidden text-white p-4 text-lg sm:text-[18px] font-extrabold bg-transparent border-2 border-white hover:bg-black hover:blue-600 hover:text-white rounded-full py-2 sm:rounded-md sm:w-20 sm:h-10 sm:text-white mt-4"
                type="submit"
                onClick={() => {
                  handleSubmit(event, room);
                }}
              >
                Create Unique Room
              </button>
              {/* sm wala niichu hai  */}
              <button
                className="sm:visible 2xl:hidden text-white sm:text-[18px] font-extrabold bg-transparent border-2 border-white hover:bg-black hover:blue-600 hover:text-white rounded-full p-4 sm:rounded-md  sm:text-white mt-4"
                type="submit"
                onClick={() => {
                  handleSubmit(event, room);
                }}
              >
                Create
              </button>
            </div>
            <Meteors number={15} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
