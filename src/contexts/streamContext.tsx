import { IStreamData, IStreamerData } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { useSignerContext } from "./signerContext";
import { IChatData } from "@/utils/types";
import { BigNumber } from "ethers";



export const StreamContext = React.createContext<{
  streamData: IStreamData | undefined;
  streamerData: IStreamerData | undefined;
  isHost: boolean;
  streamId: number | undefined;
  streamCategories: string[] | undefined;
  allChats: IChatData[] | undefined;
  followsStreamer: boolean;
  subscribedStreamer: boolean;
  streamBalance: number | undefined;
  setFollowsStreamer: (followsStreamer: boolean) => void;
  setSubscribedStreamer: (subscribedStreamer: boolean) => void;
  setStreamId: (streamId: number) => void;  
  getWholeStreamData: (streamId: number) => Promise<void>;
  getStreamCategories: (streamId: number) => Promise<void>;
  getAllChatData: (streamId: number) => Promise<void>;
}>({
  streamData: undefined,
  streamerData: undefined,
  isHost: false,
  streamId: undefined,
  streamCategories: undefined,
  allChats: undefined,
  followsStreamer: false,
  subscribedStreamer: false,
  streamBalance: undefined,
  setFollowsStreamer: (followsStreamer: boolean) => {},
  setSubscribedStreamer: (subscribedStreamer: boolean) => {},
  setStreamId: (streamId: number) => {},
  getWholeStreamData: async () => {},
  getStreamCategories: async () => {},
  getAllChatData: async () => {},
});

export const useStreamContext = () => useContext(StreamContext);

export const StreamContextProvider = ({ children }: any) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { contract } = useSignerContext();
  const [streamData, setStreamData] = useState<IStreamData>();
  const [streamerData, setStreamerData] = useState<IStreamerData>();
  const [isHost, setIsHost] = useState<boolean>(false);
  const [streamId, setStreamId] = useState<number>()
  const [streamCategories, setStreamCategories] = useState<string[]>()
  const [allChats, setAllChats] = useState<IChatData[]>();
  const [followsStreamer, setFollowsStreamer] = useState<boolean>(false)
  const [subscribedStreamer, setSubscribedStreamer] = useState<boolean>(false)
  const [streamBalance, setStreamBalance] = useState<number>()


  const getWholeStreamData = async (streamId: number) => {
    console.log(streamId)
    console.log("getWholeStreamData")
    console.log(contract)
    const streamIdBig = BigNumber.from(streamId);
    const streamData: IStreamData = await contract.idToStream(streamIdBig);
    console.log(streamData);
    const streamerData: IStreamerData = await contract.addToStreamer(
      streamData.streamer
    );
    const bigTotalAmount = BigNumber.from(streamData.totalAmount)
    const streamBalance = parseFloat(bigTotalAmount.toString())/10**18
    setStreamBalance(streamBalance);
    console.log(streamerData);
    setStreamData(streamData);
    setStreamerData(streamerData);
    if (streamData.streamer === address) {
      console.log("is host");
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  };

  const getStreamCategories = async (streamId: number) => {
    const streamCategories: string[] = await contract.getStreamCategories(
      streamId
    );
    setStreamCategories(streamCategories);
  }

  const getAllChatData = async (streamId: number) => {
    const data = await contract.getAllChats(streamId);
    console.log(data);
    setAllChats(data);
  };

  useEffect(() => {
    if (streamId) {
      getWholeStreamData(streamId);
      getStreamCategories(streamId);
      getAllChatData(streamId);
    }
  }, [streamId])
  

  return (
    <StreamContext.Provider
      value={{
        streamData,
        streamerData,
        isHost,
        streamId,
        streamCategories,
        allChats,
        followsStreamer,
        subscribedStreamer,
        streamBalance,
        setFollowsStreamer,
        setSubscribedStreamer,
        setStreamId,
        getWholeStreamData,
        getStreamCategories,
        getAllChatData,
      }}
    >{children}</StreamContext.Provider>
  );
};
