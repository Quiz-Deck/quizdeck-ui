import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/buttons";
import successHandler from "handlers/successHandler";
import errorHandler from "handlers/errorHandler";
import { deckActions } from "features/store/deckSlice";
import { useAddQuestionMutation } from "../../../../features/api/question/questionApi";

// Explicitly import the types for JSX
type CreateQuizProps = {
  handleClose: () => void;
  questions: any;
};

const MultipleChoice: React.FC<CreateQuizProps> = ({
  handleClose,
  questions,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addQuestion, { isLoading }] = useAddQuestionMutation();
  const [submitted, setSubmitted] = useState(false);

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
    setData({ ...data, answer: answer });
  };

  const handleSubmit = () => {
    const newData = { ...data, multichoiceOptions: answerFields };

    if (answerFields?.length < 2) {
      errorHandler(
        { message: "Multichoice questions should have a minimum of 2 options" },
        true
      );
    } else if (data?.question === "" || data?.answer === "") {
      setSubmitted(true);
    } else {
      addQuestion({
        deckId: id,
        // payload: { ...data, multichoiceOptions: answerFields },
        payload: [...questions, newData],
      })
        .unwrap()
        .then((res: any) => {
          dispatch(deckActions.addADeckQuestion(res?.data));
          setData({
            question: "",
            type: "MULTI_CHOICE",
            multichoiceOptions: [],
            answer: "",
          });
          setAnswerFields(["option 1", "option 2"]);
          successHandler(res, true);
          handleClose();
        })
        .catch((err) => {
          errorHandler(err?.data, true);
        });
    }
  };

  return (
    <div className="mt-5 p-5 border border-t-4 border-t-primary w-full">
      <Input.Textarea
        title={""}
        name="question"
        placeholder="Type your question here..."
        className="rounded-md mb-5 min-h-[80px] bg-[#FAFAFF]"
        autoComplete="off"
        minLength={12}
        rows={2}
        onChange={(e: any) => handleChange(e)}
      />
      {submitted && data?.question === "" && <div>Questioon is needed</div>}

      {answerFields.map((inputField, index) => (
        <Fragment key={index}>
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

      {submitted && data?.answer === "" && (
        <div>Select an answer for this question</div>
      )}
    </div>
  );
};

export default MultipleChoice;
