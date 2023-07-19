import React from "react";
import Camera from "@mui/icons-material/CameraAlt";
import CameraOff from "@mui/icons-material/NoPhotography";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

interface ToggleButtonProps {
  h: string;
  w: string;
  disabled: boolean;
  action: any;
  type: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  h,
  w,
  disabled,
  action,
  type,
}) => {
  const typeHandler = (type: string, disabled: boolean) => {
    switch (type) {
      case "camera":
        return (
          <div>
            {disabled ? (
              <CameraOff style={{ fontSize: 25, color: "white" }}></CameraOff>
            ) : (
              <Camera style={{ fontSize: 25, color: "white" }}></Camera>
            )}
          </div>
        );
      case "mic":
        return (
          <div>
            {disabled ? (
              <MicOff style={{ fontSize: 25, color: "white" }}></MicOff>
            ) : (
              <Mic style={{ fontSize: 25, color: "white" }}></Mic>
            )}
          </div>
        );
      case "recording":
        return (
          <div>
            {disabled ? (
              <FiberManualRecordIcon
                style={{ fontSize: 25, color: "white" }}
              ></FiberManualRecordIcon>
            ) : (
              <RadioButtonCheckedIcon
                style={{ fontSize: 25, color: "white" }}
              ></RadioButtonCheckedIcon>
            )}
          </div>
        );
      case "exit":
        return (
          <div>
            {disabled ? (
              <ExitToAppIcon
                style={{ fontSize: 25, color: "white" }}
              ></ExitToAppIcon>
            ) : (
              <ExitToAppIcon
                style={{ fontSize: 25, color: "white" }}
              ></ExitToAppIcon>
            )}
          </div>
        );
      case "stream":
        return (
          <div>
            {disabled ? (
              <StopScreenShareIcon
                style={{ fontSize: 30, color: "white" }}
              ></StopScreenShareIcon>
            ) : (
              <ScreenShareIcon
                style={{ fontSize: 30, color: "white" }}
              ></ScreenShareIcon>
            )}
          </div>
        );
    }
  };

  return (
    <div
      className={`${h} ${w} rounded-full flex flex-row justify-center items-center transition delay-75 hover:cursor-pointer border-[1px] border-solid border-white ${
        disabled
          ? "bg-primaryRed hover:bg-primaryRed/50"
          : `bg-transparent hover:bg-[#99999c]`
      } `}
      onClick={action}
    >
      {typeHandler(type, disabled)}
    </div>
  );
};

export default ToggleButton;
