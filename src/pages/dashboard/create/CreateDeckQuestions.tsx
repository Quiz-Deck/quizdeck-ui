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
  const navigate = useNavigate();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const [view, setView] = useState("details");
  const [input, setInput] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    timer: 0, //Optional
    deckGuests: [], //Optional
  });

  const handleDelete = (id: string) => {
    deleteQuestion(id);
  };

  const { id } = useParams();

  const { data, error, isLoading } = useGetSingleDeckQuery(id || "");
  // const { data: deleteData,  } = useDeleteSingleDeckQuery(id || "");
  // console.log("data", data);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-12 border rounded-md px-4 py-4">
        <div className="mb-4">
          <label>Deck title:</label>
          <h2>{data?.data?.[0]?.title}</h2>
        </div>

        <div className="mb-4">
          <label>Deck description:</label>
          <h2>{data?.data?.[0]?.description}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label>Deck type:</label>
            <h2>{data?.data?.[0]?.type}</h2>
          </div>
          <div>
            <label>Deck status:</label>
            <h2>{data?.data?.[0]?.status}</h2>
          </div>
          <div>
            <label>Deck timer:</label>
            <h2>{data?.data?.[0]?.timer} minutes</h2>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Add questions to your deck</h2>
      </div>

      {data?.data &&
        data?.data?.[0]?.questions?.length > 0 &&
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
        ))}

      {view === "multiple-choice" ? (
        <MultipleChoice />
      ) : view === "qna" ? (
        <QNA />
      ) : (
        ""
      )}

      <QuestionsMenu setView={setView} />
    </div>
  );
};

export default CreateDeckQuestions;
