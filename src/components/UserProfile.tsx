import React from "react";
import { useRouter } from "next/router";
import PersonIcon from "@mui/icons-material/Person";
import PrimaryButton from "./PrimaryButton";
import EditIcon from "@mui/icons-material/Edit";

interface UserProfileProps {
    enterEdit: boolean,
    setEnterEdit: any
}

const UserProfile: React.FC<UserProfileProps> = ({enterEdit, setEnterEdit}) => {

  const router = useRouter();

  return (
    <div className="flex flex-row w-[90%] h-[90%] mt-8">
      <div className="flex flex-col justify-start items-center">
        <div className="relative h-[8rem] w-[8rem] p-2 rounded-[50%] bg-primaryGrey flex flex-col justify-center items-center gap-2">
          {/* Default Picture, if the User doesnt have a profile picture */}
          <PersonIcon
            style={{ height: "120%", width: "120%", color: "white" }}
          ></PersonIcon>
        </div>
        <div className="flex flex-col justify-start items-center mt-4">
          <span className="text-primaryRed font-rubik text-lg font-bold">
            Followers
          </span>
          <span className="text-white font-rubik text-lg font-bold">34</span>
        </div>
        <div className="flex flex-col justify-start items-center mt-4">
          <span className="text-primaryRed font-rubik text-lg font-bold">
            Subscribers
          </span>
          <span className="text-white font-rubik text-lg font-bold">34</span>
        </div>
      </div>

      <div className="relative flex flex-col justify-start items-start w-[45%] h-full  ml-12 gap-4">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="h-[4.5rem] w-full rounded-lg text-primaryRed drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[3rem] font-dieNasty">
            VENMUS
          </div>
        </div>
        <div className="absolute right-0 top-3 cursor-pointer h-[3rem] w-[3rem] rounded-[50%] hover:bg-secondaryGrey flex flex-row justify-center items-center" onClick={()=>{setEnterEdit(true)}}>
          <EditIcon style={{fontSize: 30, color: "white"}}></EditIcon>
        </div>

        <div className="flex flex-col justify-start items-start w-full">
          <div className="h-[8rem] w-full rounded-lg bg-secondaryGrey text-white text-base p-3">
            I am a user at Xstream, I like watching livestreams and videos
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <PrimaryButton
            h="h-[3.5rem]"
            w="w-[15rem]"
            textSize="text-[1.2rem]"
            label="CREATE STREAMER"
            action={() => {
              router.push("/createStreamer")
            }}
            disabled={false}
          ></PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
