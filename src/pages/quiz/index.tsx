import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/button/buttons";
import PageLoader from "utils/PageLoader";
import QuestionsSideNav from "./QuestionsSideNav";
import QuizQuestionType from "./questionTypes";
import Logo from "../../assets/icons/logo-black.png";
import { StartTestModal } from "components/modals/StartTestModal";
import { TestResultsModal } from "components/modals/TestResultsModal";
import { CloseTestModal } from "components/modals/CloseTestModal";
import { useGetSingleDeckQuery } from "../../features/api/deck/deckApi";

interface AnswerFormat {
  [key: number]: string;
}

const QuizTaker: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerFormat>({});
  const [score, setScore] = useState<number | null>(null);
  const [scorePercentage, setScorePercentage] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [openWarning, setOpenWarning] = useState(true);
  // const [timer, setTimer] = useState<number>(0);

  const { id } = useParams();
  const { data, isLoading } = useGetSingleDeckQuery(id || "");

  // const countdown = false;
  const [isActive, setIsActive] = useState(false);
  const initialTimerValue = data?.data?.timer ?? 0; // Default to 0 if undefined
  const [timer, setTimer] = useState<number>(initialTimerValue); // Initialize timer with the value from data
  const [countdown, setCountdown] = useState<boolean>(initialTimerValue > 0); // Determine initial mode

  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;

  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setTimer((prevTimer) => (countdown ? prevTimer - 1 : prevTimer + 1));
  //     }, 1000);
  //   } else {
  //     clearInterval(interval!);
  //   }

  //   return () => {
  //     if (interval) clearInterval(interval);
  //   };
  // }, [isActive, countdown]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (countdown) {
            if (prevTimer <= 1) {
              clearInterval(interval!);
              setIsActive(false);
              handleSubmit(); // Open the modal when the timer reaches zero
              return 0;
            } else {
              return prevTimer - 1;
            }
          } else {
            return prevTimer + 1;
          }
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [isActive, countdown]);

  useEffect(() => {
    if (initialTimerValue > 0) {
      setTimer(initialTimerValue);
      setCountdown(true);
    }
    // eslint-disable-next-line
  }, [data?.data?.timer]);

  useEffect(() => {
    if (!openWarning) {
      setIsActive(true);
    }
    // eslint-disable-next-line
  }, [openWarning]);

  const handleStartTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openResultsModal = () => {
    setOpenResults(true);
  };

  const closeResultsModal = () => {
    setOpenResults(false);
  };

  const closeWarningModal = () => {
    setOpenWarning(false);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let questionsCount = data?.data?.questions.length || 0;
    data?.data?.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        correctCount++;
      }
    });

    setScore(correctCount);
    let percentage = Math.round((correctCount / questionsCount) * 100);
    setScorePercentage(percentage);

    openResultsModal();
    handleStartTimer();
  };

  return (
    <div>
      <div className="mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between w-full shadow-sm">
        <div className="flex max-w-[300px] w-full px-2 lg:px-0 h-14">
          <div className="flex-shrink-0 flex w-full items-center py-3">
            <div className="w-auto text-primary text-3xl font-bold">
              <img src={Logo} alt="Logo" className="max-w-[130px]" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold">
            {activeQuestion + 1} / {data?.data?.questions?.length}
          </p>
          <p className="text-sm">{data?.data?.title}</p>
        </div>
        <Button.Secondary title={"Close"} onClick={() => openModal()} />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-16">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <PageLoader />
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="max-w-[350px] w-full">
              {data?.data?.questions && (
                <QuestionsSideNav
                  data={data?.data?.questions}
                  answers={answers}
                  setActiveQuestion={setActiveQuestion}
                  handleSubmit={handleSubmit}
                  timer={timer}
                  setTimer={setTimer}
                  handleStartTimer={handleStartTimer}
                />
              )}
            </div>
            <div className="w-full">
              <QuizQuestionType
                data={data?.data ? data?.data?.questions : []}
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                answers={answers}
                setAnswers={setAnswers}
                handleSubmit={handleSubmit}
                handleStartTimer={handleStartTimer}
              />
            </div>
          </div>
        )}
      </div>

      <CloseTestModal open={open} setClose={closeModal} />
      <StartTestModal
        open={openWarning}
        setClose={closeWarningModal}
        data={data}
      />
      <TestResultsModal
        open={openResults}
        setClose={closeResultsModal}
        score={score}
        data={data}
        timer={timer}
        answers={answers}
        scorePercentage={scorePercentage}
      />
    </div>
  );
};

export default QuizTaker;
