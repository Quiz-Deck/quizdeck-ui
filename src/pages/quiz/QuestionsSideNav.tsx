import React, { useEffect, useState } from "react";
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
  const countdown = false;
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (countdown ? prevTimer - 1 : prevTimer + 1));
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, countdown]);

  const handleStartTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div
      className="bg-[#FAFAFF] w-full rounded-md min-h-[70vh]"
      style={{
        boxShadow: "0px 2px 3px 0px #D6E4FD",
      }}
    >
      <div className="mb-4 border-b-2 border-[#DDE6F7] py-2">
        <p className="text-center text-lg font-bold">{formatTime(timer)}</p>
      </div>

      <div className="px-4">
        <div className="text-center mb-8">
          <h3 className="font-bold text-lg mb-1">Select Questions</h3>
          <p className="text-sm">Choose question or skip question</p>
        </div>

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

        <div className="flex justify-center mt-24">
          <Button.Primary
            onClick={() => {
              handleSubmit();
              handleStartTimer();
            }}
            title={"Submit"}
            className="mt-8 px-5 "
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionsSideNav;
