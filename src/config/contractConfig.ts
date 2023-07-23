import { IContractConfig } from "../utils/types";

const contractConfig: IContractConfig = {
  address: "0x363FE396B762810cD96CBDe2Ed2bD4B34B50a580",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_nftContractAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isSubscriber",
          type: "bool",
        },
      ],
      name: "ChatReceived",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "streamId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "streamer",
          type: "address",
        },
      ],
      name: "StreamStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "streamId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "streamer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "streamerName",
          type: "string",
        },
      ],
      name: "StreamStopped",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "addToStreamer",
      outputs: [
        {
          internalType: "uint256",
          name: "streamerId",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "streamerAdd",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "nftImage",
          type: "string",
        },
        {
          internalType: "string",
          name: "profilePicture",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "totalNfts",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "subscribers",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isLive",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "addToUser",
      outputs: [
        {
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "userAdd",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "profilePicture",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_streamId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_message",
          type: "string",
        },
        {
          internalType: "bool",
          name: "_isSubscriber",
          type: "bool",
        },
      ],
      name: "chat",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "_metadata",
          type: "string",
        },
        {
          internalType: "string",
          name: "_nftImage",
          type: "string",
        },
        {
          internalType: "string",
          name: "_profilePicture",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_totalNfts",
          type: "uint256",
        },
        {
          internalType: "string[]",
          name: "_categories",
          type: "string[]",
        },
      ],
      name: "createStreamer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "_profilePicture",
          type: "string",
        },
      ],
      name: "createUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "_profilePicture",
          type: "string",
        },
      ],
      name: "editUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "extractBalance",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_streamerAdd",
          type: "address",
        },
      ],
      name: "follow",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_streamId",
          type: "uint256",
        },
      ],
      name: "getAllChats",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "string",
              name: "message",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isSubscriber",
              type: "bool",
            },
          ],
          internalType: "struct xstream.Chat[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLiveStreams",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "streamId",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "streamer",
              type: "address",
            },
            {
              internalType: "string",
              name: "streamerName",
              type: "string",
            },
            {
              internalType: "string",
              name: "roomId",
              type: "string",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "string",
              name: "desp",
              type: "string",
            },
            {
              internalType: "string",
              name: "thumbnail",
              type: "string",
            },
            {
              internalType: "bool",
              name: "exclusive",
              type: "bool",
            },
            {
              internalType: "string[]",
              name: "categories",
              type: "string[]",
            },
            {
              internalType: "string",
              name: "hashtags",
              type: "string",
            },
            {
              internalType: "bool",
              name: "isLive",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "totalAmount",
              type: "uint256",
            },
          ],
          internalType: "struct xstream.Stream[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_streamId",
          type: "uint256",
        },
      ],
      name: "getStreamCategories",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_streamer",
          type: "address",
        },
      ],
      name: "getStreamerCategories",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_streamer",
          type: "address",
        },
      ],
      name: "getStreamerFollowers",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_streamer",
          type: "address",
        },
      ],
      name: "getStreamerFollowing",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_streamer",
          type: "address",
        },
      ],
      name: "getStreamerRecordingUrls",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "getUserCollection",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "getUserFollowing",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "idToChats",
      outputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "string",
          name: "message",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isSubscriber",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "idToStream",
      outputs: [
        {
          internalType: "uint256",
          name: "streamId",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "streamer",
          type: "address",
        },
        {
          internalType: "string",
          name: "streamerName",
          type: "string",
        },
        {
          internalType: "string",
          name: "roomId",
          type: "string",
        },
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "string",
          name: "desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "thumbnail",
          type: "string",
        },
        {
          internalType: "bool",
          name: "exclusive",
          type: "bool",
        },
        {
          internalType: "string",
          name: "hashtags",
          type: "string",
        },
        {
          internalType: "bool",
          name: "isLive",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "totalAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "isStreamer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "isUser",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "liveStreamIndices",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "liveStreams",
      outputs: [
        {
          internalType: "uint256",
          name: "streamId",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "streamer",
          type: "address",
        },
        {
          internalType: "string",
          name: "streamerName",
          type: "string",
        },
        {
          internalType: "string",
          name: "roomId",
          type: "string",
        },
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "string",
          name: "desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "thumbnail",
          type: "string",
        },
        {
          internalType: "bool",
          name: "exclusive",
          type: "bool",
        },
        {
          internalType: "string",
          name: "hashtags",
          type: "string",
        },
        {
          internalType: "bool",
          name: "isLive",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "totalAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_streamer",
          type: "address",
        },
      ],
      name: "mintNft",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "nftContract",
      outputs: [
        {
          internalType: "contract XstreamNFT",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_recordingUrl",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_streamId",
          type: "uint256",
        },
      ],
      name: "saveRecording",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_title",
          type: "string",
        },
        {
          internalType: "string",
          name: "_thumbnail",
          type: "string",
        },
        {
          internalType: "string",
          name: "_desp",
          type: "string",
        },
        {
          internalType: "string",
          name: "_roomId",
          type: "string",
        },
        {
          internalType: "bool",
          name: "_exclusive",
          type: "bool",
        },
        {
          internalType: "string[]",
          name: "_categories",
          type: "string[]",
        },
        {
          internalType: "string",
          name: "_hashtags",
          type: "string",
        },
      ],
      name: "startStream",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_streamId",
          type: "uint256",
        },
      ],
      name: "stopStream",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "streamId",
      outputs: [
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "streamerFollowsStreamer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "streamerId",
      outputs: [
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "streamerToBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_streamerAdd",
          type: "address",
        },
      ],
      name: "unfollow",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "userFollowsStreamer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "userId",
      outputs: [
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_streamId",
          type: "uint256",
        },
      ],
      name: "watchStream",
      outputs: [],
      stateMutability: "view",
      type: "function",
    },
  ],
};

export default contractConfig;
