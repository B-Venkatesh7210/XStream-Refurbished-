import React from "react";
import CreateProfile from "../../assets/images/CreateProfile.png";
import StartStream from "../../assets/images/StartStream.png";
import WatchStream from "../../assets/images/WatchStream.png";
import BeSubscriber from "../../assets/images/BeSubscriber.png";
import Image from "next/image";

const HowToStart = () => {
  return (
    <div className="w-[40%] h-full bg-secondaryRed/10 rounded-lg border-primaryRed border-[1px] ml-10 flex flex-col justify-start items-center p-4 gap-4 overflow-scroll">
      <span className="text-white font-rubik font-bold text-[2rem] tracking-widest">
        HOW TO GET<span className="text-textRed ml-4">STARTED</span>
      </span>
      <div className="w-[70%] mb-2">
        <Image alt="Create Profile" src={CreateProfile}></Image>
      </div>
      <div className="w-[70%] mb-2">
        <Image alt="Start Stream" src={StartStream}></Image>
      </div>
      <div className="w-[70%] mb-2">
        <Image alt="Watch Stream" src={WatchStream}></Image>
      </div>
      <div className="w-[70%] mb-2">
        <Image alt="Be a Subscriber" src={BeSubscriber}></Image>
      </div>
    </div>
  );
};

export default HowToStart;
