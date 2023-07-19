import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import HostView from "@/components/HostView";
import StreamChat from "@/components/StreamChat";


const Room = () => {

  const router = useRouter();

  return (
    <div className="bg flex flex-col justify-start items-center scrollbar-hidden content">
      <Navbar isSticky={true}></Navbar>
      <div className="w-full h-[15vh]"></div>
      <div className="w-[90%] h-[100vh] mt-10 flex flex-row justify-between items-start">
        <HostView></HostView>
        <StreamChat></StreamChat>
      </div>
    </div>
  );
};

export default Room;

{/* <span className="text-white font-rubik font-bold text-[1.5rem]">Exclusive</span> */}
{/* //TODO make this conditional render */}
