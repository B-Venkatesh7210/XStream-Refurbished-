import React from "react";
import Image from "next/image";
import Modal from "react-modal";
import XstreamLogo from "../../assets/logos/XstreamTextLogo.png";

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  return (
    <Modal
      className="loading flex flex-col"
      style={{
        overlay: {
          backgroundColor: "rgba(115, 4, 4, 0.08)",
          backdropFilter: "blur(20px)",
        },
      }}
      isOpen={isOpen}
      ariaHideApp={false}
    >
      <Image
        alt="Xstream Logo"
        src={XstreamLogo}
        height={100}
        className="absolute top-[40%] right-[32%]"
      ></Image>
      <div className="flex flex-row items-center absolute top-[55%] right-[32%]">
        <span className="font-dieNasty text-white text-[3.5rem] mr-4">
          Stream
        </span>
        <span className="font-dieNasty text-red-500 text-[3.5rem] ml-4">
          Exclusively
        </span>
      </div>
    </Modal>
  );
};

export default LoadingModal;
