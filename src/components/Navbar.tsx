import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import XstreamLogo from "../../assets/logos/XstreamLogo.png";
import XstreamTextLogo from "../../assets/logos/XstreamTextLogo.png";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DropDownMenu from "./DropDownMenu";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

interface NavbarProps {
  isSticky: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div
      className={`h-[15vh] z-50 bg-[#1f1f1f] border-b-2 border-[#3a3a3a] w-full flex flex-row justify-between items-center py-2 px-4 ${
        isSticky ? "fixed top-0" : ""
      }`}
    >
      <div className="flex flex-row justify-start items-center">
        <Image
          alt="Xstream Logo"
          src={XstreamLogo}
          width={80}
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        ></Image>
        <div className="ml-4">
          <Image
            alt="Xstream Text Logo"
            src={XstreamTextLogo}
            width={250}
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          ></Image>
        </div>
      </div>
      <div className="flex flex-row justify-start items-center">
        <ConnectButton></ConnectButton>
        <div
          className="relative h-[3rem] w-auto min-w-[8rem] bg-primaryGrey rounded-sm flex flex-row justify-start items-center py-2 px-4 ml-4 cursor-pointer hover:bg-secondaryGrey"
          onClick={() => {
            setDropDownMenu(!dropDownMenu);
          }}
        >
          <div className="rounded-[50%] w-[2rem] h-[2rem] overflow-hidden">
            <Image
              alt="Profile Picture"
              src={ProfilePicture}
              objectFit="cover"
            ></Image>
          </div>
          <span className="text-textRed font-rubik font-bold ml-3">
            Xstream
          </span>
          {dropDownMenu && <DropDownMenu></DropDownMenu>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
