import React from "react";
import { Modal } from "./index";
import DeckDetails from "../../pages/dashboard/create/DeckDetails";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const CreateDeckModal = ({ open, setClose }: Props) => {
  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="bg-white border border-[#D6E4FD] rounded-[1rem] px-[2.5rem] py-[3.125rem]"
        >
          <button type="button" onClick={() => setClose()}>
            Close
          </button>
          <div className="flex items-end justify-between gap-4 purple-gradient py-10 px-8 rounded-[30px] mb-6">
            <div className="pb-4 text-white lg:w-[60%]">
              <h2 className="text-[2rem] mb-3">Create a quiz</h2>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur. Sed libero tellus ornare
                est nLorem ipsum dolor sit amet consectetu.
              </p>
            </div>
          </div>

          <DeckDetails />
        </div>
      </div>
    </Modal>
  );
};
