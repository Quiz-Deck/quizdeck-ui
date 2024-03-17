import React from "react";
import DeckDetails from "./DeckDetails";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const CreateQuiz: React.FC<CreateQuizProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">Create a new deck</h2>
      </div>

      <div
        style={{
          boxShadow: "0px 2px 3px 0px #D6E4FD",
        }}
        className="border border-[#D6E4FD] rounded-[1rem] px-[2.5rem] py-[3.125rem]"
      >
        <DeckDetails />
      </div>
    </div>
  );
};

export default CreateQuiz;
