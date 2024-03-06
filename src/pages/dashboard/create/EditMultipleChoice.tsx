import React, { useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import { DeckQuestion } from "features/api/deck/deckSliceTypes";
import { useEditQuestionMutation } from "../../../features/api/question/questionSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {
  question: DeckQuestion;
};

const EditMultipleChoice: React.FC<CreateQuizProps> = ({ question }) => {
  const { id } = useParams();
  const [editQuestion, { isLoading }] = useEditQuestionMutation();

  const [data, setData] = useState({
    question: "",
    type: "MULTI_CHOICE",
    multichoiceOptions: [],
    answer: "",
  });

  const [answerFields, setAnswerFields] = useState(["option 1", "option 2"]);

  useEffect(() => {
    if (question) {
      setData({
        ...data,
        question: question?.question,
        type: question?.type,
        answer: question?.answer,
      });
      setAnswerFields(question?.multichoiceOptions);
    }
  }, [question]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleInputChange = (index: number, event: any) => {
    const values = [...answerFields];
    values[index] = event.target.value;
    setAnswerFields(values);
  };

  const handleAddFields = () => {
    const values = [...answerFields];
    values.push(`option ${values?.length + 1}`);
    setAnswerFields(values);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...answerFields];
    values.splice(index, 1);
    setAnswerFields(values);
  };

  const handleSelectAnswer = (answer: string) => {
    setData({ ...data, ["answer"]: answer });
  };

  const handleSubmit = (e: any) => {
    editQuestion({
      deckId: question?._id,
      payload: { ...data, multichoiceOptions: answerFields },
    })
      .unwrap()
      .then((res) => {
        // navigate("/auth/login");
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
        value={data?.question}
        placeholder="Type your question here..."
        className="mt-2 block pl-3 pr-10 w-full text-base bg-[#FFFFFF] focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none sm:text-sm h-[60px] px-4 py-2 mb-4 border border-gray-300 rounded-md"
        onChange={(e: any) => handleChange(e)}
      />

      {answerFields.map((inputField, index) => (
        <Fragment key={`${inputField}~${index}`}>
          <div className="flex gap-4 w-full items-center">
            <input
              type="radio"
              name="selectedAnswer"
              defaultChecked={data?.answer === inputField}
              onChange={() => handleSelectAnswer(inputField)}
            />
            <div className="w-full">
              <Input.Label
                title={""}
                name="answer"
                placeholder={"Type answer or option"}
                className="rounded-md mb-4 w-full"
                autoComplete="off"
                value={inputField}
                onChange={(event: any) => handleInputChange(index, event)}
              />
            </div>

            <button
              className="btn btn-link"
              type="button"
              onClick={() => handleRemoveFields(index)}
            >
              -
            </button>
          </div>
        </Fragment>
      ))}

      <div className="flex items-center justify-between">
        <button
          className="text-primary mt-4"
          type="button"
          onClick={() => handleAddFields()}
        >
          + Add Answer or Option
        </button>
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

export default EditMultipleChoice;
