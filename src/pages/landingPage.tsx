import React from "react";
import { Router, useRouter } from "next/router";

const LandingPage = () => {
  return (
    <div className="w-screen h-auto flex flex-col justify-start items-center">
      <Home></Home>
    </div>
  );
};

const Home = () => {
  const router = useRouter();
  return (
    <div className="bg1 flex flex-col justify-start items-center">
      <div className="h-[15vh] w-full text-white bg-red-500 flex flex-col justify-center items-center">
        Navbar
      </div>
      <div className="h-[85vh] w-full flex flex-col justify-center items-center">
        <button
          className="h-[4rem] w-[10rem] bg-blue-400"
          onClick={() => {
            router.push("/homePage")
          }}
        >
          Enter the Dapp
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
