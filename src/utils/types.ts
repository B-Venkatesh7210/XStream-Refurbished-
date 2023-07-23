import { BigNumber } from "ethers"; 

export interface IContractConfig {
  address: string;
  abi: any[];
}

export interface IUserData {
  userId: string;
  userAdd: string;
  name: string;
  desp: string;
  profilePicture: string;
  collection: string[] | undefined;
  following: string[] | undefined;
}

export interface IStreamerData {
  streamerId: string;
  streamerAdd: string;
  name: string;
  desp: string;
  nftImage: string;
  profilePicture: string;
  totalNfts: string;
  categories: string[];
  followers: string[] | undefined;
  following: string[] | undefined;
  subscribers: string;
  isLive: boolean;
  recordingUrls: string[] | undefined;
}

export interface IStreamData {
  streamId: BigNumber;
  streamer: string;
  streamerName: string;
  roomId: string;
  title: string;
  desp: string;
  thumbnail: string;
  exclusive: boolean;
  categories: string[];
  hashtags: string;
  isLive: boolean;
  totalAmount: BigNumber;
}
