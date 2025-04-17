import React from "react";
// import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
// import Button from "components/button/buttons";
import { ReactComponent as Close } from "assets/icons/close.svg";
import Fireworks from "assets/decorations/fireworks.png";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const PublishDeckModal = ({ open, setClose }: Props) => {
  // const navigate = useNavigate();

  // const handleSubmit = () => {
  //   navigate("/");
  // };

  return (
    <Modal open={open} width={"864px"}>
      <div className="max-w-[864px] mx-auto">
        <div className="bg-primary relative rounded-[1rem] px-[2.5rem] py-[5rem] w-full h-full min-h-[60vh]">
          <button
            type="button"
            onClick={() => setClose()}
            className="absolute right-3 top-4 outline-none"
          >
            <Close className="h-[2rem] w-[2rem] " />
          </button>

          <div className="max-w-[740px] mx-auto border-b border-[#EFE9FD80] pb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src={Fireworks} alt="Fireworks" />
              <img src={Fireworks} alt="Fireworks" />
            </div>
            <p className="text-[40px] text-white text-center max-w-[570px] mx-auto">
              You have published your first quiz and{" "}
              <span className="text-secondary">earned a badge</span>
            </p>
          </div>

          <div className="mt-16">
            <p className="text-white mb-5 font-bold">
              Share Link to invite people
            </p>
            <div className="flex justify-between items-center h-[64px] bg-[#D9D9D91A] border border-[#FFFFFF4D] rounded-[20px] px-4">
              <p className="text-white">
                nsoiucdonsuvoldshvuuuouiuikvuvdidvuvudvdviidvi
              </p>
              <button className="border border-[#FFFFFF4D] rounded-[12px] px-5 py-2">
                <span className="text-white">copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
