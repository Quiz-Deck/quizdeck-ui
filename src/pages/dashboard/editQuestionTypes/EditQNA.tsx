import React, { useState, useEffect } from "react";
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

const EditQNA: React.FC<CreateQuizProps> = ({ question }) => {
  const dispatch = useDispatch();
  const [editQuestion, { isLoading }] = useEditQuestionMutation();
  const [showDetails, setShowDetails] = useState(false);

  const [data, setData] = useState({
    question: question?.question,
    type: "QNA",
    answer: question?.answer,
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
        defaultValue={data?.question}
        placeholder="Type your question here..."
        className="rounded-md mb-5 min-h-[60px] bg-[#FAFAFF]"
        autoComplete="off"
        minLength={12}
        rows={2}
        onChange={(e: any) => handleChange(e)}
      />

      {showDetails && (
        <div>
          <Input.Label
            title={"Answer"}
            name="answer"
            placeholder={"Enter the answer"}
            defaultValue={data?.answer}
            className="rounded-md mb-5 bg-[#FAFAFF]"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          />

          <div className="flex items-center justify-end">
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

export default EditQNA;
