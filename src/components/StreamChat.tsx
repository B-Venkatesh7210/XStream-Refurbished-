import React from "react";
import Image from "next/image";
import PolygonLogo from "../../assets/logos/PolygonLogo.png";

const StreamChat = () => {
  return (
    <div className="w-[40%] h-[75vh] flex flex-col justify-start items-center gap-2 mb-4 bg-primaryGrey border-[1px] border-secondaryGrey border-solid p-4">
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
          <span className="w-full h-auto flex flex-row justify-start items-baseline bg-secondaryRed/20 border-primaryRed border-[1px] border-solid p-2 rounded-xl">
            <span className="text-blue-800 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-rubik font-bold text-[1.2rem] flex-col justify-start items-start">
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
        </div>
      </div>
    </div>
  );
};

export default StreamChat;