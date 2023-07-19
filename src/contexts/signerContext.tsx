import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Signer } from "ethers";
import { useSigner } from "wagmi";
import contractConfig from "../config/contractConfig";
import nftContractConfig from "../config/nftContractConfig";

export const SignerContext = React.createContext<{
  signer: Signer | undefined | null;
  contract: any;
  nftContract: any;
}>({
  signer: undefined,
  contract: undefined,
  nftContract: undefined,
});

export const useSignerContext = () => useContext(SignerContext);

export const SignerContextProvider = ({ children }: any) => {
  const { data: signer, isError } = useSigner();
  const [contract, setContract] = useState();
  const [nftContract, setNftContract] = useState();

  useEffect(() => {
    if (signer) {
      console.log(signer);
      const settingContract = async () => {
        const contract: any = new ethers.Contract(
          contractConfig.address,
          contractConfig.abi,
          signer as Signer
        );
        const nftContract: any = new ethers.Contract(
          nftContractConfig.address,
          nftContractConfig.abi,
          signer as Signer
        );
        setContract(contract);
        setNftContract(nftContract);
      };
      if (signer) {
        settingContract();
      }
    }
  }, [signer]);

  return (
    <SignerContext.Provider value={{ signer, contract, nftContract }}>
      {children}
    </SignerContext.Provider>
  );
};
