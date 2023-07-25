import { IStreamerData, IUserData } from "@/utils/types";
import React, { useState } from "react";
import { useSignerContext } from "./signerContext";
import { BigNumber } from "ethers";

export const CurrUserOrStreamerContext = React.createContext<{
  currStreamerData: IStreamerData | undefined;
  currUserData: IUserData | undefined;
  currStreamerBalance: number | undefined;
  streamerCategories: string[] | undefined;
  streamerFollowers: string[] | undefined;
  streamerFollowing: string[] | undefined;
  getCurrStreamerData: (address: string) => Promise<void>;
  getCurrUserData: (address: string) => Promise<void>;
  getStreamerCategories: (address: string) => Promise<void>;
  getStreamerFollowers: (address: string) => Promise<void>;
  getStreamerFollowing: (address: string) => Promise<void>;
}>({
  currStreamerData: undefined,
  currUserData: undefined,
  currStreamerBalance: undefined,
  streamerCategories: undefined,
  streamerFollowers: undefined,
  streamerFollowing: undefined,
  getCurrStreamerData: async () => {},
  getCurrUserData: async () => {},
  getStreamerCategories: async () => {},
  getStreamerFollowers: async () => {},
  getStreamerFollowing: async () => {},
});

export const useCurrUserOrStreamerContext = () =>
  React.useContext(CurrUserOrStreamerContext);

export const CurrentUserOrStreamerContextProvider = ({ children }: any) => {
  const { contract } = useSignerContext();
  const [currStreamerData, setCurrStreamerData] = useState<IStreamerData>();
  const [currStreamerBalance, setCurrStreamerBalance] = useState<number>();
  const [currUserData, setCurrUserData] = useState<IUserData>();
  const [streamerCategories, setStreamerCategories] = useState<string[]>([]);
  const [streamerFollowers, setStreamerFollowers] = useState<string[]>([]);
  const [streamerFollowing, setStreamerFollowing] = useState<string[]>([]);

  const getCurrStreamerData = async (address: string | undefined) => {
    const currStreamerData: IStreamerData = await contract.addToStreamer(
      address
    );
    const bigNumberStreamerId = BigNumber.from(currStreamerData.streamerId);
    const streamerId = bigNumberStreamerId.toString();
    const bigTotalNfts = BigNumber.from(currStreamerData.totalNfts);
    const totalNfts = bigTotalNfts.toString();
    const bigNumberSubscribers = BigNumber.from(currStreamerData.subscribers);
    const subscribers = bigNumberSubscribers.toString();
    const streamerBalanceData = await contract.streamerToBalance(address);
    const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
    setCurrStreamerBalance(streamerBalance);
    setCurrStreamerData({
      ...currStreamerData,
      streamerId: streamerId,
      streamerAdd: currStreamerData.streamerAdd,
      name: currStreamerData.name,
      desp: currStreamerData.desp,
      nftImage: currStreamerData.nftImage,
      profilePicture: currStreamerData.profilePicture,
      totalNfts: totalNfts,
      categories: currStreamerData.categories,
      followers: currStreamerData.followers,
      subscribers: subscribers,
      isLive: currStreamerData.isLive,
    });
  };

  const getCurrUserData = async (address: string | undefined) => {
    const currUserData: IUserData = await contract.addToUser(address);
    const bigNumberUserId = BigNumber.from(currUserData.userId);
    const userId = bigNumberUserId.toString();
    setCurrUserData({
      ...currUserData,
      userId: userId,
      userAdd: currUserData.userAdd,
      name: currUserData.name,
      desp: currUserData.desp,
      profilePicture: currUserData.profilePicture,
      collection: currUserData.collection,
    });
  };

  const getStreamerCategories = async (address: string | undefined) => {
    const streamerCategories: string[] = await contract.getStreamerCategories(
      address
    );
    setStreamerCategories(streamerCategories);
  };

  const getStreamerFollowers = async (address: string | undefined) => {
    const streamerFollowers: string[] = await contract.getStreamerFollowers(
      address
    );
    setStreamerFollowers(streamerFollowers);
  };

  const getStreamerFollowing = async (address: string | undefined) => {
    const streamerFollowing: string[] = await contract.getStreamerFollowing(
      address
    );
    setStreamerFollowing(streamerFollowing);
  };

  return (
    <CurrUserOrStreamerContext.Provider
      value={{
        currStreamerData,
        currUserData,
        currStreamerBalance,
        streamerCategories,
        streamerFollowers,
        streamerFollowing,
        getCurrStreamerData,
        getCurrUserData,
        getStreamerCategories,
        getStreamerFollowers,
        getStreamerFollowing,
      }}
    >
      {children}
    </CurrUserOrStreamerContext.Provider>
  );
};
