import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
import Button from "components/button/buttons";
import Logo from "../../assets/icons/logo-black.png";
import { LikeDeck } from "utils/LikeDeck";
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
  scorePercentage: number | null;
}

export const TestResultsModal = ({
  open,
  setClose,
  score,
  data,
  timer,
  answers,
  scorePercentage,
}: Props) => {
  const navigate = useNavigate();
  console.log("answers", answers);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const showGrade = () => {
    if (scorePercentage === 0) {
      return <div className="text-2xl">Hmmm, what happened?</div>;
    } else if (scorePercentage && scorePercentage <= 30) {
      return <div className="text-2xl">You can do better!</div>;
    } else if (
      scorePercentage &&
      scorePercentage > 30 &&
      scorePercentage < 60
    ) {
      return <div className="text-2xl">Nice Attempt!</div>;
    } else if (
      scorePercentage &&
      scorePercentage > 60 &&
      scorePercentage < 80
    ) {
      return <div className="text-2xl">Great Attempt!</div>;
    } else if (
      scorePercentage &&
      scorePercentage > 80 &&
      scorePercentage < 90
    ) {
      return <div className="text-2xl">Genius level attempt!</div>;
    } else if (scorePercentage && scorePercentage === 100) {
      return (
        <div className="text-2xl">Excellent! Be proud of your performance!</div>
      );
    }
  };

  return (
    <Modal open={open} width={"100%"}>
      <div className="w-full h-screen">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className=" h-full overflow-y-scroll bg-white border border-[#D6E4FD] px-[2.5rem] pb-[3.125rem]"
        >
          {/* Logo: */}
          <div className="mb-10 mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between w-full shadow-sm">
            <div className="flex max-w-[300px] w-full px-2 lg:px-0 h-14">
              <div className="flex-shrink-0 flex w-full items-center py-3">
                <div className="w-auto text-primary text-3xl font-bold">
                  <img src={Logo} alt="Logo" className="max-w-[130px]" />
                </div>
              </div>
            </div>

            <Button.Secondary
              title={"Close"}
              onClick={() => {
                setClose();
                navigate(-1);
              }}
            />
          </div>

          <div className="max-w-[700px] mx-auto">
            {/* Summary Layout: */}
            <h3 className="text-xl font-bold">{showGrade()}</h3>
            <div className="mt-4 flex items-center gap-5 px-4 mb-10">
              <div className="text-4xl font-bold">{scorePercentage}%</div>
              <div>
                <p>
                  You scored {score} out of {data?.data?.questions?.length}.
                </p>
                <p>Your time: {formatTime(timer)}</p>
              </div>
            </div>

            {/* Next Steps: */}
            <h3 className="text-lg font-bold mb-2">Next steps:</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
              <div className="shadow-lg px-3 py-4 flex gap-3 items-center">
                <LikeDeck id={data?.data?._id} data={data?.data} />
                <div>
                  <p className="text-primary font-semibold mb-1">
                    Like this quiz
                  </p>
                  <p className="text-xs">
                    Appreciate this deck creators with a like!
                  </p>
                </div>
              </div>
              <div className="shadow-lg px-3 py-4">
                <p className="text-primary font-semibold mb-1">
                  Retake this quiz
                </p>
                <p className="text-xs">
                  Solidify your knowledge by retaking this quiz
                </p>
              </div>
              <div className="shadow-lg px-3 py-4">
                <p className="text-primary font-semibold mb-1">
                  Take a new quiz
                </p>
                <p className="text-xs">
                  Take another quiz to boost your confidence!
                </p>
              </div>
            </div>

            {/* Your answers */}
            <h3 className="text-lg font-bold mb-2">Your answers:</h3>
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
      </div>
    </Modal>
  );
};
