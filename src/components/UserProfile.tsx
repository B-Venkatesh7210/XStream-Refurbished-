import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import PersonIcon from "@mui/icons-material/Person";
import PrimaryButton from "./PrimaryButton";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import { useSignerContext } from "../contexts/signerContext";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import HowToStart from "./HowToStart";

interface UserProfileProps {
  setEnterEdit?: any;
  isRouterQuery?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  setEnterEdit,
  isRouterQuery,
}) => {
  const router = useRouter();
  const { userData, contract, isUser, getContractInfo } = useSignerContext();

  return (
    <div className="flex flex-row w-[90%] h-[90%] mt-8">
      <div className="flex flex-col justify-start items-center">
        <div className="relative h-[8rem] w-[8rem] p-2 rounded-[50%] bg-primaryGrey flex flex-col justify-center items-center gap-2">
          {/* Default Picture, if the User doesnt have a profile picture */}
          {userData?.profilePicture == "" ? (
            <PersonIcon
              style={{ height: "120%", width: "120%", color: "white" }}
            ></PersonIcon>
          ) : (
            <div className="rounded-[50%] h-full w-full overflow-hidden">
              <Image
                alt="Profile Picture"
                src={`https://ipfs.io/ipfs/${userData?.profilePicture}`}
                objectFit="cover"
                width={200}
                height={200}
              ></Image>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex flex-col justify-start items-start w-[45%] h-full  ml-12 gap-4">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="h-[4.5rem] w-full rounded-lg text-primaryRed drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[3rem] font-dieNasty">
            {userData?.name}
          </div>
        </div>
        <div
          className="absolute right-0 top-3 cursor-pointer h-[3rem] w-[3rem] rounded-[50%] hover:bg-secondaryGrey flex flex-row justify-center items-center"
          onClick={() => {
            setEnterEdit(true);
          }}
        >
          <EditIcon style={{ fontSize: 30, color: "white" }}></EditIcon>
        </div>

        <div className="flex flex-col justify-start items-start w-full">
          <div className="h-[8rem] w-full rounded-lg bg-secondaryGrey text-white text-base p-3">
            {userData?.desp}
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <PrimaryButton
            h="h-[3.5rem]"
            w="w-[15rem]"
            textSize="text-[1.2rem]"
            label="CREATE STREAMER"
            action={() => {
              router.push("/createStreamer");
            }}
            disabled={false}
          ></PrimaryButton>
        </div>
      </div>
      <HowToStart></HowToStart>
    </div>
  );
};

export default UserProfile;
