import React, { useContext } from "react";
import Image from "next/image";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import StreamIcon from "@mui/icons-material/Stream";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useRouter } from "next/router";
import axios from "axios";
import Context from "../contexts/context";
import { useLobby, useRoom } from "@huddle01/react/hooks";

const DropDownMenu = () => {
  const router = useRouter();
  const context: any = useContext(Context);
  const { joinLobby, leaveLobby, isLoading, isLobbyJoined, error } = useLobby();

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
    <div className="absolute top-12 w-[120%] right-0 bg-[#250707] rounded-sm shadow-lg">
      <ul className="pb-2">
        <li className="px-2 pt-2 flex flex-row justify-start items-center">
          <div
            className="px-2 py-2 cursor-pointer flex flex-row hover:bg-[#331c1c] rounded-lg w-full justify-start items-center gap-3"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <div className="rounded-[50%] w-[1.5rem] h-[1.5rem] overflow-hidden">
              <Image
                alt="Profile Picture"
                src={ProfilePicture}
                objectFit="cover"
              ></Image>
            </div>
            <span className="text-white font-rubik text-[0.9rem]">
              Dashboard
            </span>
          </div>
        </li>
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
            <span className="text-white font-rubik text-[0.9rem]">Stream</span>
          </div>
        </li>
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
