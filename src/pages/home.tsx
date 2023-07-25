import Navbar from "@/components/Navbar";
import { useSignerContext } from "@/contexts/signerContext";
import React, { useEffect } from "react";
import { useSigner } from "wagmi";
import { useAccount } from "wagmi";
import { useLobby, useRoom } from "@huddle01/react/hooks";
import Router from "next/router";
import { useCurrUserOrStreamerContext } from "@/contexts/currUserOrStreamerContext";
import { useStreamContext } from "@/contexts/streamContext";
import Image from "next/image";
import Banner from "../../assets/images/banner.png";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StreamComponent from "@/components/StreamComponent";
import { BigNumber } from "ethers";
import VideoComponent from "@/components/VideoComponent";
import Youtube from "../../assets/logos/Youtube.png";
import collections from "@/utils/collections";

//TODO add loading everywhere

const Home = () => {
  const { contract, nftContract, signer, getLivestreamsData, livestreams } =
    useSignerContext();
  const { data: signer1 } = useSigner();
  const { isDisconnected } = useAccount();
  const { joinLobby, leaveLobby, isLoading, isLobbyJoined, error } = useLobby();
  const { getCurrStreamerData } = useCurrUserOrStreamerContext();
  const { streamData, streamerData, streamId, streamCategories } =
    useStreamContext();

  const handleVideoClick = () => {
    //TODO add the link of the demo video
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  useEffect(() => {
    if (contract) {
      getLivestreamsData();
    }
  }, [contract]);

  useEffect(() => {
    const addStreamStartedListener = async () => {
      if (contract) {
        const eventEmitter1 = contract.on(
          "StreamStarted",
          (streamId: BigNumber, streamer: string) => {
            console.log(streamId, streamer);
            getLivestreamsData();
          }
        );

        return () => {
          eventEmitter1.removeAllListeners("StreamStarted");
        };
      }
    };
    // const addStreamStoppedListener = async () => {
    //   if (contract) {
    //     const eventEmitter2 = contract.on(
    //       "StreamStopped",
    //       (streamId: BigNumber, streamer: string, streamerName: string) => {
    //         console.log("A stream was stopped");
    //         getLivestreamsData();
    //       }
    //     );

    //     return () => {
    //       eventEmitter2.removeAllListeners("StreamStopped");
    //     };
    //   }
    // };

    // addStreamStoppedListener();
    addStreamStartedListener();
  }, [contract]);

  //TODO add original contracts in the contracts folder
  return (
    <div className="bg flex flex-col justify-start items-center scrollbar-hidden content">
      <Navbar isSticky={true}></Navbar>
      {/* <div className="h-[100vh] w-full flex flex-col justify-center items-center">
        {!isDisconnected && (
          <span
            className="text-white text-[2rem]"
            onClick={async () => {
              joinLobby("lij-jtcx-bvm");
              // await getCurrStreamerData("0x4562F39FAEEdB490B3Bf0D6024F46DBD5c40cF04" as string);
              // Router.push({
              //   pathname: "/dashboard",
              //   query: { streamer: "ISHOWSPEED" },
              // });
            }}
          >
            Hello
          </span>
        )}
      </div> */}
      <div className="w-full h-[10vh]"></div>
      <div className="flex flex-col justify-start items-center w-[95%] h-auto gap-8 my-10">
        <div
          className="relative w-full h-[35vh] cursor-pointer hover:opacity-30 transition delay-100"
          onClick={handleVideoClick}
        >
          <Image
            alt="Video Demo"
            src={Banner}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              objectPosition: "0% 35%",
            }}
          ></Image>
          <div className="h-[6rem] w-[6rem] absolute top-[35%] left-[48%]">
            <Image alt="Youtube" src={Youtube}></Image>
          </div>
        </div>
        <div className="h-auto w-full flex flex-col justify-start items-start">
          <div
            className="flex flex-row justify-start items-center gap-2"
            onClick={() => {
              getLivestreamsData();
            }}
          >
            <span className="text-white text-[2rem] font-rubik font-semibold">
              Ongoing
            </span>
            <span className="text-textRed text-[2rem] font-rubik font-semibold">
              Live
            </span>
            <span className="text-white text-[2rem] font-rubik font-semibold">
              Streams
            </span>
          </div>
          {livestreams?.length > 0 ? (
            <div className="grid grid-cols-4 grid-flow-row gap-8 mt-4">
              {/* <StreamComponent></StreamComponent>
            <StreamComponent></StreamComponent>
            <StreamComponent></StreamComponent>
            <StreamComponent></StreamComponent> */}
              {livestreams.map((livestream, index) => (
                <div key={index}>
                  <StreamComponent livestream={livestream}></StreamComponent>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[8rem] w-full flex flex-row justify-start items-center text-white font-rubik font-semibold text-[1.2rem]">
              There are no live streams
            </div>
          )}
        </div>
        <div className="h-auto w-full flex flex-col justify-start items-start">
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-white text-[2rem] font-rubik font-semibold">
              Recorded
            </span>
            <span className="text-textRed text-[2rem] font-rubik font-semibold">
              sessions
            </span>
          </div>
          <div className="grid grid-cols-4 grid-flow-row gap-8 mt-4">
            {collections.map((collection, index) => (
              <VideoComponent
                key={index}
                collection={collection}
              ></VideoComponent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
