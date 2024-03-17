import React, { useState,  } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/buttons";
import { useAddQuestionMutation } from "../../../../features/api/question/questionSlice";

type CreateQuizProps = {
  handleClose: () => void;
};

const QNA: React.FC<CreateQuizProps> = ({ handleClose }) => {
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

  const handleSubmit = () => {
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

      <Input.Label
        title={"Answer"}
        name="answer"
        placeholder={"Enter the answer"}
        className="rounded-md mb-5 bg-[#FAFAFF]"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />

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
