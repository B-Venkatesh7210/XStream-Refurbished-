import Navbar from "@/components/Navbar";
import { useSignerContext } from "@/contexts/signerContext";
import React from "react";
import { useSigner } from "wagmi";
import { useAccount } from "wagmi";
import { useLobby, useRoom } from "@huddle01/react/hooks";
import Router from "next/router";
import { useEventListener } from "@huddle01/react";
import { useCurrUserOrStreamerContext } from "@/contexts/currUserOrStreamerContext";
import { useStreamContext } from "@/contexts/streamContext";

const Home = () => {
  const { contract, nftContract, signer } = useSignerContext();
  const { data: signer1 } = useSigner();
  const { isDisconnected } = useAccount();
  const { joinLobby, leaveLobby, isLoading, isLobbyJoined, error } = useLobby();
  const { joinRoom, leaveRoom, isRoomJoined } = useRoom();
  const { getCurrStreamerData } = useCurrUserOrStreamerContext();
  const { streamData, streamerData, streamId, streamCategories } =
    useStreamContext();

  useEventListener("lobby:joined", () => {
    joinRoom();
    Router.push({
      pathname: "/room",
      query: {
        roomId: "qvg-fxtg-iil",
        streamId: 17,
      },
    });
  });

  //TODO add original contracts in the contracts folder
  return (
    <div className="bg flex flex-col justify-start items-center scrollbar-hidden content">
      <Navbar isSticky={true}></Navbar>
      <div className="h-[100vh] w-full flex flex-col justify-center items-center">
        {!isDisconnected && (
          <span
            className="text-white text-[2rem]"
            onClick={async() => {
              // joinLobby("qvg-fxtg-iil");
              await getCurrStreamerData("0x4562F39FAEEdB490B3Bf0D6024F46DBD5c40cF04" as string);
              Router.push({
                pathname: "/dashboard",
                query: { streamer: "ISHOWSPEED" },
              });
            }}
          >
            Hello
          </span>
        )}
      </div>
    </div>
  );
};

export default Home;
