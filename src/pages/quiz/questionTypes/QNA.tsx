import React from "react";
import Button from "../../../components/button/buttons";
import Input from "../../../components/input/Input";

// Explicitly import the types for JSX
type Props = {
  data: any;
  answers: any;
  setAnswers: any;
  activeQuestion: number;
  handleSubmit: () => void;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
};

const QNA: React.FC<Props> = ({
  data,
  activeQuestion,
  setActiveQuestion,
  answers,
  setAnswers,
  handleSubmit,
}: Props) => {
  const handleChange = (e: any) => {
    const { value } = e.target;
    setAnswers({
      ...answers,
      [activeQuestion]: value,
    });
  };

  return (
    <div className="p-5 border border-[#D6E4FD] w-full">
      <div className="mb-4 border-b border-[#D6E4FD] py-2">
        <p className="text-center text-lg font-bold">
          Question {activeQuestion + 1}
        </p>
      </div>

      <div>
        <p className="mb-6">{data[activeQuestion]?.question}</p>
        {answers[activeQuestion] ?? " "}
        <Input.Label
          title={"Answer"}
          name="answer"
          value={answers[activeQuestion] ?? " "}
          placeholder={"Enter the answer"}
          className="rounded-md mb-5 bg-[#FAFAFF]"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
      </div>

      <div className="flex justify-end items-center gap-5">
        <Button.Secondary
          title={"Previous"}
          className="px-8 mt-4"
          disabled={activeQuestion === 0}
          onClick={() => {
            setActiveQuestion(activeQuestion - 1);
          }}
        />
        {activeQuestion === data?.length - 1 ? (
          <Button.Primary
            title={"Submit"}
            className="px-8 mt-4"
            onClick={() => {
              handleSubmit();
            }}
          />
        ) : (
          <Button.Primary
            title={"Next"}
            className="px-8 mt-4"
            disabled={activeQuestion === data?.length - 1}
            onClick={() => {
              setActiveQuestion(activeQuestion + 1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QNA;
