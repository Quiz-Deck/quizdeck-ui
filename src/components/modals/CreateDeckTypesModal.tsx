import React from "react";
import { Modal } from "./index";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Spirals from "../../assets/decorations/spirals.svg";
import Question from "../../assets/decorations/question-mark.png";
import createQuiz from "../../assets/icons/create-quiz1.svg";
import generatePrompt from "../../assets/icons/generate-prompt1.svg";
import generateDocument from "../../assets/icons/generate-document1.svg";

interface Props {
  open: boolean;
  setClose: () => void;
  setOpen: (e: string) => void;
}

const deckTypes = [
  {
    title: "Create quiz from scratch",
    image: createQuiz,
    route: "create-standard",
  },
  { title: "Create quiz from document", image: generateDocument, route: "" },
  {
    title: "Create quiz from topic/prompt",
    image: generatePrompt,
    route: "",
  },
];

export const CreateDeckTypesModal = ({ open, setClose, setOpen }: Props) => {
  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-[1264px] mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="relative bg-white border border-[#D6E4FD] rounded-[1rem] px-[1rem] md:px-[2.5rem] py-[5rem]"
        >
          <button
            type="button"
            onClick={() => setClose()}
            className="absolute right-3 top-4 outline-none"
          >
            <Close className="h-[2rem] w-[2rem] " />
          </button>
          <img
            src={Question}
            alt="design"
            className="h-130px] w-[130px] absolute top-16 right-8"
          />

          <div className="max-w-[610px] mx-auto">
            <h2 className="text-primary font-bold text-[40px] text-center">
              Create a quiz right away
            </h2>
            <ul className="mt-8 flex flex-col items-center gap-4">
              {deckTypes?.length > 0 &&
                deckTypes.map((type, index) => (
                  <li
                    key={index}
                    onClick={() => setOpen(type?.route)}
                    className="flex items-center gap-3 bg-primary w-full h-[130px] px-5 rounded-[10px]"
                  >
                    <figure className="w-[130px]">
                      <img
                        src={type?.image}
                        alt="icon"
                        className="h-[100px] w-auto"
                      />
                    </figure>

                    <p className="text-[1.5rem] text-white font-bold">
                      {type?.title}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};
