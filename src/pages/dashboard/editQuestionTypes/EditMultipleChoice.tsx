import React, { useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import { DeckQuestion } from "features/api/deck/deckSliceTypes";
import { deckActions } from "features/store/deckSlice";
import { useEditQuestionMutation } from "../../../features/api/question/questionApi";

// Explicitly import the types for JSX
type CreateQuizProps = {
  question: DeckQuestion;
};

const EditMultipleChoice: React.FC<CreateQuizProps> = ({ question }) => {
  const dispatch = useDispatch();
  const [editQuestion, { isLoading }] = useEditQuestionMutation();
  const [showDetails, setShowDetails] = useState(false);

  const [data, setData] = useState({
    question: "",
    type: "MULTI_CHOICE",
    multichoiceOptions: [],
    answer: "",
  });

  const [answerFields, setAnswerFields] = useState(
    question?.multichoiceOptions
  );

  useEffect(() => {
    setData((data) => ({
      ...data,
      question: question?.question,
      type: question?.type,
      answer: question?.answer,
    }));
    setAnswerFields(question?.multichoiceOptions);
  }, [question]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setAnswerFields((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[index] = value;
      return updatedFields;
    });
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

  const handleSubmit = (e: any) => {
    editQuestion({
      deckId: question?._id,
      payload: { ...data, multichoiceOptions: answerFields },
    })
      .unwrap()
      .then((res: any) => {
        successHandler(res, true);
        dispatch(deckActions.editADeckQuestion(res?.data));
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

  return (
    <div
      className="p-5 w-full hover:shadow-lg cursor-pointer"
      onClick={() => setShowDetails(true)}
    >
      <Input.Textarea
        title={""}
        name="question"
        value={data?.question}
        placeholder="Type your question here..."
        className="rounded-md mb-5 min-h-[60px] bg-[#FAFAFF]"
        autoComplete="off"
        minLength={12}
        rows={4}
        onChange={(e: any) => handleChange(e)}
      />

      {showDetails && (
        <div>
          {answerFields.map((inputField, index) => (
            <Fragment key={index}>
              <div className="flex gap-4 w-full items-center">
                <input
                  type="radio"
                  name={question?._id}
                  defaultChecked={question?.answer === inputField}
                  onChange={() => handleSelectAnswer(inputField)}
                />
                <div className="w-full">
                  <Input.Label
                    title={""}
                    name="answer"
                    placeholder={"Type answer or option"}
                    className="rounded-md mb-4 w-full bg-[#FAFAFF]"
                    autoComplete="off"
                    defaultValue={inputField}
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
              title={"Edit Question"}
              className="mt-4"
              loading={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMultipleChoice;
