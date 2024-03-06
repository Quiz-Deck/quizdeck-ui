import React, { useState, useEffect } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import { DeckQuestion } from "features/api/deck/deckSliceTypes";
import { useEditQuestionMutation } from "../../../features/api/question/questionSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {
  question: DeckQuestion;
};

const EditQNA: React.FC<CreateQuizProps> = ({ question }) => {
  const [editQuestion, { isLoading }] = useEditQuestionMutation();

  console.log("answer", question);

  const [data, setData] = useState({
    question: "",
    type: "QNA",
    answer: "",
  });

  useEffect(() => {
    if (question) {
      setData({
        ...data,
        question: question?.question,
        type: question?.type,
        answer: question?.answer,
      });
    }
  }, [question]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: any) => {
    editQuestion({
      deckId: question?._id,
      payload: { ...data },
    })
      .unwrap()
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("i am err", err);
        // errorHandler(err?.data?.message || "Something went wrong", true);
      });
  };

  return (
    <div className="p-5 w-full">
      <textarea
        name="question"
        rows={4}
        defaultValue={data?.question}
        placeholder="Type your question here..."
        className="mt-2 block pl-3 pr-10 w-full text-base bg-[#FFFFFF] focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none sm:text-sm h-[60px] px-4 py-2 mb-4 border border-gray-300 rounded-md"
        onChange={(e: any) => handleChange(e)}
      />

      <Input.Label
        title={"Answer"}
        name="answer"
        placeholder={"Enter the answer"}
        defaultValue={data?.answer}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />

      <div className="flex items-center justify-end">
        <Button.Primary
          title={"Edit"}
          className="mt-4"
          loading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditQNA;
