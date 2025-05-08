import React from "react";
import { Modal } from "./index";
import DeckDetails from "../../pages/dashboard/create/DeckDetails";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Spirals from "../../assets/decorations/spirals.svg";
import Question from "../../assets/decorations/question-mark.png";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const CreateDeckModal = ({ open, setClose }: Props) => {
  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-[864px] mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="relative bg-white border border-[#D6E4FD] rounded-[1rem] px-[1rem] md:px-[2.5rem] py-[3.125rem]"
        >
          <button
            type="button"
            onClick={() => setClose()}
            className="absolute right-3 top-4 outline-none"
          >
            <Close className="h-[2rem] w-[2rem] " />
          </button>
          <div className="purple-gradient pt-12 pb-10 px-10 rounded-[30px] mb-6 relative">
            <div className="flex items-end justify-between gap-2">
              <div className="pb-4 text-white lg:w-[75%] ml-2">
                <h2 className="text-[2rem] mb-3">Create a quiz</h2>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet consectetur. Sed libero tellus
                  ornare est nLorem ipsum dolor sit amet consectetu.
                </p>
              </div>
              <img
                src={Question}
                alt="design"
                className="h-130px] w-[130px] "
              />
            </div>
            <img
              src={Spirals}
              alt="design"
              className="absolute left-4 bottom-4"
            />
          </div>

          <DeckDetails />
        </div>
      </div>
    </Modal>
  );
};
