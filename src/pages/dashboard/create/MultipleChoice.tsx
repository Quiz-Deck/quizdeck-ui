import React, { useState, Fragment } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const MultipleChoice: React.FC<CreateQuizProps> = () => {
  const [data, setData] = useState({
    question: "",
    type: "",
    multichoiceOptions: [],
    answer: "",
  });

  const [answerFields, setAnswerFields] = useState([
    { answer: "" },
    { answer: "" },
    { answer: "" },
  ]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: [value] });
  };

  const handleInputChange = (index: number, event: any) => {
    const values = [...answerFields];

    values[index].answer = event.target.value;

    setAnswerFields(values);
  };

  const handleAddFields = () => {
    const values = [...answerFields];
    values.push({ answer: "" });
    setAnswerFields(values);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...answerFields];
    values.splice(index, 1);
    setAnswerFields(values);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Process inputValues as needed
    console.log("AnswerFields", answerFields);
  };

  return (
    <div className="p-5 border w-full">
      <textarea
        name="question"
        rows={4}
        placeholder="Type your question here..."
        className="mt-2 block pl-3 pr-10 w-full text-base bg-[#FFFFFF] focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none sm:text-sm h-[100px] px-4 py-2 mb-5 border border-gray-300 rounded-md"
        onChange={(e: any) => handleChange(e)}
      />

      {answerFields.map((inputField, index) => (
        <Fragment key={`${inputField}~${index}`}>
          <div className="flex gap-4 w-full items-center">
            <Input.Label
              title={""}
              name="answer"
              placeholder={"Type answer or option"}
              className="rounded-md mb-5 w-full"
              autoComplete="off"
              value={inputField.answer}
              onChange={(event: any) => handleInputChange(index, event)}
            />

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
      <button
        className="text-primary mt-5"
        type="button"
        onClick={() => handleAddFields()}
      >
        + Add Answer or Option
      </button>
      <Button.Primary
        title={"Save"}
        className="w-full mt-4"
        onClick={() => handleSubmit}
      />
    </div>
  );
};

export default MultipleChoice;
