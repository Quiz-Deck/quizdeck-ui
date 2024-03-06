import React from "react";
import Button from "../../components/button/buttons";
import { DeckQuestion } from "../../features/api/deck/deckSliceTypes";

// Explicitly import the types for JSX
type Props = {
  data: any;
  answers: any;
  setAnswers: any;
  activeQuestion: number;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
};

const MultipleChoice: React.FC<Props> = ({
  data,
  activeQuestion,
  setActiveQuestion,
  answers,
  setAnswers,
}: Props) => {
  const handleSelectAnswer = (
    questionIndex: number,
    selectedOption: string
  ) => {
    setAnswers({
      ...answers,
      [questionIndex]: selectedOption,
    });
  };

  return (
    <div className="p-5 border w-full">
      <div className="mb-4 border-b py-2">
        <p className="text-center text-lg font-bold">
          Question {activeQuestion + 1}
        </p>
      </div>
      {data?.length > 0 && (
        <div>
          <p className="mb-6">{data[activeQuestion]?.question}</p>

          <ul>
            {data[activeQuestion]?.multichoiceOptions.map(
              (option: string, index: number) => (
                <li
                  key={index}
                  onClick={() => handleSelectAnswer(activeQuestion, option)}
                  className={`${
                    answers[activeQuestion] === option
                      ? "bg-primary text-white"
                      : "bg-[#FFFFFF]"
                  } pl-3 pr-10 w-full text-base focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none sm:text-sm h-[40px] px-4 py-2 mb-4 border border-gray-300 rounded-md mb-5 w-full`}
                >
                  {option}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      <div className="flex justify-end items-center gap-5">
        <Button.Secondary
          title={"Previous"}
          className="px-8 mt-4"
          disabled={activeQuestion === 0}
          onClick={() => {
            setActiveQuestion(activeQuestion - 1);
          }}
        />
        <Button.Primary
          title={"Next"}
          className="px-8 mt-4"
          disabled={activeQuestion === data?.length - 1}
          onClick={() => {
            setActiveQuestion(activeQuestion + 1);
          }}
        />
      </div>
    </div>
  );
};

export default MultipleChoice;
