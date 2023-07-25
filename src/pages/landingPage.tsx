import React, { useRef, useState } from "react";
import { Router, useRouter } from "next/router";
import PrimaryButton from "@/components/PrimaryButton";
import Image from "next/image";
import XstreamNFTRed from "../../assets/images/Xstream NFT Red.png";
import XstreamNFTGreen from "../../assets/images/Xstream NFT Green.png";
import XstreamNFTBlue from "../../assets/images/Xstream NFT Blue.png";
import XstreamNFTPurple from "../../assets/images/Xstream NFT Purple.png";
import LiveStreamImg from "../../assets/images/LiveStreamImg.png";
import LiveChatImg from "../../assets/images/LiveChatImg.png";
import TokenGatedImg from "../../assets/images/TokenGatedImg.png";
import CreateProfile from "../../assets/images/CreateProfile.png";
import StartStream from "../../assets/images/StartStream.png";
import WatchStream from "../../assets/images/WatchStream.png";
import BeSubscriber from "../../assets/images/BeSubscriber.png";
import Youtube from "../../assets/logos/Youtube.png";
import Navbar from "@/components/Navbar";
import XstreamTextLogo from "../../assets/logos/XstreamTextLogo.png";
import Huddle01 from "../../assets/logos/Huddle01.png";
import IPFSLogo from "../../assets/logos/IPFSLogo.png";
import PolygonLogo from "../../assets/logos/PolygonLogo.png";
import Slider from "react-slick";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-start items-center h-auto">
      <Main></Main>
      <LiveStream></LiveStream>
      <LiveChat></LiveChat>
      <TokenGated></TokenGated>
      <HowToStart></HowToStart>
    </div>
  );
};

