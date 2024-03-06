import React, { useState } from "react";
import { useParams } from "react-router-dom";
import QuestionsSideNav from "./QuestionsSideNav";
import MultipleChoice from "./MultipleChoice";
import { useGetSingleDeckQuery } from "../../features/api/deck/deckSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {};

interface AnswerFormat {
  [key: number]: string;
}

const QuizTaker: React.FC<CreateQuizProps> = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerFormat>({});
  const [score, setScore] = useState<number | null>(null);

  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleDeckQuery(id || "");

  const handleSubmit = () => {
    let correctCount = 0;
    data?.data?.[0]?.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        correctCount++;
      }
    });
    setScore(correctCount);
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
        <div>close</div>
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
              />
            )}
          </div>
          <div className="w-full">
            <MultipleChoice
              data={data?.data ? data?.data?.[0]?.questions : []}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              answers={answers}
              setAnswers={setAnswers}
            />
          </div>
        </div>
        {score !== null && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Results:</h2>
            <p>
              You scored {score} out of {data?.data?.[0]?.questions?.length}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTaker;
