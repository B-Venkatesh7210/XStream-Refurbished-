import { IChatData, IStreamData } from "@/utils/types";
import React, { useState } from "react";
import Image from "next/image";
import PolygonLogo from "../../assets/logos/PolygonLogo.png";

interface ChatMessageProps {
  chat: IChatData;
  streamData: IStreamData | undefined;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat, streamData }) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [nameColor, setNameColor] = useState(getRandomColor());

  return (
    <div className="w-full h-auto">
      {chat.isSubscriber || chat.sender == streamData?.streamer ? (
        <span className="w-full h-auto flex flex-row justify-start items-baseline bg-secondaryRed/20 border-primaryRed border-[1px] border-solid py-2 px-3 rounded-xl">
          <span
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-rubik font-bold text-[1.4rem] flex-col justify-start items-start"
            style={{ color: nameColor }}
          >
            <span>{chat.name}</span>
            {parseFloat(chat.amount.toString()) / 10 ** 18 > 0 && (
              <span className="flex flex-row justify-center items-center mt-1">
                <span className="text-white text-[1.4rem] font-rubik font-bold">
                  {parseFloat(chat.amount.toString()) / 10 ** 18}
                </span>
                <div className="h-[1.2rem] w-[1.2rem] ml-2">
                  <Image alt="Polygon Logo" src={PolygonLogo}></Image>
                </div>
              </span>
            )}
          </span>
          <span className="text-white font-rubik font-normal text-[1.1rem] mx-4">
            {chat.message}
          </span>
        </span>
      ) : (
        <span className="w-full h-auto flex flex-row justify-start items-baseline px-2">
          <span
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-rubik font-semibold text-[1rem] flex-col justify-start items-start"
            style={{ color: nameColor }}
          >
            <span>{chat.name}</span>
            {parseFloat(chat.amount.toString()) / 10 ** 18 > 0 && (
              <span className="flex flex-row justify-center items-center mt-1">
                <span className="text-white text-[1.2rem] font-rubik font-bold">
                  {parseFloat(chat.amount.toString()) / 10 ** 18}
                </span>
                <div className="h-[1.2rem] w-[1.2rem] ml-2">
                  <Image alt="Polygon Logo" src={PolygonLogo}></Image>
                </div>
              </span>
            )}
          </span>
          <span className="text-white font-rubik font-light text-[1rem] mx-4">
            {chat.message}
          </span>
        </span>
      )}
    </div>
  );
};

export default ChatMessage;
