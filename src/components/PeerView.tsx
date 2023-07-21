import React from "react";
import Image from "next/image";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import { Video, Audio } from "@huddle01/react/components";
import {
  useLobby,
  useAudio,
  useVideo,
  usePeers,
  useRoom,
  useLivestream,
} from "@huddle01/react/hooks";
import { useRouter } from "next/router";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import SecondaryButton from "./SecondaryButton";

const PeerView = () => {
  const { peers } = usePeers();
  const router = useRouter();

  return (
    <div className="w-[50%] h-auto flex flex-col justify-start items-start gap-2 mb-4">
      <div className="w-full flex flex-row justify-between items-start">
        <div className="flex flex-row justify-start items-start">
          <div className="relative flex flex-col justify-start items-center w-[5rem] h-[5rem]">
            <div className="rounded-[50%] w-[4rem] h-[4rem] overflow-hidden">
              <Image
                alt="Profile Picture"
                src={ProfilePicture}
                objectFit="cover"
              ></Image>
            </div>
            <div className="absolute bottom-1 h-[1.4rem] w-[3rem] rounded-md bg-primaryRed text-white font-rubik font-semibold text-[0.7rem] flex flex-col justify-center items-center">
              LIVE
            </div>
          </div>
          <div className="w-[80%] flex flex-col justify-start items-start ml-4">
            <div className="relative h-[2.2rem] w-auto min-w-[6rem] bg-primaryGrey rounded-lg flex flex-row justify-start items-center py-2 cursor-pointer hover:bg-secondaryGrey mb-2">
              <span className="text-textRed font-rubik font-bold ml-3">
                Xstream
              </span>
            </div>
            <span className="text-white font-rubik font-bold text-[1.5rem] ml-2 w-full max-h-[5rem] h-auto inline-block break-words content-fit">
              This is the title of the streamer
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end h-full">
          <span className="text-textRed font-rubik font-semibold text-[1.2rem]">
            Exclusive
          </span>
          <span className="text-white font-rubik font-semibold text-[1rem] mt-5">
            {router.query.roomId}
          </span>
        </div>
      </div>

      <div className="w-full h-full aspect-video bg-secondaryRed/10 border-solid border-[1px] border-primaryRed rounded-xl relative overflow-hidden mt-4 border-shadow">
        {Object.values(peers)
          .filter((peer: any) => peer.cam)
          .map((peer: any) => (
            <div
              key={peer.peerId}
              className="h-[28rem] mt-4 aspect-video bg-zinc-800/50 rounded-2xl relative overflow-hidden"
            >
              <Video
                peerId={""}
                track={peer.cam}
                className="h-full w-full object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                debug
              />
            </div>
          ))}
      </div>
      <div className="w-full flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row justify-start items-center">
          <div className="relative flex flex-row justify-center items-baseline p-[6px] bg-secondaryGrey w-auto gap-2">
            <PeopleIcon
              style={{
                fontSize: 22,
                color: "white",
                position: "absolute",
                left: 8,
              }}
            ></PeopleIcon>
            <span className="text-textRed font-rubik font-medium text-[1rem] ml-8">
              4500
            </span>
            <span className="text-textRed font-rubik font-normal text-[0.8rem]">
              live viewers
            </span>
          </div>
          <ShareIcon
            style={{ fontSize: 30, color: "white", marginLeft: "1rem" }}
          ></ShareIcon>
        </div>
        <div className="flex flex-row justify-start items-center gap-4">
          <SecondaryButton
            h="h-[2.2rem]"
            textSize="text-[1rem]"
            action1={() => {
              console.log("BG is red and disabled is false");
            }}
            action2={() => {
              console.log("BG is grey and disabled is true");
            }}
            disabled={false}
            iconType="follow"
          ></SecondaryButton>
          <SecondaryButton
            h="h-[2.2rem]"
            textSize="text-[1rem]"
            action1={() => {
              console.log("BG is red and disabled is false");
            }}
            action2={() => {
              console.log("BG is grey and disabled is true");
            }}
            disabled={true}
            iconType="subscribe"
          ></SecondaryButton>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-4 gap-4 h-auto w-full mt-6">
        <div className="w-auto px-2 h-[2.4rem] rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-bold text-[0.8rem] cursor-pointer bg-primaryRed">
          Entertaiment
        </div>
        <div className="w-auto px-2 h-[2.4rem] rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-bold text-[0.8rem] cursor-pointer bg-primaryRed">
          Gaming
        </div>
        <div className="w-auto px-2 h-[2.4rem] rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-bold text-[0.8rem] cursor-pointer bg-primaryRed">
          Fashion
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-baseline mt-4">
        <span className="text-white font-rubik font-semibold text-[1.5rem]">
          Description
        </span>
      </div>
      <div className="w-full h-auto min-h-[10rem] rounded-sm border-[1px] border-secondaryGrey border-solid text-white font-rubik font-extralight tracking-wider p-4 bg-primaryGrey flex flex-col justify-between items-start gap-10 mb-8">
        <span>
          A long description is written here for your convenience A long
          description is written here for your convenienceA long description is
          written here for your convenienceA long description is written here
          for your convenienceA long description is written here for your
          conveniencevA long description is written here for your convenienceA
          long description is written here for your convenienceA long
          description is written here for your convenienceA long description is
          written here for your convenience A long description is written here
          for your convenience A long description is written here for your
          convenienceA long description is written here for your convenienceA
          long description is written here for your convenienceA long
          description is written here for your conveniencevA long description is
          written here for your convenienceA long description is written here
          for your convenienceA long description is written here for your
          convenienceA long description is written here for your convenience
        </span>
        <span className="text-white font-rubik font-semibold tracking-wider">
          #Entertaiment #Gaming #Fashion #Entertaiment #Gaming
          #Fashion#Entertaiment #Gaming #Fashion#Entertaiment #Gaming
          #Fashion#Entertaiment #Gaming <div id="Fashionv"></div>
        </span>
      </div>
    </div>
  );
};

export default PeerView;
