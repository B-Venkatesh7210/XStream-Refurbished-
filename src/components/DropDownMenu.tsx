import React, { useContext } from "react";
import Image from "next/image";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import StreamIcon from "@mui/icons-material/Stream";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useRouter } from "next/router";
import axios from "axios";
import Context from "../contexts/context";
import { useLobby, useRoom } from "@huddle01/react/hooks";
import { useSignerContext } from "@/contexts/signerContext";
import Account from "../../assets/images/account.png";
import { useAccount } from "wagmi";
import Router from "next/router";

const DropDownMenu = () => {
  const router = useRouter();
  const context: any = useContext(Context);
  const { joinLobby, leaveLobby, isLoading, isLobbyJoined, error } = useLobby();
  const { isUser, isStreamer, userData, streamerData } = useSignerContext();
  const { address } = useAccount();

  const createRoom = async () => {
    try {
      const response = await axios.post("/api/create-room");
      console.log(response);
      const data = response.data.data.roomId;
      console.log(data);
      return data; // do something with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute top-10 w-[10rem] right-0 bg-[#250707] rounded-sm shadow-lg">
      <ul className="pb-2">
        <li className="px-2 pt-2 flex flex-row justify-start items-center">
          <div
            className="px-2 py-2 cursor-pointer flex flex-row hover:bg-[#331c1c] rounded-lg w-full justify-start items-center gap-3"
            onClick={() => {
              Router.push({
                pathname: "/dashboard",
              });
              
            }}
          >
            <div className="rounded-[50%] w-[1.5rem] h-[1.5rem] overflow-hidden bg-white/70">
              <Image
                alt="Profile Picture"
                src={
                  isUser
                    ? `https://ipfs.io/ipfs/${userData?.profilePicture}`
                    : isStreamer
                    ? `https://ipfs.io/ipfs/${streamerData?.profilePicture}`
                    : Account
                }
                objectFit="cover"
                width={200}
                height={200}
              ></Image>
            </div>
            <span className="text-white font-rubik text-[0.9rem]">
              Dashboard
            </span>
          </div>
        </li>
        {isStreamer && (
          <li className="px-2 pt-2 flex flex-row justify-start items-center">
            <div
              className="px-2 py-2 cursor-pointer flex flex-row hover:bg-[#331c1c] rounded-lg w-full justify-start items-center gap-3"
              onClick={async () => {
                console.log("Clicked");
                const roomId: string = await createRoom();
                console.log(roomId);
                context.setRoomId(roomId);
                joinLobby(roomId);
                router.push("/lobby");
              }}
            >
              <StreamIcon style={{ fontSize: 25, color: "white" }}></StreamIcon>
              <span className="text-white font-rubik text-[0.9rem]">
                Stream
              </span>
            </div>
          </li>
        )}

        <li className="px-2 pt-2 flex flex-row justify-start items-center">
          <div className="px-2 py-2 cursor-pointer flex flex-row hover:bg-[#331c1c] rounded-lg w-full justify-start items-center gap-3">
            <CollectionsIcon
              style={{ fontSize: 25, color: "white" }}
            ></CollectionsIcon>
            <span className="text-white font-rubik text-md">Library</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
