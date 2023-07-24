import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Signer } from "ethers";
import { useAccount, useSigner } from "wagmi";
import contractConfig from "../config/contractConfig";
import nftContractConfig from "../config/nftContractConfig";
import { IUserData, IStreamerData, IStreamData } from "@/utils/types";
import { BigNumber } from "ethers";

export const SignerContext = React.createContext<{
  signer: Signer | undefined | null;
  contract: any;
  nftContract: any;
  isUser: boolean;
  userData: IUserData | undefined;
  isStreamer: boolean;
  streamerData: IStreamerData | undefined;
  streamerBalance: number | undefined;
  livestreams: IStreamData[] | [];
  getLivestreamsData: () => Promise<void>;
  getContractInfo: () => Promise<void>;
}>({
  signer: undefined,
  contract: undefined,
  nftContract: undefined,
  isUser: false,
  userData: undefined,
  isStreamer: false,
  streamerData: undefined,
  streamerBalance: undefined,
  livestreams: [],
  getLivestreamsData: async () => {},
  getContractInfo: async () => {},
});

export const useSignerContext = () => useContext(SignerContext);

export const SignerContextProvider = ({ children }: any) => {
  const { data: signer, isError } = useSigner();
  const { address } = useAccount();
  const [contract, setContract] = useState();
  const [nftContract, setNftContract] = useState();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();
  const [isStreamer, setIsStreamer] = useState<boolean>(false);
  const [streamerData, setStreamerData] = useState<IStreamerData>();
  const [streamerBalance, setStreamerBalance] = useState<number>();
  const [livestreams, setLivestreams] = useState<IStreamData[]>([]);

  const getContractInfo = async () => {
    const contract: any = new ethers.Contract(
      contractConfig.address,
      contractConfig.abi,
      signer as Signer
    );
    const nftContract: any = new ethers.Contract(
      nftContractConfig.address,
      nftContractConfig.abi,
      signer as Signer
    );
    const isUser: boolean = await contract.isUser(address);
    setIsUser(isUser);
    if (isUser) {
      const userData: IUserData = await contract.addToUser(address);
      const bigNumberUserId = BigNumber.from(userData.userId);
      const userId = bigNumberUserId.toString();
      setUserData({
        ...userData,
        userId: userId,
        userAdd: userData.userAdd,
        name: userData.name,
        desp: userData.desp,
        profilePicture: userData.profilePicture,
        collection: userData.collection,
      });
    }
    const isStreamer: boolean = await contract.isStreamer(address);
    setIsStreamer(isStreamer);
    if (isStreamer) {
      const streamerData: IStreamerData = await contract.addToStreamer(address);
      const bigNumberStreamerId = BigNumber.from(streamerData.streamerId);
      const streamerId = bigNumberStreamerId.toString();
      const bigTotalNfts = BigNumber.from(streamerData.totalNfts);
      const totalNfts = bigTotalNfts.toString();
      const bigNumberSubscribers = BigNumber.from(streamerData.subscribers);
      const subscribers = bigNumberSubscribers.toString();
      const streamerBalanceData = await contract.streamerToBalance(address);
      const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
      setStreamerBalance(streamerBalance);
      setStreamerData({
        ...streamerData,
        streamerId: streamerId,
        streamerAdd: streamerData.streamerAdd,
        name: streamerData.name,
        desp: streamerData.desp,
        nftImage: streamerData.nftImage,
        profilePicture: streamerData.profilePicture,
        totalNfts: totalNfts,
        categories: streamerData.categories,
        followers: streamerData.followers,
        subscribers: subscribers,
        isLive: streamerData.isLive,
      });
    }
    setContract(contract);
    setNftContract(nftContract);
  };

  const getLivestreamsData = async () => {
    //@ts-ignore
    const livestreamsData: IStreamData[] = await contract.getLiveStreams();
    console.log(livestreamsData);
    setLivestreams(livestreamsData);
  };

  useEffect(() => {
    if (signer && address) {
      console.log("signerContext was called");
      getContractInfo();
    }
  }, [signer, address]);

  return (
    <SignerContext.Provider
      value={{
        signer,
        contract,
        nftContract,
        isUser,
        userData,
        isStreamer,
        streamerData,
        streamerBalance,
        livestreams,
        getLivestreamsData,
        getContractInfo,
      }}
    >
      {children}
    </SignerContext.Provider>
  );
};
