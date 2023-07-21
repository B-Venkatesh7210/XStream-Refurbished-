import React from "react";
import { useRouter } from "next/router";
import PrimaryButton from "./PrimaryButton";

interface ChooseWiselyProps {
  setChoseUser: any;
}

const ChooseWisely: React.FC<ChooseWiselyProps> = ({ setChoseUser }) => {
  const router = useRouter();

  return (
    <div className="w-[70%] h-[80vh] mt-6 flex flex-col justify-start items-center rounded-md">
      <div className="text-white font-rubik font-bold text-[4rem] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        CHOOSE WISELY
      </div>
      <div className="w-[90%] flex flex-row justify-between items-center mt-8">
        <div className="parent-div">
          <div className="absolute bottom-4 right-0">
            <PrimaryButton
              h="h-[3.5rem]"
              w="w-[12rem]"
              textSize="text-[1.2rem]"
              label={"STREAMER"}
              action={() => {
                router.push("/createStreamer");
              }}
              disabled={false}
            ></PrimaryButton>
          </div>
        </div>
        <div className="parent-div2">
          <div className="absolute bottom-4 left-0">
            <PrimaryButton
              h="h-[3.5rem]"
              w="w-[12rem]"
              textSize="text-[1.2rem]"
              label={"VIEWER"}
              action={() => {
                setChoseUser(true);
              }}
              disabled={false}
            ></PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseWisely;
