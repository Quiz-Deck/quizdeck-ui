import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
import Button from "components/button/buttons";
import { DeckQuestion } from "features/api/deck/deckSliceTypes";

interface AnswerFormat {
  [key: number]: string;
}

interface Props {
  open: boolean;
  setClose: () => void;
  score: number | null;
  data: any;
  timer: number;
  answers: AnswerFormat;
}

export const TestResultsModal = ({
  open,
  setClose,
  score,
  data,
  timer,
  answers,
}: Props) => {
  const navigate = useNavigate();

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  console.log("answers", answers);
  console.log("data", data);

  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="bg-white border border-[#D6E4FD] rounded-[1rem] px-[2.5rem] py-[3.125rem]"
        >
          <div className="mt-4 flex items-center gap-5 px-4 mb-6">
            <div className="text-4xl font-bold">{score}</div>
            <div>
              <h3 className="text-xl font-bold">Good Result!</h3>
              <p>
                You scored {score} out of {data?.data?.[0]?.questions?.length}.
              </p>
              <p>{formatTime(timer)}</p>
            </div>
          </div>

          {data?.data &&
            data?.data?.questions?.length > 0 &&
            data?.data?.questions.map(
              (question: DeckQuestion, index: number) => (
                <div key={question?._id} className="w-full mb-6">
                  <div className="flex gap-3 items-center mb-1">
                    <p>{index + 1}.</p>
                    <p>{question?.question}</p>
                  </div>
                  <div
                    className={`
                      ${
                        question?.answer === answers[index]
                          ? "bg-[#abefab]"
                          : "bg-[#efabab]"
                      } py-2 px-3`}
                  >
                    <p>{question?.answer}</p>
                  </div>
                  {question?.answer !== answers[index] && (
                    <p>{answers[index]}</p>
                  )}
                </div>
              )
            )}

          <div className="flex mt-4 items-center justify-center gap-5">
            <Button.Primary
              title={"Close"}
              className="mt-4 px-4"
              onClick={() => {
                setClose();
                navigate(-1);
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
