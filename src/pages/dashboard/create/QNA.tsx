import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import { useAddQuestionMutation } from "../../../features/api/question/questionSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const QNA: React.FC<CreateQuizProps> = () => {
  const { id } = useParams();
  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  const [data, setData] = useState({
    question: "",
    type: "QNA",
    answer: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSelectAnswer = (answer: string) => {
    setData({ ...data, ["answer"]: answer });
  };

  const handleSubmit = (e: any) => {
    console.log("hjfjff", e);

    // e.preventDefault();

    addQuestion({
      deckId: id,
      payload: { ...data },
    })
      .unwrap()
      .then((res) => {
        // navigate("/auth/login");
        console.log("res", res);
        setData({
          question: "",
          type: "QNA",
          answer: "",
        });
      })
      .catch((err) => {
        console.log("i am err", err);
        // errorHandler(err?.data?.message || "Something went wrong", true);
      });
  };

  return (
    <div className="mt-5 p-5 border w-full">
      <textarea
        name="question"
        rows={2}
        placeholder="Enter your question here..."
        className="mt-2 block pl-3 pr-10 w-full text-base bg-[#FFFFFF] focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none sm:text-sm h-[60px] px-4 py-2 mb-4 border border-gray-300 rounded-md"
        onChange={(e: any) => handleChange(e)}
      />

      <Input.Label
        title={"Answer"}
        name="answer"
        placeholder={"Enter the nswer"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />

      <div className="flex items-center justify-end">
        <Button.Primary
          title={"Save"}
          className="mt-4"
          loading={isLoading}
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </div>
  );
};

export default QNA;
