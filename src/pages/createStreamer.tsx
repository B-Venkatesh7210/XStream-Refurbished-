import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";

interface FormDataProps {
  name: string;
  desp: string;
  nftSupply: number;
}

const CreateStreamer = () => {
  const nftSvgString = process.env.NEXT_PUBLIC_NFT_SVG_STRING as string;
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(nftSvgString)}`;
  const [nftString, setNftString] = useState<string>(svgDataUrl);
  const [nftStringSVG, setNftStringSVG] = useState<string>(nftSvgString);
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    desp: "",
    nftSupply: 0,
  });
  const categories: string[] = [
    "Entertainment",
    "Gaming",
    "Reaction",
    "Music",
    "Movies",
    "Sports",
    "News",
    "Vlogs",
    "Tutorial",
    "Animals",
    "Fashion",
    "Cinema",
    "Fund Raising",
    "Philanthropy",
    "Climate",
    "Other",
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      // If the category is already selected, remove it from the selectedCategories array
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    } else {
      // If the category is not selected, add it to the selectedCategories array
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const handleNameChange = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
    const nftSupply = formData.nftSupply;
    if (nftSupply == 0) {
      if (e.target.value.length > 10) {
        const newString = nftSvgString.replace("Venmus", e.target.value);
        const sizeChangedString = newString.replace("130.721", "70.721");
        setNftStringSVG(sizeChangedString);
        setNftString(`data:image/svg+xml;base64,${btoa(sizeChangedString)}`);
      } else {
        const newString = nftSvgString.replace("Venmus", e.target.value);
        setNftStringSVG(newString);
        setNftString(`data:image/svg+xml;base64,${btoa(newString)}`);
      }
    } else {
      let newString;
      const startIndex = 1409;
      const endIndex = 1411;
      const prefix = nftSvgString.substring(0, startIndex);
      console.log(prefix);
      const suffix = nftSvgString.substring(endIndex);
      newString = prefix + formData.nftSupply + suffix;
      if (e.target.value.length > 10) {
        newString = newString.replace("Venmus", e.target.value);
        const sizeChangedString = newString.replace("130.721", "70.721");
        newString = sizeChangedString;
      } else {
        newString = newString.replace("Venmus", e.target.value);
      }
      setNftStringSVG(newString);
      setNftString(`data:image/svg+xml;base64,${btoa(newString)}`);
    }
  };

  const handleDespChange = (event: any) => {
    setFormData({ ...formData, desp: event.target.value });
  };

  const handleNftSupplyChange = (e: any) => {
    setFormData({ ...formData, nftSupply: e.target.value });
    let newString;
    const startIndex = 1409;
    const endIndex = 1411;
    const prefix = nftSvgString.substring(0, startIndex);
    const suffix = nftSvgString.substring(endIndex);
    newString = prefix + e.target.value + suffix;
    const name = formData.name;
    if (name.length > 10) {
      newString = newString.replace("Venmus", name);
      const sizeChangedString = newString.replace("130.721", "70.721");
      newString = sizeChangedString;
    } else {
      newString = newString.replace("Venmus", name);
    }
    setNftStringSVG(newString);
    setNftString(`data:image/svg+xml;base64,${btoa(newString)}`);
  };

  const handleAllCheck = () => {
    let status = true;
    if (
      formData.name != "" &&
      formData.desp != "" &&
      formData.nftSupply != 0 &&
      selectedCategories.length != 0
    ) {
      status = false;
    }
    return status;
  };

  return (
    <div className="bg flex flex-col justify-start items-center">
      <Navbar isSticky={false}></Navbar>
      <div className="h-[24rem] w-[24rem] mt-8">
        <Image alt="NFT" src={nftString} width="448" height="448" />
      </div>
      <div className="h-auto w-[75%] bg-primaryGrey rounded-sm flex flex-col justify-center items-start py-8 px-20 my-8 gap-8">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
            Name
          </span>
          <div className="h-[4rem] w-full bg-secondaryGrey rounded-sm pl-4">
            <input
              type="text"
              id="name"
              className="appearance-none bg-transparent border-none outline-none text-primaryRed drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[2.5rem] font-dieNasty"
              onChange={(e: any) => {
                handleNameChange(e);
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
            Description
          </span>
          <div className="h-[10rem] w-full bg-secondaryGrey rounded-sm pl-4">
            <textarea
              id="desp"
              value={formData.desp}
              className="appearance-none bg-transparent border-none outline-none text-white text-[1.2rem] font-medium w-full h-full font-rubik overflow-auto py-4 resize-none"
              onChange={(e: any) => {
                handleDespChange(e);
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
            Number of NFTs
          </span>
          <div className="w-[20%] bg-secondaryGrey rounded-sm pl-4">
            <input
              type="number"
              min={0}
              id="nftSupply"
              className="appearance-none bg-transparent w-full border-none outline-none text-primaryRed drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[2.5rem] font-dieNasty"
              onChange={(e: any) => {
                handleNftSupplyChange(e);
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <span className="text-white text-[1.4rem] font-rubik font-normal tracking-widest">
            Categories
          </span>
          <div className="grid grid-flow-row grid-cols-6 gap-4 h-[8rem] w-full mt-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`w-auto px-2 h-[2.4rem] rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-bold text-[0.8rem] cursor-pointer ${
                  selectedCategories.includes(category)
                    ? "bg-primaryRed"
                    : "bg-secondaryGrey"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-row justify-end items-center mt-8">
          <PrimaryButton
            h="h-[3.5rem]"
            w="w-[12rem]"
            textSize="text-[1.2rem]"
            label={"CREATE USER"}
            action={() => {
              console.log("Clicked");
            }}
            disabled={handleAllCheck()}
          ></PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CreateStreamer;
