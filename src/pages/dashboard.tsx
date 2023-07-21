import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EditProfile from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";
import { useSignerContext } from "@/contexts/signerContext";
import Image from "next/image";
import StreamerImage from "../../assets/images/streamer.png";
import UserImage from "../../assets/images/user.png";
import PrimaryButton from "@/components/PrimaryButton";
import ChooseWisely from "@/components/ChooseWisely";

const Dashboard = () => {
  const [enterEdit, setEnterEdit] = useState(false);
  const { isUser, isStreamer, userData } = useSignerContext();
  const [choseUser, setChoseUser] = useState(false);

  return (
    <div className="bg flex flex-col justify-start items-center">
      <Navbar isSticky={false}></Navbar>
      {!isUser && !isStreamer && !choseUser && (
        <ChooseWisely setChoseUser={setChoseUser}></ChooseWisely>
      )}
      {choseUser && (
        <div className="h-[80vh] m-4 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
          <EditProfile isUser={isUser}></EditProfile>
        </div>
      )}

      {/* <div className="h-[80vh] m-4 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
        {enterEdit ? (
          <EditProfile></EditProfile>
        ) : (
          <UserProfile
            enterEdit={enterEdit}
            setEnterEdit={setEnterEdit}
          ></UserProfile>
        )}
      </div> */}
    </div>
  );
};

export default Dashboard;
