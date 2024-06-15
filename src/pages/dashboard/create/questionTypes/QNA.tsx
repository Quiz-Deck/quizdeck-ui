import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/buttons";
import successHandler from "handlers/successHandler";
import errorHandler from "handlers/errorHandler";
import { deckActions } from "features/store/deckSlice";
// import { DeckQuestion } from "features/api/deck/deckSliceTypes";
import { useAddQuestionMutation } from "../../../../features/api/question/questionApi";

type CreateQuizProps = {
  handleClose: () => void;
  questions: any;
};

const QNA: React.FC<CreateQuizProps> = ({ handleClose, questions }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addQuestion, { isLoading }] = useAddQuestionMutation();
  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    question: "",
    type: "QNA",
    answer: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    if (data?.question === "" || data?.answer === "") {
      setSubmitted(true);
    } else {
      setSubmitted(false);
      addQuestion({
        deckId: id,
        // payload: { ...data },
        payload: [...questions, data],
      })
        .unwrap()
        .then((res: any) => {
          dispatch(deckActions.addADeckQuestion(res?.data));
          setData({
            question: "",
            type: "QNA",
            answer: "",
          });
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
      {submitted && data?.question === "" && <div>Question is needed</div>}

      <Input.Label
        title={"Answer"}
        name="answer"
        placeholder={"Enter the answer"}
        className="rounded-md mb-5 bg-[#FAFAFF]"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      {submitted && data?.answer === "" && (
        <div>Select an answer for this question</div>
      )}

      <div className="flex items-center justify-end gap-5">
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
  );
};

export default QNA;
