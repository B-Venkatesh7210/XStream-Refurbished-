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
  collection: string[];
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
  followers: string[];
  subscribers: string;
  isLive: boolean;
  recordingUrls: string[];
}
