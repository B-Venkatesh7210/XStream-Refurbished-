import { IStreamData, IStreamerData } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { useSignerContext } from "./signerContext";

export const StreamContext = React.createContext<{
  streamData: IStreamData | undefined;
  streamerData: IStreamerData | undefined;
  isHost: boolean;
  streamId: number | undefined;
  streamCategories: string[] | undefined;
  setStreamId: (streamId: number) => void;  
  getWholeStreamData: (streamId: number) => Promise<void>;
  getStreamCategories: (streamId: number) => Promise<void>;
}>({
  streamData: undefined,
  streamerData: undefined,
  isHost: false,
  streamId: undefined,
  streamCategories: undefined,
  setStreamId: (streamId: number) => {},
  getWholeStreamData: async () => {},
  getStreamCategories: async () => {},
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

  const getWholeStreamData = async (streamId: number) => {
    console.log("getWholeStreamData")
    console.log(contract)
    const streamData: IStreamData = await contract.idToStream(streamId);
    console.log(streamData);
    const streamerData: IStreamerData = await contract.addToStreamer(
      streamData.streamer
    );
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

  useEffect(() => {
    if (streamId) {
      getWholeStreamData(streamId);
      getStreamCategories(streamId);
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
        setStreamId,
        getWholeStreamData,
        getStreamCategories
      }}
    >{children}</StreamContext.Provider>
  );
};
