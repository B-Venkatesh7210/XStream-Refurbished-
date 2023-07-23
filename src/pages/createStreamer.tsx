import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSignerContext } from "@/contexts/signerContext";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { NFTStorage, File, Blob } from "nft.storage";


interface FormDataProps {
  name: string;
  desp: string;
  nftSupply: number;
}

const CreateStreamer = () => {
  const nftSvgString = process.env.NEXT_PUBLIC_NFT_SVG_STRING as string;
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(nftSvgString)}`;
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureName, setProfilePictureName] = useState<string | null>(
    null
  );
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
  const { contract, getContractInfo } = useSignerContext();
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFTSTORAGE_KEY as string,
  });

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
      selectedImage != null &&
      selectedCategories.length != 0
    ) {
      status = false;
    }
    return status;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      setProfilePicture(file);
      setProfilePictureName(file.name);
    } else {
      setSelectedImage(null);
      setProfilePicture(null);
      setProfilePictureName(null);
    }
  };

  const profilePictureUpload = async () => {
    const imageFile = new File(
      [profilePicture as File],
      profilePictureName as string,
      {
        type: profilePicture?.type,
      }
    );
    const imageBlob = imageFile.slice(0, imageFile.size, imageFile.type);
    const cid = await client.storeBlob(imageBlob);
    return cid;
  };

  const uploadNFT = async () => {
    const blob = new Blob([nftStringSVG], { type: "image/svg+xml" });
    const cid = await client.storeBlob(blob);
    const metadata = {
      name: `Xstream NFT ${formData.name}`,
      description: `This NFT is of ${formData.name} with description as ${formData.desp}.`,
      image: `ipfs://${cid}`,
    };
    const metadataJSON = JSON.stringify(metadata);
    const metadataBlob = new Blob([metadataJSON], { type: "application/json" });
    const metadataCID = await client.storeBlob(metadataBlob);
    console.log(metadataCID);
    const metaData = `ipfs://${metadataCID}`;
    return { metadata: metaData, cid: cid };
  };

  const createStreamer = async () => {
    console.log(selectedCategories)
    const profilePictureCid = await profilePictureUpload();
    console.log(profilePictureCid)
    const { metadata, cid } = await uploadNFT();
    const bigNftSupply = ethers.utils.parseUnits(
      formData.nftSupply.toString(),
      0
    );

    const createStreamer = await contract.createStreamer(
      formData.name,
      formData.desp,
      metadata,
      cid,
      profilePictureCid,
      bigNftSupply,
      selectedCategories
    );
    await createStreamer.wait()
    await getContractInfo()
    router.push("/dashboard")
  };

  return (
    <div className="bg flex flex-col justify-start items-center">
      <Navbar isSticky={false}></Navbar>
      <div className="h-[24rem] w-[24rem] mt-8">
        <Image alt="NFT" src={nftString} width="448" height="448" />
      </div>
      <div className="h-auto w-[75%] bg-primaryGrey/40 rounded-sm flex flex-col justify-center items-start py-8 px-20 my-8 gap-8">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-[60%] flex flex-col justify-start items-start gap-2">
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
          <div className="relative h-[10rem] w-[10rem] p-2 rounded-[50%] bg-secondaryGrey flex flex-col justify-center items-center gap-2">
            {selectedImage ? (
              <>
                <Image
                  src={selectedImage}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="contain"
                  className="object-cover h-full w-full rounded-[50%]"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <>
                <AddAPhotoIcon
                  style={{ fontSize: 30, color: "white" }}
                ></AddAPhotoIcon>
                {selectedImage ? (
                  <>
                    <Image
                      src={selectedImage}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="contain"
                      className="object-cover h-full w-full rounded-[50%]"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </>
                ) : (
                  <>
                    <span className="text-center text-white text-[0.8rem]">
                      Choose Profile Picture
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </>
            )}
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
            w="w-[15rem]"
            textSize="text-[1.2rem]"
            label={"CREATE STREAMER"}
            action={() => {
              createStreamer();
            }}
            disabled={handleAllCheck()}
          ></PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CreateStreamer;
