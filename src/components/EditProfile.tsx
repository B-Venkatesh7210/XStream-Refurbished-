import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Image from "next/image";
import { useSignerContext } from "@/contexts/signerContext";
import PrimaryButton from "@/components/PrimaryButton";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import { NFTStorage, File, Blob } from "nft.storage";
import { useRouter } from "next/router";

interface FormDataProps {
  name: string | undefined;
  desp: string | undefined;
}

interface EditProfileProps {
  isUser: boolean;
}

const EditProfile: React.FC<EditProfileProps> = ({ isUser }) => {
  const { userData, contract } = useSignerContext();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureName, setProfilePictureName] = useState<string | null>(
    null
  );
  const router = useRouter()
  const [formData, setFormData] = useState<FormDataProps>({
    name: isUser ? userData?.name : "Enter Your Name",
    desp: isUser
      ? userData?.desp
      : "I am a user at Xstream, I like watching livestreams and videos",
  });
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFTSTORAGE_KEY as string,
  });

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

  const handleNameClick = () => {
    if (formData.name === "Enter Your Name") {
      setFormData({ ...formData, name: "" });
    }
  };

  const handleNameChange = (event: any) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const handleDespClick = () => {
    if (formData.desp === "Enter Your Description") {
      setFormData({ ...formData, desp: "" });
    }
  };

  const handleDespChange = (event: any) => {
    setFormData({ ...formData, desp: event.target.value });
  };

  const handleAllCheck = () => {
    let status = true;
    if (
      formData.name != "" &&
      formData.name != "Enter Your Name" &&
      formData.desp != ""
    ) {
      status = false;
    }
    return status;
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

  const createUser = async () => {
    const profilePictureCid = await profilePictureUpload();
    const createUser = await contract.createUser(
      formData.name,
      formData.desp,
      profilePictureCid
    );
    await createUser.wait();
    

    router.push(router.asPath).then(() => window.location.reload());
  };

  return (
    <div className="flex flex-row w-[90%] h-[90%] mt-8">
      <div className="flex flex-col justify-start items-center">
        <div className="relative h-[8rem] w-[8rem] p-2 rounded-[50%] bg-primaryGrey flex flex-col justify-center items-center gap-2">
          {isUser ? (
            <>
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
                  <Image
                    src={ProfilePicture}
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
              )}
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

      <div className="relative flex flex-col justify-start items-start w-[45%] h-full  ml-12 gap-2">
        <div className="flex flex-col justify-start items-start w-full gap-1">
          <span
            className="text-white font-rubik font-normal tracking-widest"
            onClick={() => {
              console.log(selectedImage.name);
            }}
          >
            Name
          </span>
          <div className="h-[4.5rem] w-full rounded-lg bg-secondaryGrey pl-4">
            <input
              type="text"
              id="name"
              value={formData.name}
              className="appearance-none bg-transparent border-none outline-none text-primaryRed drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[3rem] font-dieNasty"
              onChange={handleNameChange}
              onClick={handleNameClick}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-1">
          <span className="text-white font-rubik font-normal tracking-widest">
            Description
          </span>
          <div className="h-[8rem] w-full rounded-lg bg-secondaryGrey pl-4">
            <textarea
              id="desp"
              value={formData.desp}
              className="appearance-none bg-transparent border-none outline-none text-white text-[1rem] py-2 w-full h-full font-rubik resize-none"
              onChange={handleDespChange}
              onClick={handleDespClick}
            />
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <PrimaryButton
            h="h-[3.5rem]"
            w="w-[12rem]"
            textSize="text-[1.2rem]"
            label={isUser ? "SAVE CHANGES" : "CREATE USER"}
            action={() => {
              createUser();
            }}
            disabled={false}
          ></PrimaryButton>
        </div>
      </div>
      <div className="w-[40%] h-full bg-blue-500 ml-10"></div>
    </div>
  );
};

export default EditProfile;
