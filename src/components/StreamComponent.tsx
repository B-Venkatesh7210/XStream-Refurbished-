import { IStreamData, IStreamerData } from "@/utils/types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSignerContext } from "@/contexts/signerContext";
import Thumbnail from "../../assets/images/thumbnail.jpg";
import IShowSpeed from "../../assets/images/IShowSpeed.jpg";

interface StreamComponentProps {
  livestream?: IStreamData | undefined;
}

const StreamComponent: React.FC<StreamComponentProps> = ({ livestream }) => {
  const [streamerData, setStreamerData] = useState<IStreamerData>();
  const { contract } = useSignerContext();

  const getStreamerData = async () => {
    const streamerData = await contract.addToStreamer(livestream?.streamer);
    setStreamerData(streamerData);
  };

  useEffect(() => {
    if (contract) {
      getStreamerData();
    }
  }, [contract]);

  return (
    <div
      className="h-[16rem] w-[21rem] glass-container flex flex-col justify-start items-center text-white hover:bg-secondaryRed/25 cursor-pointer"
      onClick={() => {
        // Handle click for the uppermost div here
        console.log(livestream?.categories);
      }}
    >
      <div className="relative h-[10rem] w-full">
        <Image
          alt="Stream Thumbnail"
          src={`https://ipfs.io/ipfs/${livestream?.thumbnail}`}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        ></Image>
        <div className="w-[3rem] py-[2px] absolute top-4 left-4 bg-primaryRed rounded-md flex flex-row justify-center items-center text-white font-rubik font-medium text-[0.8rem]">
          LIVE
        </div>
        {livestream?.exclusive && (
          <div className="w-[6rem] py-[2px] absolute bottom-4 right-4 bg-primaryRed rounded-md flex flex-row justify-center items-center text-white font-rubik font-medium text-[0.8rem]">
            EXCLUSIVE
          </div>
        )}
      </div>
      <div className="w-full h-full flex flex-row justify-start items-start mt-2 px-4">
        <div className="w-[40%] h-full">
          <div
            className="rounded-[50%] w-[2rem] h-[2rem] overflow-hidden bg-white/70"
            onClick={(e) => {
              e.stopPropagation();
              // Handle click for the image here
              console.log("Image clicked");
            }}
          >
            <Image
              alt="Profile Picture"
              //TODO add streamerData.profilePicture condition
              //@ts-ignore
              src={`https://ipfs.io/ipfs/${streamerData?.profilePicture}`}
              objectFit="cover"
              width={200}
              height={200}
            ></Image>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start ml-3 gap-1">
          <span
            className="w-full text-white font-rubik font-bold text-[1.2rem] overflow-hidden whitespace-nowrap overflow-ellipsis"
            style={{
              /* Set the maximum width for the title */
              maxWidth: "calc(100% - 3rem)", // Subtract the width of the image and some margin from the available width
            }}
          >
            {livestream?.title}
          </span>
          <span className="w-full text-white font-rubik font-normal text-[0.8rem]">
            {livestream?.streamerName}
          </span>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="w-auto px-[8px] py-[2px] rounded-lg bg-secondaryGrey text-white text-[0.6rem] font-rubik font-normal">
              Entertainment
            </span>
            <span className="w-auto px-[8px] py-[2px] rounded-lg bg-secondaryGrey text-white text-[0.6rem] font-rubik font-normal">
              Gaming
            </span>
            <span className="w-auto px-[8px] py-[2px] rounded-lg bg-secondaryGrey text-white text-[0.6rem] font-rubik font-normal">
              Reaction
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamComponent;
