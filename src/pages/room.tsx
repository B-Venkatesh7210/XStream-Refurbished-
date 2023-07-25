import React, { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import HostView from "@/components/HostView";
import StreamChat from "@/components/StreamChat";
import PeerView from "@/components/PeerView";
import { useStreamContext } from "@/contexts/streamContext";
import { useAccount } from "wagmi";
import { IStreamData } from "@/utils/types";
import { useSignerContext } from "@/contexts/signerContext";
import NotASubscriber from "@/components/NotASubscriber";

const Room = () => {
  const router = useRouter();
  const { address } = useAccount();
  const {
    isHost,
    streamId,
    setStreamId,
    streamData,
    streamerData,
    setSubscribedStreamer,
  } = useStreamContext();
  const { nftContract } = useSignerContext();
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const getSubscribedData = async () => {
    const balance = await nftContract.balanceOf(
      address,
      streamerData?.streamerId
    );
    if (balance > 0) {
      setSubscribed(true);
      setSubscribedStreamer(true);
    } else {
      setSubscribed(false);
      setSubscribedStreamer(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setStreamId(parseInt(router.query.streamId as string));
    };
    getData();

    //TODO This is for getting streamId when we reload room page
    // const getData = async () => {
    //   const queryStreamId = router.query.streamId
    //     ? parseInt(router.query.streamId as string)
    //     : localStorage.getItem("streamId");

    //   console.log(router.query.streamId)
    //   console.log(queryStreamId)

    //   if (queryStreamId) {
    //     await getContractInfo()
    //     console.log(parseInt(queryStreamId as string, 10))
    //     setStreamId(parseInt(queryStreamId as string, 10));
    //     localStorage.setItem("streamId", queryStreamId.toString());
    //   }
    // };

    // getData();
  }, [isHost, streamId]);

  useEffect(() => {
    if (streamerData) {
      getSubscribedData();
    }
  }, [streamerData]);

  return (
    <div className="bg flex flex-col justify-start items-center scrollbar-hidden content">
      <Navbar isSticky={true}></Navbar>
      <div className="w-full h-[10vh]"></div>
      {streamData?.exclusive ? (
        isHost || subscribed ? (
          <div className="w-[90%] h-[100vh] mt-6 flex flex-row justify-between items-start">
            {isHost ? <HostView></HostView> : <PeerView></PeerView>}
            <StreamChat></StreamChat>
          </div>
        ) : (
          <NotASubscriber streamerData={streamerData}></NotASubscriber>
        )
      ) : (
        <div className="w-[90%] h-[100vh] mt-6 flex flex-row justify-between items-start">
          {isHost ? <HostView></HostView> : <PeerView></PeerView>}
          <StreamChat></StreamChat>
        </div>
      )}
    </div>
  );
};

export default Room;
