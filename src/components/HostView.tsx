import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import CameraOff from "@mui/icons-material/NoPhotography";
import {
  useLobby,
  useAudio,
  useVideo,
  usePeers,
  useRoom,
  useLivestream,
} from "@huddle01/react/hooks";
import { useRouter } from "next/router";
import ToggleButton from "./ToggleButton";
import Context from "@/contexts/context";
import { useStreamContext } from "@/contexts/streamContext";
import { useSignerContext } from "@/contexts/signerContext";

const HostView = () => {
  const context: any = useContext(Context);
  const [cameraOn, setCamera] = useState<boolean>(false);
  const [micOn, setMic] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    fetchVideoStream,
    produceVideo,
    stopProducingVideo,
    stopVideoStream,
    stream: camStream,
    isProducing: cam,
    error: camError,
  } = useVideo();
  const {
    fetchAudioStream,
    stopAudioStream,
    produceAudio,
    stopProducingAudio,
    stream: micStream,
    isProducing: mic,
    error: micError,
  } = useAudio();
  const router = useRouter();
  const { contract } = useSignerContext();
  const { streamData, streamerData, streamId, streamCategories } =
    useStreamContext();

  useEffect(() => {
    console.log("camera setting");
    console.log(camStream, videoRef);
    if (camStream && videoRef.current) {
      videoRef.current.srcObject = camStream;
      setCamera(true);
      produceVideo(camStream);
    } else {
      // If camStream is null, it means camera is toggled off, so we need to stop the video stream
      stopVideoStream();
      stopProducingVideo();
      setCamera(false);
      //TODO stop video producing is throwing error
    }
  }, [camStream, cameraOn]);
  //TODO idhar kuch toh crazy hua hai cameroOn dalne pe

  useEffect(() => {
    console.log("mic setting");
    console.log(micStream);
    if (micStream) {
      setMic(true);
      produceAudio(micStream);
      console.log(mic);
      console.log(micStream);
      //TODO audio is not producing
    }
  }, [micStream]);

  const stopStream = async () => {
    context.setLoading(true);
    const stopStream = await contract.stopStream(streamData?.streamId);
    await stopStream.wait();
    stopVideoStream();
    stopProducingVideo();
    setCamera(false);
    if (mic) {
      stopProducingAudio();
      setMic(false);
    }
    context.setLoading(false);
    router.push("/home");
    //TODO destroy camstream and micstream
  };

  return (
    <div className="w-[50%] h-auto flex flex-col justify-start items-start gap-2 mb-4">
      <div className="w-full flex flex-row justify-between items-baseline">
        <div className="relative h-[3rem] w-auto min-w-[8rem] bg-primaryGrey rounded-lg flex flex-row justify-start items-center py-2 px-4 cursor-pointer hover:bg-secondaryGrey">
          <div className="rounded-[50%] w-[2rem] h-[2rem] overflow-hidden">
            <Image
              alt="Profile Picture"
              src={`https://ipfs.io/ipfs/${streamerData?.profilePicture}`}
              objectFit="cover"
              width={200}
              height={200}
            ></Image>
          </div>
          <span className="text-textRed font-rubik font-bold ml-3">
            {streamerData?.name}
          </span>
        </div>
        <span className="text-textRed font-rubik font-semibold text-[1.2rem]">
          {streamData?.exclusive ? "Exclusive" : ""}
        </span>
      </div>

      <div className="w-full flex flex-row justify-between items-baseline">
        <span
          className="text-white font-rubik font-bold text-[1.5rem] ml-2 w-[75%] max-h-[5rem] h-auto inline-block break-words content-fit"
          onClick={() => {
            console.log(streamData?.streamId);
          }}
        >
          {streamData?.title}
        </span>
        <span className="text-white font-rubik font-semibold text-[1rem] flex flex-row justify-start items-baseline">
          {router.query.roomId}
        </span>
      </div>
      <div className="w-full h-full aspect-video bg-secondaryRed/10 border-solid border-[1px] border-primaryRed rounded-xl relative overflow-hidden mt-4 border-shadow">
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
            className="w-full h-full object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
        )}
        <div className="absolute w-[50%] left-[25%] bottom-4 flex flex-row justify-between items-center gap-4">
          <ToggleButton
            h="h-[3rem]"
            w="w-[3rem]"
            disabled={!cameraOn}
            action={() => {
              if (cameraOn == false) {
                fetchVideoStream();
                produceVideo(camStream);
                console.log(camStream.active);
                setCamera(!cameraOn);
              } else {
                stopVideoStream();
                stopProducingVideo();
                console.log(camStream.active);
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
                produceAudio(micStream);
                console.log(mic, micStream);
                setMic(!micOn);
              } else {
                stopProducingAudio();
                //TODO stop producing audio is also not working throwing the same error, undefined appData
                console.log(mic, micStream);
                setMic(!micOn);
              }
            }}
            type="mic"
          ></ToggleButton>
          <ToggleButton
            h="h-[3rem]"
            w="w-[3rem]"
            disabled={false}
            action={() => {
              stopStream();
            }}
            type="exit"
          ></ToggleButton>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-4 gap-4 h-auto w-full mt-6">
        {streamCategories?.map((category, index) => (
          <div
            key={index}
            className="w-auto px-2 h-[2.4rem] bg-primaryRed rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-bold text-[0.8rem] cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row justify-between items-baseline mt-4">
        <span
          className="text-white font-rubik font-semibold text-[1.5rem]"
          onClick={() => {
            console.log(camStream, videoRef, micStream);
          }}
        >
          Description
        </span>
      </div>
      <div className="w-full h-auto min-h-[10rem] rounded-sm border-[1px] border-secondaryGrey border-solid text-white font-rubik font-extralight tracking-wider p-4 bg-primaryGrey flex flex-col justify-between items-start gap-10 mb-8">
        <span>{streamData?.desp}</span>
        <span className="text-white font-rubik font-semibold tracking-wider">
          {streamData?.hashtags}
        </span>
      </div>
    </div>
  );
};

export default HostView;
