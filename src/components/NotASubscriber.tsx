import { useCurrUserOrStreamerContext } from "@/contexts/currUserOrStreamerContext";
import { IStreamerData } from "@/utils/types";
import React from "react";
import Router from "next/router";
import PrimaryButton from "./PrimaryButton";

interface NotASubscriberProps {
    streamerData: IStreamerData | undefined;
}

const NotASubscriber: React.FC<NotASubscriberProps> = ({
    streamerData
}) => {

    const {getCurrStreamerData} = useCurrUserOrStreamerContext()

  return (
    <div className="w-[90%] h-[85vh] mt-6 flex flex-col justify-center items-center gap-4">
      <span className="text-textRed text-[6rem] font-rubik font-bold">
        EXCLUSIVE STREAM
      </span>
      <span className="text-white text-[3rem] font-rubik font-bold tracking-[0.4rem] mb-4">
        YOU ARE NOT A SUBSCRIBER
      </span>
      <PrimaryButton
        h="h-[3.5rem]"
        w="w-[15rem]"
        textSize="text-[1.2rem]"
        label={"VISIT STREAMER"}
        action={async () => {
          await getCurrStreamerData(streamerData?.streamerAdd as string);
          Router.push({
            pathname: "/dashboard",
            query: { streamer: streamerData?.name },
          });
        }}
        disabled={false}
      ></PrimaryButton>
    </div>
  );
};

export default NotASubscriber;
