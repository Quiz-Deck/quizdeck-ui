import React from "react";
import Button from "../../components/button/buttons";

type Props = {
  data: any;
  answers: any;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: () => void;
};

const QuestionsSideNav: React.FC<Props> = ({
  data,
  answers,
  setActiveQuestion,
  handleSubmit,
}) => {
  return (
    <div className="bg-[#D9D9D9] w-full rounded-md min-h-[70vh]">
      <div className="mb-4 border-b py-2">
        <p className="text-center text-lg font-bold">14:09</p>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-5 gap-3 mt-5">
          {data.length > 0 &&
            data.map((_: any, index: number) => (
              <div
                key={index}
                onClick={() => setActiveQuestion(index)}
                className={`${
                  answers.hasOwnProperty(index)
                    ? "bg-primary text-white"
                    : "bg-[#FFFFFF]"
                } w-[30px] h-[30px] flex items-center justify-center rounded-md border border-primary`}
              >
                {index + 1}
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <Button.Primary
            onClick={() => handleSubmit()}
            title={"Submit"}
            className="mt-8 px-5 "
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionsSideNav;
