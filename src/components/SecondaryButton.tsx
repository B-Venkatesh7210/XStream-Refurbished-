import React from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface ButtonProps {
  h: string;
  w?: string;
  label?: string;
  textSize: string;
  disabled: boolean;
  action1: any;
  action2: any;
  iconType?: string;
  iconFirst?: boolean;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  h,
  w,
  label,
  textSize,
  disabled,
  action1,
  action2,
  iconType,
  iconFirst,
}) => {
  const typeHandler = (type: string, disabled: boolean) => {
    switch (type) {
      case "follow":
        return (
          <div>
            {disabled ? (
              <HowToRegIcon style={{ fontSize: 25, color: "" }}></HowToRegIcon>
            ) : (
              <PersonAddAlt1Icon
                style={{ fontSize: 25, color: "white" }}
              ></PersonAddAlt1Icon>
            )}
          </div>
        );
      case "subscribe":
        return (
          <div>
            {disabled ? (
              <BookmarkAddedIcon
                style={{ fontSize: 25, color: "" }}
              ></BookmarkAddedIcon>
            ) : (
              <BookmarkIcon
                style={{ fontSize: 25, color: "white" }}
              ></BookmarkIcon>
            )}
          </div>
        );
    }
  };

  const labelHandler = (type: string, disabled: boolean) => {
    switch (type) {
      case "follow":
        return (
          <div>{disabled ? <span>Following</span> : <span>Follow</span>}</div>
        );
      case "subscribe":
        return (
          <div>
            {disabled ? <span>Subscribed</span> : <span>Subscribe</span>}
          </div>
        );
    }
  };

  return (
    <div
      className={`${h} ${w ? w : "w-auto"} px-2 flex ${
        iconFirst ? "flex-row-reverse" : "flex-row"
      } justify-center items-center gap-2 ${textSize} ${
        disabled ? "text-white/70" : "text-white"
      } font-rubik font-extrabold transition delay-75 rounded-[2px] ${
        disabled
          ? "border-[1.5px] border-solid border-secondaryGrey bg-primaryGrey cursor-pointer hover:bg-secondaryGrey/80"
          : "border-[1.5px] border-solid border-secondaryRed bg-primaryRed cursor-pointer hover:bg-secondaryRed"
      }`}
      onClick={!disabled ? action1 : action2}
    >
      {label}
      {iconType && labelHandler(iconType, disabled)}
      {iconType && typeHandler(iconType, disabled)}
    </div>
  );
};

export default SecondaryButton;
