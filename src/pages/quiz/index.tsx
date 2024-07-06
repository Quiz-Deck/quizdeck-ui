import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { _getUser } from "utils/Auth";
import PageLoader from "utils/PageLoader";
import QuestionsSideNav from "./QuestionsSideNav";
import QuizQuestionType from "./questionTypes";
import Button from "components/button/buttons";
import Logo from "../../assets/icons/logo-black.png";
import { StartTestModal } from "components/modals/StartTestModal";
import { TestResultsModal } from "components/modals/TestResultsModal";
import { CloseTestModal } from "components/modals/CloseTestModal";
import { useGetSingleDeckQuery } from "../../features/api/deck/deckApi";
import { SingleDeck } from "features/api/deck/deckSliceTypes";
import { loadDeckFromLocalForage } from "storage/indexedDBStorage";

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
  const [oneDeck, setDeck] = useState<SingleDeck>();
  const { id } = useParams();
  const user = _getUser();
  const { data, isLoading } = useGetSingleDeckQuery({
    id: id || "",
    userId: user?.data?._id,
  });

  // const countdown = false;
  const [isActive, setIsActive] = useState(false);
  const initialTimerValue = oneDeck?.timer ?? 0; // Default to 0 if undefined
  const [timer, setTimer] = useState<number>(initialTimerValue); // Initialize timer with the value from data
  const [countdown, setCountdown] = useState<boolean>(initialTimerValue > 0); // Determine initial mode




  // There might be a better way to handle this but giving up for now, if we can get it sent from the API, will be a better outcome 
  useEffect(() => {
    const fetchData = async () => {
      let deck = await loadDeckFromLocalForage(id as string) as SingleDeck;
      setDeck(deck);
    };
    fetchData();
  }, [data]);

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
              handleSubmit(answers); // Open the modal when the timer reaches zero
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
  }, [isActive, countdown, answers]);

  useEffect(() => {
    if (initialTimerValue > 0) {
      setTimer(initialTimerValue);
      setCountdown(true);
    }
    // eslint-disable-next-line
  }, [oneDeck?.timer]);

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

  const handleSubmit = (answers: any) => {
    let correctCount = 0;
    let questionsCount = oneDeck?.questions.length || 0;

    oneDeck?.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        correctCount++;
      }
    });

    setScore(correctCount);
    let percentage = Math.round((correctCount / questionsCount) * 100);
    setScorePercentage(percentage);
    handleStartTimer();
    openResultsModal();
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
            {activeQuestion + 1} / {oneDeck?.questions?.length}
          </p>
          <p className="text-sm">{oneDeck?.title}</p>
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
              {oneDeck?.questions && (
                <QuestionsSideNav
                  data={oneDeck?.questions}
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
                data={oneDeck ? oneDeck?.questions : []}
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
        data={oneDeck}
      />
      <TestResultsModal
        open={openResults}
        setClose={closeResultsModal}
        score={score}
        data={oneDeck}
        timer={timer}
        answers={answers}
        scorePercentage={scorePercentage}
      />
    </div>
  );
};

export default QuizTaker;
