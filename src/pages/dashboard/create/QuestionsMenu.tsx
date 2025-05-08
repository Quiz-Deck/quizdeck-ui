import React from "react";
import { ReactComponent as Plus } from "assets/icons/plus.svg";

// Explicitly import the types for JSX
type CreateQuizProps = {
  deckQuestions: any;
  setDeckQuestions: (e: any) => void;
};

const QuestionsMenu: React.FC<CreateQuizProps> = ({
  deckQuestions,
  setDeckQuestions,
}) => {
  const handleClick = () => {
    const oldQuestion = [...deckQuestions];
    const newQuestion = {
      question: "",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["option 1", "option 2"],
      answer: "",
      image: "",
      video: "",
      audio: "",
    };
    setDeckQuestions([...oldQuestion, newQuestion]);
  };
  return (
    <div className="bg-primary p-2 w-fit rounded-[50px]">
      <button
        onClick={() => handleClick()}
        className="text-white flex gap-3 items-center px-2 outline-none rounded-[50px]"
      >
        <Plus className="w-[16px] h-[16px] fill-[#ffffff]" /> Add New Question
      </button>
    </div>
  );
};

export default QuestionsMenu;
