import Navbar from "@/components/Navbar";
import { useSignerContext } from "@/contexts/signerContext";
import React from "react";
import { useSigner } from "wagmi";
import { useAccount } from "wagmi";

const Home = () => {
  const { contract, signer } = useSignerContext();
  const { data: signer1 } = useSigner();
  const { isDisconnected } = useAccount();

  return (
    <div className="bg flex flex-col justify-start items-center scrollbar-hidden content">
      <Navbar isSticky={true}></Navbar>
      <div className="h-[100vh] w-full flex flex-col justify-center items-center">
        {!isDisconnected && (
          <span
            className="text-white text-[2rem]"
            onClick={() => {
              console.log(contract, signer, signer1);
            }}
          >
            Hello
          </span>
        )}
      </div>
    </div>
  );
};

export default Home;
