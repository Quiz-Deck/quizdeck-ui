import React, { useState } from "react";
import QuestionsSideNav from "./QuestionsSideNav";
import MultipleChoice from "./MultipleChoice";
import NavbarDashboard from "../../components/navigation/NavbarDashboard";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const QuizTaker: React.FC<CreateQuizProps> = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const data = [
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Rihanna", "Beyonce", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are we?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Tinubu", "Beyonce", "Rihanna", "Mama G"],
      answer: "Rihanna",
    },
    {
      question: "Who are they?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
    {
      question: "Who are you?",
      type: "MULTI_CHOICE",
      multichoiceOptions: ["Beyonce", "Rihanna", "Mama G", "Tinubu"],
      answer: "Rihanna",
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-8 flex w-full">
        <div className="flex max-w-[300px] w-full px-2 lg:px-0 h-14">
          <div className="flex-shrink-0 flex w-full items-center justify-center py-3">
            <div className="block lg:hidden h-8 w-auto text-primary text-3xl font-bold">
              QuizDeck
            </div>
            <div className="hidden lg:block h-8 w-auto text-primary text-3xl font-bold">
              QuizDeck
            </div>
          </div>
        </div>
        <NavbarDashboard />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-8">
        <div className="flex gap-8">
          <div className="max-w-[350px] w-full">
            <QuestionsSideNav data={data} />
          </div>
          <div className="w-full">
            <MultipleChoice
              data={data}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTaker;
