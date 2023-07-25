import React, { useEffect, useState, useContext } from "react";
import { useSignerContext } from "@/contexts/signerContext";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";
import PolygonLogo from "../../assets/logos/PolygonLogo.png";
import { extract } from "query-string/base";
import { useAccount } from "wagmi";
import SecondaryButton from "./SecondaryButton";
import Context from "@/contexts/context";
import { useCurrUserOrStreamerContext } from "@/contexts/currUserOrStreamerContext";
import { useStreamContext } from "@/contexts/streamContext";

interface IStreamerProfileProps {
  isRouterQuery?: boolean;
}

const StreamerProfile: React.FC<IStreamerProfileProps> = ({
  isRouterQuery,
}) => {
  const context: any = useContext(Context);
  const {
    signer,
    streamerData,
    streamerBalance,
    getContractInfo,
    contract,
    nftContract,
    isUser,
    isStreamer,
  } = useSignerContext();
  const [categories, setCategories] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean>(false);
  const { address } = useAccount();
  const {
    currStreamerData,
    streamerCategories,
    streamerFollowers,
    streamerFollowing,
    currStreamerBalance,
    getStreamerCategories,
    getStreamerFollowers,
    getStreamerFollowing,
  } = useCurrUserOrStreamerContext();
  const { setFollowsStreamer, setSubscribedStreamer } = useStreamContext();

  const extract = async () => {
    context.setLoading(true);
    const txn = await contract.extractBalance();
    await txn.wait();
    await getContractInfo();
    context.setLoading(false);
  };

  const getCategories = async (address: string | undefined) => {
    const categories: string[] = await contract.getStreamerCategories(address);
    setCategories(categories);
  };

  const getFollowers = async (address: string | undefined) => {
    const followers: string[] = await contract.getStreamerFollowers(address);
    setFollowers(followers);
  };

  const getFollowing = async (address: string | undefined) => {
    const following: string[] = await contract.getStreamerFollowing(address);
    setFollowing(following);
  };

  const getFollowData = async () => {
    if (isUser) {
      const userFollows: boolean = await contract.userFollowsStreamer(
        address,
        currStreamerData?.streamerAdd
      );
      console.log(address, currStreamerData?.streamerAdd);
      console.log("userFollows", userFollows);
      setFollow(userFollows);
    } else if (isStreamer) {
      const streamerFollows: boolean = await contract.streamerFollowsStreamer(
        address,
        currStreamerData?.streamerAdd
      );
      console.log("streamerFollows", streamerFollows);
      setFollow(streamerFollows);
    }
  };

  const getSubscribedData = async () => {
    const balance = await nftContract.balanceOf(
      address,
      currStreamerData?.streamerId
    );
    if (balance > 0) {
      setSubscribed(true);
    } else {
      setSubscribed(false);
    }
  };

  const followStreamer = async () => {
    context.setLoading(true);
    const followStreamer = await contract.follow(currStreamerData?.streamerAdd);
    await followStreamer.wait();
    context.setLoading(false);
    setFollow(true);
    setFollowsStreamer(true);
  };

  const unfollowStreamer = async () => {
    context.setLoading(true);
    const unfollowStreamer = await contract.unfollow(
      currStreamerData?.streamerAdd
    );
    await unfollowStreamer.wait();
    context.setLoading(false);
    setFollow(false);
    setFollowsStreamer(false);
  };

  const subscribeStreamer = async () => {
    context.setLoading(true);
    const subscribeStreamer = await contract.mintNft(
      currStreamerData?.streamerAdd
    );
    await subscribeStreamer.wait();
    context.setLoading(false);
    setSubscribed(true);
    setSubscribedStreamer(true);
  };
  useEffect(() => {
    if (isRouterQuery) {
      context.setLoading(true);
      getStreamerCategories(currStreamerData?.streamerAdd as string);
      getStreamerFollowers(currStreamerData?.streamerAdd as string);
      getStreamerFollowing(currStreamerData?.streamerAdd as string);
      getSubscribedData();
      getFollowData();
      context.setLoading(false);
    } else if (streamerData) {
      context.setLoading(true);
      getCategories(address);
      getFollowers(address);
      getFollowing(address);
      context.setLoading(false);
    }
  }, [streamerData]);

  return (
    <div className="flex flex-row w-[90%] h-auto mt-8">
      <div className="h-auto flex flex-col justify-start items-center">
        <div className="relative h-[8rem] w-[8rem] p-2 rounded-[50%] bg-primaryGrey flex flex-col justify-center items-center gap-2">
          {/* Default Picture, if the User doesnt have a profile picture */}
          {(isRouterQuery ? currStreamerData : streamerData)?.profilePicture ==
          "" ? (
            <PersonIcon
              style={{ height: "120%", width: "120%", color: "white" }}
            ></PersonIcon>
          ) : (
            <Image
              src={`https://ipfs.io/ipfs/${
                (isRouterQuery ? currStreamerData : streamerData)
                  ?.profilePicture
              }`}
              alt="Profile Picture"
              layout="fill"
              objectFit="contain"
              className="object-cover h-full w-full rounded-[50%]"
            />
          )}
        </div>
        <div className="flex flex-col justify-start items-center mt-10">
          <span
            className="text-primaryRed font-rubik text-lg font-bold"
            onClick={() => {
              console.log(streamerFollowers);
            }}
          >
            Followers
          </span>
          <span className="text-white font-rubik text-lg font-bold">
            {isRouterQuery ? streamerFollowers?.length : followers.length}
          </span>
        </div>
        <div className="flex flex-col justify-start items-center mt-4">
          <span className="text-primaryRed font-rubik text-lg font-bold">
            Following
          </span>
          <span className="text-white font-rubik text-lg font-bold">
            {isRouterQuery ? streamerFollowing?.length : following.length}
          </span>
        </div>
        <div className="flex flex-col justify-start items-center mt-4">
          <span className="text-primaryRed font-rubik text-lg font-bold">
            Subscribers
          </span>
          <span className="text-white font-rubik text-lg font-bold">
            {(isRouterQuery ? currStreamerData : streamerData)?.subscribers}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-[45%] h-auto ml-12 gap-4">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="h-[4.5rem] w-full rounded-lg text-primaryRed drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[3rem] font-dieNasty">
            {(isRouterQuery ? currStreamerData : streamerData)?.name}
          </div>
          {isRouterQuery && (
            <SecondaryButton
              h="h-[2.2rem]"
              textSize="text-[1rem]"
              action1={() => {
                followStreamer();
              }}
              action2={() => {
                unfollowStreamer();
              }}
              disabled={follow}
              iconType="follow"
            ></SecondaryButton>
          )}
        </div>

        <div className="h-auto flex flex-col justify-start items-start w-full">
          <div
            className="h-auto min-h-[8rem] max-h-[20rem] w-full rounded-lg bg-secondaryGrey text-white text-base p-3 overflow-scroll"
            onClick={() => {}}
          >
            {(isRouterQuery ? currStreamerData : streamerData)?.desp}
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-4 gap-4 h-[8rem] w-full mt-12">
          {(isRouterQuery ? (streamerCategories as string[]) : categories).map(
            (category, index) => (
              <div
                key={index}
                className="w-auto px-2 h-[2.4rem] rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-bold text-[0.8rem] bg-primaryRed"
              >
                {category}
              </div>
            )
          )}
        </div>
      </div>
      <div className="h-auto w-[35%] ml-20 flex flex-col justify-start items-center">
        <div className="h-[24rem] w-[24rem]">
          <img
            alt="NFT"
            src={`https://ipfs.io/ipfs/${
              (isRouterQuery ? currStreamerData : streamerData)?.nftImage
            }`}
          ></img>
        </div>
        <div className="flex flex-row justify-center items-center mt-6 mb-4">
          <span className="text-white font-rubik text-[1.2rem] font-normal">
            STREAM MONEY
          </span>
          <div className="flex flex-row justify-start items-center w-auto ml-10">
            <span className="text-white font-rubik text-[2.5rem] font-bold">
              {isRouterQuery ? currStreamerBalance : streamerBalance}
            </span>
            <div className="h-[2rem] w-[2rem] ml-4">
              <Image alt="Polygon Logo" src={PolygonLogo}></Image>
            </div>
          </div>
        </div>
        {isRouterQuery ? (
          <PrimaryButton
            h="h-[3.5rem]"
            w="w-[12rem]"
            textSize="text-[1.2rem]"
            label={subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
            action={() => {
              subscribeStreamer();
            }}
            disabled={subscribed}
          ></PrimaryButton>
        ) : (
          <PrimaryButton
            h="h-[3.5rem]"
            w="w-[12rem]"
            textSize="text-[1.2rem]"
            label="EXTRACT"
            action={() => {
              extract();
            }}
            disabled={
              (isRouterQuery ? currStreamerBalance : streamerBalance) == 0
            }
          ></PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default StreamerProfile;
