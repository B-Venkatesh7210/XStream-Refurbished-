import React, { useState } from "react";
import Image from "next/image";
import PolygonLogo from "../../assets/logos/PolygonLogo.png";
import SendIcon from "@mui/icons-material/Send";

interface ChatProps {
  message: string;
  amount?: number;
}

const StreamChat = () => {
  const [chat, setChat] = useState<ChatProps>({
    message: "",
    amount: 0,
  });
  const handleMessageChange = (e: any) => {
    setChat({ ...chat, message: e.target.value });
  };
  const handleAmountChange = (e: any) => {
    setChat({ ...chat, amount: e.target.value });
  };
  const handleAllCheck = () => {
    let status = false;
    if (
      chat.message != ""
    ) {
      status = true;
    }
    return status;
  };

  return (
    <div className="w-[40%] h-[80vh] flex flex-col justify-start items-center gap-2 mb-4 bg-primaryGrey border-[1px] border-secondaryGrey border-solid p-4">
      <div className="w-full flex flex-row justify-between items-center">
        <span className="text-white text-[1.5rem] font-rubik font-bold">
          STREAM MONEY
        </span>
        <div className="flex flex-row justify-center items-center">
          <span className="text-white text-[1.5rem] font-rubik font-bold">
            3.475
          </span>
          <div className="h-[2rem] w-[2rem] ml-4">
            <Image alt="Polygon Logo" src={PolygonLogo}></Image>
          </div>
        </div>
      </div>
      <div className="w-[90%] bg-secondaryGrey h-[2px] mt-2"></div>
      <div className="w-full h-[70%] p-2 flex flex-col justify-start items-start">
        <div className="w-full flex flex-col justify-start items-center gap-2">
          {/* //TODO randomise color of name */}
          <span className="w-full h-auto flex flex-row justify-start items-baseline px-2">
            <span className="text-blue-800 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-rubik font-semibold text-[1.2rem] flex-col justify-start items-start">
              <span>Alexis</span>
              {/* //TODO conditional render the amount */}
              <span className="flex flex-row justify-center items-center mt-1">
                <span className="text-white text-[1.2rem] font-rubik font-semibold">
                  3.475
                </span>
                <div className="h-[1.2rem] w-[1.2rem] ml-2">
                  <Image alt="Polygon Logo" src={PolygonLogo}></Image>
                </div>
              </span>
            </span>
            <span className="text-white font-rubik font-light text-base mx-4">
              Here is a long message for my favourite streamer
            </span>
          </span>
          <span className="w-full h-auto flex flex-row justify-start items-baseline bg-secondaryRed/20 border-primaryRed border-[1px] border-solid py-2 px-3 rounded-xl">
            <span className="text-blue-800 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-rubik font-bold text-[1.4rem] flex-col justify-start items-start">
              <span>Alexis</span>
              {/* //TODO conditional render the amount */}
              <span className="flex flex-row justify-center items-center mt-1">
                <span className="text-white text-[1.4rem] font-rubik font-bold">
                  3.475
                </span>
                <div className="h-[1.2rem] w-[1.2rem] ml-2">
                  <Image alt="Polygon Logo" src={PolygonLogo}></Image>
                </div>
              </span>
            </span>
            <span className="text-white font-rubik font-normal text-[1.1rem] mx-4">
              Here is a long message for my favourite streamer from a subscriber
            </span>
          </span>
        </div>
      </div>
      <div className="w-[90%] bg-secondaryGrey h-[2px] mt-2"></div>
      <div className="w-[95%] flex-col justify-start items-start mt-2">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-[85%] h-[2.5rem] border-primaryRed border-2 border-solid rounded-md bg-[#1c1c1e] px-2 flex flex-col justify-center items-start">
            <textarea
              id="message"
              className="w-full mt-1 appearance-none resize-none bg-transparent border-none outline-none text-white text-[1rem] font-rubik"
              placeholder="Send a message"
              onChange={(e: any) => {
                handleMessageChange(e);
              }}
            />
          </div>
          <div className={`rounded-full w-[3rem] h-[3rem] ${handleAllCheck() ? "bg-secondaryRed border-[1px] border-primaryRed border-solid cursor-pointer" : "bg-secondaryGrey"} flex flex-row justify-center items-center`}>
            <SendIcon style={{fontSize: 25, color: "white"}}></SendIcon>
          </div>
        </div>
        <div className="w-full flex flex-row justify-start items-center mt-1">
          <div className="w-[20%] h-[2rem] border-primaryRed border-2 border-solid rounded-md bg-[#1c1c1e] px-2 flex flex-col justify-center items-start">
            <input
              type="number"
              min={0}
              id="amount"
              step={0.1}
              placeholder="Amount"
              className="appearance-none bg-transparent w-full border-none outline-none text-white text-[0.8rem] font-rubik"
              onChange={(e: any) => {
                handleAmountChange(e)
              }}
            />
          </div>
          <div className="h-[1.5rem] w-[1.5rem] ml-4">
            <Image alt="Polygon Logo" src={PolygonLogo}></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamChat;
