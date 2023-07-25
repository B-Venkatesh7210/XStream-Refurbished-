import React from "react";
import Image from "next/image";
import Thumbnail from "../../assets/images/thumbnail.jpg";
import IShowSpeed from "../../assets/images/IShowSpeed.jpg";
import { ICollectionData } from "@/utils/types";


interface VideoComponentProps {
  collection: ICollectionData;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ collection }) => {
  return (
    <div
      className="h-[16rem] w-[21rem] glass-container flex flex-col justify-start items-center text-white hover:bg-secondaryRed/25 cursor-pointer"
      onClick={() => {
        // Handle click for the uppermost div here
        console.log("Upperdiv clicked");
      }}
    >
      <div className="relative h-[10rem] w-full">
        <Image
          alt="Stream Thumbnail"
          src={collection.thumbnail}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        ></Image>
        <div className="w-[6rem] py-[2px] absolute bottom-4 right-4 bg-primaryRed rounded-md flex flex-row justify-center items-center text-white font-rubik font-medium text-[0.8rem]">
          EXCLUSIVE
        </div>
      </div>
      <div className="w-full h-full flex flex-row justify-start items-start mt-2 px-4">
        <div className="w-[20%] h-full">
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
              //@ts-ignore
              src={IShowSpeed}
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
            {collection.title}
          </span>
          <span className="w-full text-white font-rubik font-normal text-[0.8rem]">
            {collection.streamerName}
          </span>
          <div className="flex flex-row justify-start items-center gap-2">
            {collection.categories.map((category, index) => (
              <span
                key={index}
                className="w-auto px-[8px] py-[2px] rounded-lg bg-secondaryGrey text-white text-[0.6rem] font-rubik font-normal"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
