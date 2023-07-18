import React, {useState} from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";

interface FormDataProps {
    name: string;
    desp: string;
    image: string;
  }

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [formData, setFormData] = useState<FormDataProps>({
    name: "Enter Your Name",
    desp: "I am a user at Xstream, I like watching livestreams and videos",
    image: "",
  });

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
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
    let status = false;
    if (
      formData.name != "" &&
      formData.name != "Enter Your Name" &&
      formData.desp != ""
    ) {
      status = true;
    }
    return !status;
  };

  return (
    <div className="flex flex-row w-[90%] h-[90%] mt-8">
      <div className="flex flex-col justify-start items-center">
        <div className="relative h-[8rem] w-[8rem] p-2 rounded-[50%] bg-primaryGrey flex flex-col justify-center items-center gap-2">
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
        </div>
        <div className="flex flex-col justify-start items-center mt-4">
          <span className="text-primaryRed font-rubik text-lg font-bold">
            Followers
          </span>
          <span className="text-white font-rubik text-lg font-bold">34</span>
        </div>
        <div className="flex flex-col justify-start items-center mt-4">
          <span className="text-primaryRed font-rubik text-lg font-bold">
            Subscribers
          </span>
          <span className="text-white font-rubik text-lg font-bold">34</span>
        </div>
      </div>

      <div className="relative flex flex-col justify-start items-start w-[45%] h-full  ml-12 gap-2">
        <div className="flex flex-col justify-start items-start w-full gap-1">
          <span className="text-white font-rubik font-normal tracking-widest">
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
              className="appearance-none bg-transparent border-none outline-none text-white text-[1rem] py-2 w-full h-full font-rubik"
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
            label="CREATE USER"
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

export default EditProfile;
