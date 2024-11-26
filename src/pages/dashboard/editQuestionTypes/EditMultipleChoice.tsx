import React, { useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import { DeckQuestion } from "features/api/deck/deckSliceTypes";
import { deckActions } from "features/store/deckSlice";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import { useEditQuestionMutation } from "../../../features/api/question/questionApi";

// Explicitly import the types for JSX
type CreateQuizProps = {
  question: DeckQuestion;
  data: any;
  setData: (e: any) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  deckQuestions: any;
  setDeckQuestions: (e: any) => void;
  quiz_index: number;
};

const EditMultipleChoice: React.FC<CreateQuizProps> = ({
  question,
  data,
  setData,
  handleSubmit,
  deckQuestions,
  setDeckQuestions,
  quiz_index,
}) => {
  const dispatch = useDispatch();
  const [editQuestion, { isLoading }] = useEditQuestionMutation();

  const [answerFields, setAnswerFields] = useState(
    question?.multichoiceOptions
  );

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
    setDeckQuestions((prevQuizzes: any) =>
      prevQuizzes.map((quiz: any, i: number) =>
        i === quiz_index
          ? {
              ...quiz,
              multichoiceOptions: quiz.multichoiceOptions.map(
                (option: any, j: number) => (j === index ? value : option)
              ),
            }
          : quiz
      )
    );
  };

  const handleAddFields = () => {
    const values = [...answerFields];
    values.push(`option ${values?.length + 1}`);
    setAnswerFields(values);
    setDeckQuestions((prevQuizzes: any) =>
      prevQuizzes.map((quiz: any, i: number) =>
        i === quiz_index
          ? {
              ...quiz,
              multichoiceOptions: [
                ...quiz.multichoiceOptions,
                `option ${values?.length}`,
              ],
            }
          : quiz
      )
    );
  };

  const handleRemoveFields = (index: number) => {
    const values = [...answerFields];
    values.splice(index, 1);
    setAnswerFields(values);
    setDeckQuestions((prevQuizzes: any) =>
      prevQuizzes.map((quiz: any, i: number) =>
        i === quiz_index
          ? {
              ...quiz,
              multichoiceOptions: values,
            }
          : quiz
      )
    );
  };

  const handleSelectAnswer = (answer: string) => {
    setData({ ...data, answer: answer });
    setDeckQuestions((prevQuizzes: any) =>
      prevQuizzes.map((quiz: any, i: number) =>
        i === quiz_index ? { ...quiz, ["answer"]: answer } : quiz
      )
    );
  };

  // const handleSubmit = (e: any) => {
  //   if (answerFields?.length < 2) {
  //     errorHandler(
  //       {
  //         message: "Multichoice questions should have a minimum of 2 options",
  //       },
  //       true
  //     );
  //   } else {
  //     editQuestion({
  //       deckId: question?._id,
  //       payload: { ...data, multichoiceOptions: answerFields },
  //     })
  //       .unwrap()
  //       .then((res: any) => {
  //         successHandler(res, true);
  //         dispatch(deckActions.editADeckQuestion(res?.data));
  //       })
  //       .catch((err) => {
  //         errorHandler(err?.data || "Something went wrong", true);
  //       });
  //   }
  // };

  return (
    <div className="p-5 w-full hover:shadow-lg cursor-pointer">
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
                  className=" mb-4 w-full bg-[#D9D9D91A] rounded-[20px] border-[#FFFFFF4D] text-white"
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
            className="text-white mt-4 flex gap-2 items-center"
            type="button"
            onClick={() => handleAddFields()}
          >
            <span className="w-[2rem] h-[2rem] bg-primary800 rounded-full flex items-center justify-center">
              <Plus className="w-[24px] h-[24px] fill-[#ffffff]" />
            </span>
            Add Answer or Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMultipleChoice;
