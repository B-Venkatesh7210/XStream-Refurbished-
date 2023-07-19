import { IContractConfig } from "../utils/types"

const contractConfig: IContractConfig = {
  address: "0x4a3810F0678f6DBDa5167DE8267e600EbbE3FdDC",
  abi: [
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
          internalType: "uint256",
          name: "_totalNfts",
          type: "uint256",
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
          internalType: "uint256",
          name: "totalNfts",
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
