import React, { useContext, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Context from "../contexts/context";
import CameraOff from "@mui/icons-material/NoPhotography";
import { useEventListener } from "@huddle01/react";
import {
  useLobby,
  useAudio,
  useVideo,
  usePeers,
  useRoom,
} from "@huddle01/react/hooks";
import ToggleButton from "@/components/ToggleButton";
import { useRouter } from "next/router";
import ImageIcon from "@mui/icons-material/Image";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";
import { useSignerContext } from "@/contexts/signerContext";
import Router from "next/router";
import { NFTStorage, File, Blob } from "nft.storage";

interface FormDataProps {
  title: string;
  desp: string;
  hashtags: string;
}

const Lobby = () => {
  const context: any = useContext(Context);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { joinRoom, leaveRoom, isRoomJoined } = useRoom();
  const [cameraOn, setCamera] = useState<boolean>(false);
  const [micOn, setMic] = useState<boolean>(false);
  const [isExclusive, setIsExclusive] = useState<boolean>(false);
  const {
    fetchVideoStream,
    stopVideoStream,
    stream: camStream,
    error: camError,
  } = useVideo();
  const {
    fetchAudioStream,
    stopAudioStream,
    stream: micStream,
    error: micError,
  } = useAudio();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailName, setThumbnailName] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    desp: "",
    hashtags: "",
  });
  const categories: string[] = [
    "Entertainment",
    "Gaming",
    "Reaction",
    "Music",
    "Movies",
    "Sports",
    "News",
    "Vlogs",
    "Tutorial",
    "Animals",
    "Fashion",
    "Cinema",
    "Fund Raising",
    "Philanthropy",
    "Climate",
    "Other",
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const { contract } = useSignerContext();
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFTSTORAGE_KEY as string,
  });

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      // If the category is already selected, remove it from the selectedCategories array
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    } else {
      // If the category is not selected, add it to the selectedCategories array
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      setThumbnail(file);
      setThumbnailName(file.name);
    } else {
      setSelectedImage(null);
      setThumbnail(null);
      setThumbnailName(null);
    }
  };

  const handleTitleChange = (event: any) => {
    setFormData({ ...formData, title: event.target.value });
  };

  const handleDespChange = (event: any) => {
    setFormData({ ...formData, desp: event.target.value });
  };

  const handleHashtagsChange = (event: any) => {
    setFormData({ ...formData, hashtags: event.target.value });
  };

  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  const handleAllCheck = () => {
    let status = true;
    if (
      selectedImage != null &&
      formData.title != "" &&
      formData.desp != "" &&
      formData.hashtags != "" &&
      selectedCategories.length != 0
    ) {
      status = false;
    }
    return status;
  };

  const thumbnailUpload = async () => {
    const imageFile = new File([thumbnail as File], thumbnailName as string, {
      type: thumbnail?.type,
    });
    const imageBlob = imageFile.slice(0, imageFile.size, imageFile.type);
    const cid = await client.storeBlob(imageBlob);
    return cid;
  };

  const startStream = async () => {
    const thumbnailCid = await thumbnailUpload();
    const streamIdData = await contract.streamId();
    const streamId = streamIdData.toNumber();
    const startStream = await contract.startStream(
      formData.title,
      thumbnailCid,
      formData.desp,
      context.roomId,
      isExclusive,
      selectedCategories,
      formData.hashtags
    );
    await startStream.wait();
    joinRoom();
    Router.push({
      pathname: "/room",
      query: { roomId: context.roomId, streamId: streamId },
    });
  };

  return (
    <div className="bg flex flex-col justify-start items-center scrollbar-hidden content">
      <Navbar isSticky={true}></Navbar>
      <div className="w-full h-[10vh]"></div>
      <div className="h-auto w-[90%] flex mt-10 flex-row justify-between items-start px-10 mb-10">
        <div className="h-[80vh] flex flex-col justify-start items-start">
          <div className="flex flex-row justify-start items-center">
            <span
              className="text-white font-rubik font-semibold text-[1.2rem] ml-2"
              onClick={() => {
                console.log(micOn, cameraOn);
              }}
            >
              Room ID :{" "}
            </span>
            <span className="text-textRed font-rubik font-semibold text-[1.2rem] ml-2">
              {context.roomId}
            </span>
          </div>
          <div className="w-full h-80 aspect-video bg-secondaryRed/10 border-solid border-[1px] border-primaryRed rounded-xl relative overflow-hidden mt-4 border-shadow">
            {!cameraOn ? (
              <div className="absolute h-full w-full flex flex-col justify-center items-center">
                <CameraOff
                  style={{
                    fontSize: 100,
                    color: "white",
                    marginBottom: "5rem",
                  }}
                ></CameraOff>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
            <div className="absolute w-[30%] left-[35%] bottom-4 flex flex-row justify-between items-center">
              <ToggleButton
                h="h-[3rem]"
                w="w-[3rem]"
                disabled={!cameraOn}
                action={() => {
                  if (cameraOn == false) {
                    fetchVideoStream();
                    setCamera(!cameraOn);
                  } else {
                    stopVideoStream();
                    setCamera(!cameraOn);
                  }
                }}
                type="camera"
              ></ToggleButton>
              <ToggleButton
                h="h-[3rem]"
                w="w-[3rem]"
                disabled={!micOn}
                action={() => {
                  if (micOn == false) {
                    fetchAudioStream();
                    setMic(!micOn);
                  } else {
                    stopAudioStream();
                    setMic(!micOn);
                  }
                }}
                type="mic"
              ></ToggleButton>
            </div>
          </div>
          <div className="relative w-[60%] h-[8rem] bg-primaryGrey mt-12 rounded-sm flex flex-col justify-center items-center">
            {selectedImage ? (
              <>
                <Image
                  src={selectedImage}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="contain"
                  className="object-cover h-full w-full"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <>
                <ImageIcon style={{ fontSize: 40, color: "white" }}></ImageIcon>
                <span className="text-white font-rubik font-medium text-[1rem] mt-4 cursor-pointer">
                  Select Thumbnail
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
        </div>
        <div className="w-[50%] h-auto flex flex-col justify-start items-start">
          <div
            className={`w-full h-auto flex flex-col justify-start items-start ${
              isExclusive
                ? "bg-secondaryRed/20 border-primaryRed border-[1px] border-solid"
                : "bg-primaryGrey"
            } p-8 gap-8`}
          >
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
                Title
              </span>
              <div className="h-[4rem] w-full bg-secondaryGrey rounded-sm pl-4">
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  placeholder="Enter the title"
                  className="appearance-none bg-transparent border-none outline-none h-full w-full text-white text-[1.8rem] font-rubik font-bold flex flex-row justify-start items-center"
                  onChange={(e: any) => {
                    handleTitleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
                Description
              </span>
              <div className="h-[8rem] w-full rounded-lg bg-secondaryGrey px-4">
                <textarea
                  id="desp"
                  value={formData.desp}
                  placeholder="Enter the description"
                  className="appearance-none bg-transparent border-none outline-none text-white text-[1rem] py-2 w-full h-full font-rubik resize-none"
                  onChange={(e: any) => {
                    handleDespChange(e);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <div className="flex flex-row justify-start items-center gap-4">
                <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
                  Exclusive
                </span>
                <div
                  className={`h-[1.5rem] w-[1.5rem] ${
                    isExclusive ? "bg-primaryRed" : "bg-none"
                  }  border-white border-2 cursor-pointer`}
                  onClick={() => {
                    setIsExclusive(!isExclusive);
                  }}
                ></div>
              </div>
              <span className="text-white text-[0.8rem] font-rubik font-normal tracking-widest">
                (Only your subscribers can watch this stream)
              </span>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
                Hashtags
              </span>
              <div className="h-[3rem] w-full rounded-lg bg-secondaryGrey px-4">
                <textarea
                  id="hashtags"
                  value={formData.hashtags}
                  placeholder="Enter the hashtags"
                  className="appearance-none bg-transparent border-none outline-none text-white text-[1rem] py-2 w-full h-full font-rubik resize-none"
                  onChange={(e: any) => {
                    handleHashtagsChange(e);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
                Categories
              </span>
              <div className="grid grid-flow-row grid-cols-6 gap-4 h-[8rem] w-full mt-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`w-auto px-2 h-[2rem] rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-semibold text-[0.6rem] cursor-pointer ${
                      selectedCategories.includes(category)
                        ? "bg-primaryRed"
                        : "bg-secondaryGrey"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center mt-8">
            <PrimaryButton
              h="h-[3.5rem]"
              w="w-[15rem]"
              textSize="text-[1.2rem]"
              label="START STREAM"
              action={() => {
                startStream();
              }}
              disabled={handleAllCheck()}
            ></PrimaryButton>
            <PrimaryButton
              h="h-[3.5rem]"
              w="w-[15rem]"
              textSize="text-[1.2rem]"
              label="LEAVE LOBBY"
              action={() => {
                router.push("/home");
              }}
              disabled={false}
            ></PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