const Main = () => {
  const router = useRouter();
  return (
    <div className="bg1 flex flex-col justify-start items-center">
      <div className="h-[10vh] z-[1000] bg-[#1f1f1f] border-b-2 border-[#3a3a3a] w-full flex flex-row justify-between items-center py-2 px-4 fixed top-0">
        <div className="ml-4">
          <Image
            alt="Xstream Text Logo"
            src={XstreamTextLogo}
            width={200}
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          ></Image>
        </div>
        <div className="flex flex-row justify-start items-center gap-4">
          <span className="text-white text-[1.5rem] font-rubik font-semibold mr-4">
            POWERED BY
          </span>
          <div className="w-[6rem]">
            <Image alt="Huddle01 Logo" src={Huddle01}></Image>
          </div>
          <div className="w-[3rem]">
            <Image alt="IPFS Logo" src={IPFSLogo}></Image>
          </div>
          <div className="w-[2rem]">
            <Image alt="IPFS Logo" src={PolygonLogo}></Image>
          </div>
        </div>
      </div>
      <div className="h-[10vh] w-full"></div>
      <div className="h-[85vh] w-full flex flex-row justify-start items-center px-[10rem]">
        <div className="w-[50%] flex flex-col justify-start items-start gap-8">
          <div className="flex flex-col justify-start items-start">
            <span className="text-white font-rubik font-bold text-[4rem]">
              The Nextwave For
            </span>
            <span className="flex flex-rw justify-start items-center font-rubik font-bold text-[3.5rem] gap-4">
              <span className="text-white">NFT</span>
              <span className="linear-text">Live Stream</span>
            </span>
            <span className="text-white font-rubik font-bold text-[3rem]">
              with Exclusivity
            </span>
          </div>
          <div className="flex flex-col justify-start items-start">
            <span className="text-white font-rubik font-normal text-[1.25rem] tracking-wider">
              Watch Exclusive Live Streams with Superchat and buy NFTs of your
              favourite streamers
            </span>
          </div>
          <div className="w-[80%] flex flex-row justify-between items-center mt-4">
            <PrimaryButton
              h="h-[3.5rem]"
              w="w-[12rem]"
              textSize="text-[1.2rem]"
              label={"ENTER DAPP"}
              action={() => {
                router.push("/home");
              }}
              disabled={false}
            ></PrimaryButton>
            <a target="_blank" href="https://devfolio.co/projects/xstream-8a0e">
              <div className="h-[3.5rem] w-[12rem] flex flex-row text-white justify-center items-center text-[1.2rem] font-rubik font-extrabold transition delay-75 rounded-[2px] border-[1.5px] border-solid border-secondaryGrey bg-primaryGrey cursor-pointer hover:bg-secondaryGrey">
                LEARN MORE
              </div>
            </a>
          </div>
        </div>
        <div className="relative w-[50%] h-[50vh] flex flex-col justify-start items-start gap-8">
          <div className="absolute h-[18rem] w-[18rem] left-[40%] z-[100]">
            <Image alt="Xstream NFT Red" src={XstreamNFTRed}></Image>
          </div>
          <div className="absolute h-[10rem] w-[10rem] left-[20%] top-[60%] z-[50]">
            <Image alt="Xstream NFT Green" src={XstreamNFTGreen}></Image>
          </div>
          <div className="absolute h-[14rem] w-[14rem] left-[12%] top-[-10%] z-[75]">
            <Image alt="Xstream NFT Green" src={XstreamNFTBlue}></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

const LiveStream = () => {
  return (
    <div className="bg2 flex flex-row justify-between items-start px-[6rem] pt-[6rem]">
      <div className="w-[60%] h-full flex flex-col justify-start items-start gap-4">
        <span className="text-white font-rubik font-bold text-[3rem] tracking-widest">
          <span className="text-textRed">LIVE</span> Stream Section
        </span>
        <span className="text-white font-rubik font-normal text-[1.2rem] tracking-widest">
          Streamers can live stream for the audience powered by HUDDLE01 SDK,
          streamers can start{" "}
          <span className="text-textRed font-bold">EXCLUSIVE STREAMS</span>{" "}
          which only their subscribers owning their NFT can watch. Viewers can
          send chat and Superchat to their favourite streamers with MATIC tokens
        </span>
      </div>
      <div className="w-[40%] h-full flex flex-col justify-center items-center">
        <div className="w-[70%] h-[80%] ml-20">
          <Image alt="Live Stream Section" src={LiveStreamImg}></Image>
        </div>
      </div>
    </div>
  );
};

const LiveChat = () => {
  return (
    <div className="bg3 flex flex-row-reverse justify-between items-start px-[6rem] pt-[6rem]">
      <div className="w-[60%] h-full flex flex-col justify-start items-start gap-4 ml-[2rem]">
        <span className="text-white font-rubik font-bold text-[3rem] tracking-widest">
          <span className="text-textRed">Live</span> Superchats and Chat
        </span>
        <span className="text-white font-rubik font-normal text-[1.2rem] tracking-widest">
          Viewers can send superchats and chats to their favourite streamers
          with
          <span className="text-textRed font-bold">MATIC TOKENS</span> which can
          support streamers to stream more on the platform without any
          intermediary fees.
        </span>
      </div>
      <div className="w-[40%] h-full flex flex-col justify-center items-center">
        <div className="w-[70%] h-[80%] mr-20 mb-10">
          <Image alt="Live Stream Section" src={LiveChatImg}></Image>
        </div>
      </div>
    </div>
  );
};

const TokenGated = () => {
  return (
    <div className="bg4 flex flex-row justify-between items-start px-[6rem] pt-[6rem] mb-20">
      <div className="w-[60%] h-full flex flex-col justify-start items-start gap-4 ml-[2rem]">
        <span className="text-white font-rubik font-bold text-[3rem] tracking-widest">
          <span className="text-textRed">TOKEN GATED</span> Live Streaming
        </span>
        <span className="text-white font-rubik font-normal text-[1.2rem] tracking-widest">
          <span className="text-textRed">ERC1155 NFT tokens</span> are minted to
          the subscribers who subscriber to the streamer and can watch their
          exclusive content on XStream. These NFTs are transferralble and can be
          sold on the marketplace. The NFTs metadata and additional details are
          stored on IPFS in a secure way.
        </span>
      </div>
      <div className="w-[40%] h-full flex flex-col justify-center items-center">
        <div className="w-[90%] h-[80%] ml-20">
          <Image alt="Live Stream Section" src={TokenGatedImg}></Image>
        </div>
      </div>
    </div>
  );
};

const HowToStart = () => {
  return (
    <div className="bg5 flex flex-col justify-start items-center px-[6rem] pt-[6rem]">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <span className="text-white font-rubik font-bold text-[4.5rem] tracking-widest">
          HOW TO GET<span className="text-textRed ml-4">STARTED</span>
        </span>
      </div>
      <div className="w-[65%] h-[75%] grid grid-cols-2 grid-rows-2 gap-4 mt-20">
        <div className="w-[90%]">
          <Image alt="Create Profile" src={CreateProfile}></Image>
        </div>
        <div className="w-[90%]">
          <Image alt="Start Stream" src={StartStream}></Image>
        </div>
        <div className="w-[90%]">
          <Image alt="Watch Stream" src={WatchStream}></Image>
        </div>
        <div className="w-[90%]">
          <Image alt="Be a Subscriber" src={BeSubscriber}></Image>
        </div>
      </div>
      <span className="text-white font-rubik font-semibold text-[2rem]">
        Watch Video Demo
      </span>
      <a target="_blank" href="https://youtu.be/9xzaC6M2UWU">
        <div className="h-[4rem] w-[8rem] rounded-xl bg-secondaryRed/40 border-primaryRed border-[1px] mt-2 cursor-pointer flex flex-row justify-center items-center">
          <div className="h-[2.5rem] w-[2.5rem]">
            <Image alt="Youtube" src={Youtube}></Image>
          </div>
        </div>
      </a>
    </div>
  );
};

export default LandingPage;
