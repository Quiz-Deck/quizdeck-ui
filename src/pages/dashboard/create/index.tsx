import React from "react";
import { useParams } from "react-router-dom";
import QuizNavbar from "./Navbar";
import QuizDetails from "./Details";
import MultipleChoice from "./MultipleChoice";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const CreateQuiz: React.FC<CreateQuizProps> = () => {
  const { page } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="flex gap-8">
        <div className="max-w-[350px] w-full">
          <QuizNavbar />
        </div>
        <div className="w-full">
          {page === "details" ? (
            <QuizDetails />
          ) : page === "multiple-choice" ? (
            <MultipleChoice />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
