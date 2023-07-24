import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import EditProfile from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";
import { useSignerContext } from "@/contexts/signerContext";
import Image from "next/image";
import StreamerImage from "../../assets/images/streamer.png";
import UserImage from "../../assets/images/user.png";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/router";
import ChooseWisely from "@/components/ChooseWisely";
import { useAccount } from "wagmi";
import StreamerProfile from "@/components/StreamerProfile";

const Dashboard = () => {
  const [enterEdit, setEnterEdit] = useState(false);
  const {
    isUser,
    isStreamer,
    userData,
    streamerData,
    signer,
    getContractInfo,
  } = useSignerContext();

  const [choseUser, setChoseUser] = useState(false);
  const router = useRouter();
  const { address } = useAccount();
  const [isRouterQuery, setIsRouterQuery] = useState<boolean>(false);

  useEffect(() => {
    const gettingQuery = () => {
      const replaceSpacesWithHyphens = (name: string) =>
        name.replace(/\s+/g, "-");
      // Set the query parameter based on the conditions
      let queryParam = "";
      console.log(isUser, isStreamer);
      if (isUser) {
        console.log("isUser");
        const userName = userData?.name || "";
        queryParam = `user=${replaceSpacesWithHyphens(userName)}`;
      } else if (isStreamer) {
        console.log("isStreamer");
        const streamerName = streamerData?.name || "";
        queryParam = `streamer=${replaceSpacesWithHyphens(streamerName)}`;
      } else {
        console.log("isIdle");
        queryParam = `idle=${address}`;
      }

      // Redirect to the updated URL with the query parameter
      router.replace(`/dashboard?${queryParam}`, undefined, { shallow: true });
    };
    if (signer || address) {
      if (router.query.streamer) {
        setIsRouterQuery(true);
      } else if (router.query.user) {
        setIsRouterQuery(true);
      } else {
        gettingQuery();
      }
    }
  }, [signer, address, isUser, isStreamer, streamerData]);

  return (
    <div className="bg flex flex-col justify-start items-center">
      <Navbar isSticky={false}></Navbar>
      {isRouterQuery ? (
        <>
          {router.query.streamer && (
            <div className="h-auto min-h-[80vh] mt-8 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
              <StreamerProfile isRouterQuery={isRouterQuery}></StreamerProfile>
            </div>
          )}
          {router.query.user && (
            <div className="h-[80vh] m-4 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
              <UserProfile isRouterQuery={isRouterQuery}></UserProfile>
            </div>
          )}
        </>
      ) : (
        <>
          {!isUser && !isStreamer && !choseUser && (
            <ChooseWisely setChoseUser={setChoseUser}></ChooseWisely>
          )}
          {choseUser && (
            <div className="h-[80vh] m-4 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
              <EditProfile setChoseUser={setChoseUser}></EditProfile>
            </div>
          )}
          {isUser && (
            <div className="h-[80vh] m-4 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
              {enterEdit ? (
                <EditProfile setEnterEdit={setEnterEdit}></EditProfile>
              ) : (
                <UserProfile
                  isRouterQuery={isRouterQuery}
                  setEnterEdit={setEnterEdit}
                ></UserProfile>
              )}
            </div>
          )}
          {isStreamer && (
            //TODO change height to h-auto
            <div className="h-auto min-h-[80vh] mt-8 w-[90%] bg-secondaryGrey bg-opacity-20 rounded-2xl flex flex-col justify-start items-center">
              <StreamerProfile isRouterQuery={isRouterQuery}></StreamerProfile>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
