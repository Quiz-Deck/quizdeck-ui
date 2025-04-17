import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import { DeckQuestion } from "features/api/deck/deckSliceTypes";
import { deckActions } from "features/store/deckSlice";
import ErrorValidation from "pages/common/ErrorValidation";
import { useEditQuestionMutation } from "../../../features/api/question/questionApi";

// Explicitly import the types for JSX
type CreateQuizProps = {
  question: DeckQuestion;
  data: any;
  setData: (e: any) => void;
  deckQuestions: any;
  setDeckQuestions: (e: any) => void;
  quiz_index: number;
};

const EditQNA: React.FC<CreateQuizProps> = ({
  question,
  data,
  setData,
  deckQuestions,
  setDeckQuestions,
  quiz_index,
}) => {
  const dispatch = useDispatch();
  const [editQuestion, { isLoading }] = useEditQuestionMutation();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (question) {
      setData((data: any) => ({
        ...data,
        question: question?.question,
        type: question?.type,
        answer: question?.answer,
      }));
    }
  }, [question]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setDeckQuestions((prevQuizzes: any) =>
      prevQuizzes.map((quiz: any, i: number) =>
        i === quiz_index ? { ...quiz, ["answer"]: value } : quiz
      )
    );
  };

  return (
    <div className="py-5 w-full hover:shadow-lg cursor-pointer">
      <div>
        <Input.Label
          title={""}
          name="answer"
          placeholder={"Enter the answer"}
          defaultValue={data?.answer}
          className=" mb-4 w-full bg-[#D9D9D91A] rounded-[20px] border-[#FFFFFF4D] text-white"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        {submitted && data?.answer === "" && (
          <ErrorValidation message="Enter an answer for this question" />
        )}

        {/* <div className="flex items-center justify-end">
          <Button.Primary
            title={"Edit Question"}
            className="mt-4"
            loading={isLoading}
            onClick={handleSubmit}
          />
        </div> */}
      </div>
    </div>
  );
};

export default EditQNA;
