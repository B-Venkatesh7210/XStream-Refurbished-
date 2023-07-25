import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import XstreamLogo from "../../assets/logos/XstreamLogo.png";
import XstreamTextLogo from "../../assets/logos/XstreamTextLogo.png";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import PolygonLogo from "../../assets/logos/PolygonLogo.png";
import Account from "../../assets/images/account.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DropDownMenu from "./DropDownMenu";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { useSignerContext } from "@/contexts/signerContext";
import { getEllipsisTxt } from "@/utils/formatters";

interface NavbarProps {
  isSticky: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const router = useRouter();
  const {
    isUser,
    isStreamer,
    userData,
    streamerData,
    streamerBalance,
    signer,
  } = useSignerContext();
  const { isDisconnected, address } = useAccount();

  let ellipAddress;
  if (signer) {
    ellipAddress = getEllipsisTxt(address, 4);
  }

  return (
    <div
      className={`h-[10vh] z-[1000] bg-[#1f1f1f] border-b-2 border-[#3a3a3a] w-full flex flex-row justify-between items-center py-2 px-4 ${
        isSticky ? "fixed top-0" : ""
      }`}
    >
      <div className="flex flex-row justify-start items-center">
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
      </div>
      <div className="flex flex-row justify-start items-center">
        <ConnectButton showBalance={false}></ConnectButton>
        {isStreamer && (
          <div className="flex flex-col justify-start items-center mx-8">
            <span className="text-white font-rubik text-[0.8rem] font-normal">
              STREAM MONEY
            </span>
            <div className="flex flex-row justify-start items-center w-auto">
              <span className="text-white font-rubik text-[1.2rem] font-bold">
                {streamerBalance}
              </span>
              <div className="h-[1rem] w-[1rem] ml-2">
                <Image alt="Polygon Logo" src={PolygonLogo}></Image>
              </div>
            </div>
          </div>
        )}

        {!isDisconnected && (
          <div
            className="relative h-[2.5rem] w-auto bg-primaryGrey rounded-sm flex flex-row justify-start items-center py-2 px-4 ml-4 cursor-pointer hover:bg-secondaryGrey"
            onClick={() => {
              setDropDownMenu(!dropDownMenu);
            }}
          >
            <div className="rounded-[50%] w-[1.5rem] h-[1.5rem] overflow-hidden bg-white/70">
              <Image
                alt="Profile Picture"
                src={
                  isUser
                    ? `https://ipfs.io/ipfs/${userData?.profilePicture}`
                    : isStreamer
                    ? `https://ipfs.io/ipfs/${streamerData?.profilePicture}`
                    : Account
                }
                objectFit="cover"
                width={200}
                height={200}
              ></Image>
            </div>
            <span className="text-textRed text-[1rem] font-rubik font-bold ml-3">
              {isUser
                ? userData?.name
                : isStreamer
                ? streamerData?.name
                : ellipAddress}
            </span>
            {dropDownMenu && <DropDownMenu></DropDownMenu>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
