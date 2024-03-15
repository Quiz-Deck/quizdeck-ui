import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import QuizNavbar from "./Navbar";
// import QuizDetails from "./Details";
import QNA from "./QNA";
import MultipleChoice from "./MultipleChoice";
import QuestionsMenu from "./QuestionsMenu";
import EditMultipleChoice from "./EditMultipleChoice";
import EditQNA from "./EditQNA";
import Input from "../../../components/input/Input";
import { SelectInput } from "components/input/select";
import Button from "../../../components/button/buttons";
import { useGetSingleDeckQuery } from "../../../features/api/deck/deckSlice";
import { useDeleteQuestionMutation } from "../../../features/api/question/questionSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const CreateDeckQuestions: React.FC<CreateQuizProps> = () => {
  const { id } = useParams();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const [view, setView] = useState({ status: false, type: "" });

  const handleDelete = (id: string) => {
    deleteQuestion(id);
  };

  const setViewType = (type: string) => {
    setView({ status: true, type: type });
  };

  const closeQuestionView = () => {
    setView({ status: false, type: "" });
  };

  const { data, error, isLoading } = useGetSingleDeckQuery(id || "");
  // console.log("data", data);

  console.log("view", view);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-12 border border-[#D6E4FD] rounded-md px-4 py-4">
        <div className="mb-5">
          <label className="text-sm text-[#444444]">Deck title:</label>
          <h2>{data?.data?.[0]?.title}</h2>
        </div>

        <div className="mb-5">
          <label className="text-sm text-[#444444]">Deck description:</label>
          <h2>{data?.data?.[0]?.description}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-[#444444]">Deck type:</label>
            <h2>{data?.data?.[0]?.type}</h2>
          </div>
          <div>
            <label className="text-sm text-[#444444]">Deck status:</label>
            <h2>{data?.data?.[0]?.status}</h2>
          </div>
          <div>
            <label className="text-sm text-[#444444]">Deck timer:</label>
            <h2>{data?.data?.[0]?.timer} minutes</h2>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold">Deck Questions</h2>
      </div>

      {data?.data && data?.data?.[0]?.questions?.length > 0 ? (
        data?.data?.[0]?.questions.map((question, index) => (
          <div className="border w-full mb-4">
            <div className="p-5 flex items-center justify-between border-b py-2">
              <p>{index + 1}</p>
              <button onClick={() => handleDelete(question?._id)}>del</button>
            </div>

            {question?.type === "MULTI_CHOICE" ? (
              <EditMultipleChoice question={question} />
            ) : question?.type === "QNA" ? (
              <EditQNA question={question} />
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <div>
          <p>You have not added any questions to your deck yet</p>
        </div>
      )}

      {view?.status && view?.type === "multiple-choice" ? (
        <MultipleChoice handleClose={closeQuestionView} />
      ) : view?.type === "qna" ? (
        <QNA handleClose={closeQuestionView} />
      ) : (
        ""
      )}

      <QuestionsMenu setView={setViewType} />
    </div>
  );
};

export default CreateDeckQuestions;
