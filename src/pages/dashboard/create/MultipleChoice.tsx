import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import { useAddQuestionMutation } from "../../../features/api/question/questionSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {
  handleClose: () => void;
};

const MultipleChoice: React.FC<CreateQuizProps> = ({ handleClose }) => {
  const { id } = useParams();
  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  const [data, setData] = useState({
    question: "",
    type: "MULTI_CHOICE",
    multichoiceOptions: [],
    answer: "",
  });

  const [answerFields, setAnswerFields] = useState(["option 1", "option 2"]);
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

  const handleSubmit = () => {
    addQuestion({
      deckId: id,
      payload: { ...data, multichoiceOptions: answerFields },
    })
      .unwrap()
      .then(() => {
        setData({
          question: "",
          type: "MULTI_CHOICE",
          multichoiceOptions: [],
          answer: "",
        });
        setAnswerFields(["option 1", "option 2"]);
      })
      .catch((err) => {
        console.log("i am err", err);
        // errorHandler(err?.data?.message || "Something went wrong", true);
      });
  };

  return (
    <div className="mt-5 p-5 border w-full">
      <Input.Textarea
        title={""}
        name="question"
        placeholder="Type your question here..."
        className="rounded-md mb-5 min-h-[100px] bg-[#FAFAFF]"
        autoComplete="off"
        minLength={12}
        rows={2}
        onChange={(e: any) => handleChange(e)}
      />
      {/* <textarea
        name="question"
        
        placeholder=''
        className="mt-2 block pl-3 pr-10 w-full text-base bg-[#FFFFFF] focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none sm:text-sm h-[60px] px-4 py-2 mb-4 border border-gray-300 rounded-md"
        onChange={(e: any) => handleChange(e)}
      /> */}

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
                className="rounded-md mb-4 w-full bg-[#FAFAFF]"
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
        <div className="flex gap-5">
          <Button.Secondary
            title={"Cancel"}
            className="mt-4"
            onClick={() => handleClose()}
          />
          <Button.Primary
            title={"Save"}
            className="mt-4"
            loading={isLoading}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
