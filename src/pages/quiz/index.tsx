import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/button/buttons";
import QuestionsSideNav from "./QuestionsSideNav";
import QuizQuestionType from "./questionTypes";
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
  const [open, setOpen] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [timer, setTimer] = useState<number>(0);

  const { id } = useParams();
  const { data, isLoading } = useGetSingleDeckQuery(id || "");

  const countdown = false;
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

  const handleSubmit = () => {
    let correctCount = 0;
    data?.data?.[0]?.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        correctCount++;
      }
    });
    setScore(correctCount);
    openResultsModal();
    handleStartTimer();
  };

  return (
    <div>
      <div className="mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between w-full shadow-sm">
        <div className="flex max-w-[300px] w-full px-2 lg:px-0 h-14">
          <div className="flex-shrink-0 flex w-full items-center py-3">
            <div className="h-8 w-auto text-primary text-3xl font-bold">
              QuizDeck
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold">
            {activeQuestion + 1} / {data?.data?.[0]?.questions?.length}
          </p>
          <p className="text-sm">{data?.data?.[0]?.title}</p>
        </div>
        <Button.Secondary title={"Close"} onClick={() => openModal()} />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-16">
        <div className="flex gap-8">
          <div className="max-w-[350px] w-full">
            {data?.data?.[0]?.questions && (
              <QuestionsSideNav
                data={data?.data?.[0]?.questions}
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
              data={data?.data ? data?.data?.[0]?.questions : []}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              answers={answers}
              setAnswers={setAnswers}
              handleSubmit={handleSubmit}
              handleStartTimer={handleStartTimer}
            />
          </div>
        </div>
      </div>

      <CloseTestModal open={open} setClose={closeModal} />
      <TestResultsModal
        open={openResults}
        setClose={closeResultsModal}
        score={score}
        data={data}
        timer={timer}
        answers={answers}
      />
    </div>
  );
};

export default QuizTaker;
