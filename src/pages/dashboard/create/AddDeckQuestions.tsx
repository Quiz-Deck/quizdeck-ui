import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import QNA from "./questionTypes/QNA";
import MultipleChoice from "./questionTypes/MultipleChoice";
import QuestionsMenu from "./QuestionsMenu";
import EditMultipleChoice from "../editQuestionTypes/EditMultipleChoice";
import EditQNA from "../editQuestionTypes/EditQNA";
import Button from "../../../components/button/buttons";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
import { EditDeckModal } from "components/modals/EditDeckModal";
import { GenerateDeckModal } from "components/modals/GenerateDeckModal";
import { AddImageModal } from "components/modals/AddImageModal";
import { AddAudioModal } from "components/modals/AddAudioModal";
import { AddVideoModal } from 'components/modals/AddVideoModal';
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import { fetchSingleDeck } from "features/store/deckSlice";
import { deckActions } from "features/store/deckSlice";
import { useDeleteQuestionMutation } from "features/api/question/questionApi";
import {
  SingleDeckResponse,
  DeckQuestion,
} from "features/api/deck/deckSliceTypes";

const AddDeckQuestions: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<SingleDeckResponse, any, AnyAction> =
    useDispatch();

  const { singleDeck } = useSelector((state: any) => state.deck);

  const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();

  const [open, setOpen] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [view, setView] = useState({ status: false, type: "" });

  useEffect(() => {
    dispatch(fetchSingleDeck(id || "")); // Dispatch the result of fetchSingleDeck
  }, [dispatch, id]);

  const handleDelete = (id: string) => {
    deleteQuestion(id)
      .unwrap()
      .then((res: any) => {
        successHandler(res, true);
        dispatch(deckActions.deleteADeckQuestion(id));
      })
      .catch((err) => {
        errorHandler(err?.data, true);
      });
  };

  const setViewType = (type: string) => {
    setView({ status: true, type: type });
  };

  const closeQuestionView = () => {
    setView({ status: false, type: "" });
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closePromptModal = () => {
    setOpenPrompt(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(`/dashboard/question/${id}`)}
        className="text-primary font-medium mb-5 flex items-center gap-2"
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        {"Back"}
      </button>

      <div className="mb-12 bg-[#F3EFFC] border border-[#FFFFFF33] rounded-[10px] px-5 py-5">
        <div className="flex justify-between items-end gap-8">
          <div className="flex items-start gap-4">
            <figure>
              <img
                src={Dummy}
                alt="cover"
                className="w-[164px] h-[133px] rounded-[5px] border border-white object-cover"
              />
            </figure>
            <div>
              <h2 className="text-2xl font-bold my-2">
                {singleDeck?.data?.title}
              </h2>
              <h2>{singleDeck?.data?.description}</h2>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="bg-[#E0D4FC] rounded-[15px] w-[108px] py-1 text-center capitalize ">
              <span className="text-primary">
                {Math.floor(Number(singleDeck?.data?.timer) / 60)} min
              </span>
            </div>
            <div className="bg-[#E0D4FC] rounded-[15px] w-[104px] py-1 text-center capitalize ">
              <span className="text-primary">{singleDeck?.data?.type}</span>
            </div>
          </div>
        </div>
      </div>

      <>
        {singleDeck?.data &&
          singleDeck?.data?.questions?.length > 0 &&
          singleDeck?.data?.questions.map(
            (question: DeckQuestion, index: number) => (
              <div
                key={question?._id}
                className="bg-primary rounded-[20px] w-full mb-8"
              >
                <div className="p-5 flex items-center justify-between border-b py-2">
                  <p className="text-white font-bold">Question {index + 1}.</p>
                  <button
                    className={`${isLoading ? "animate-spin" : ""}`}
                    onClick={() => handleDelete(question?._id)}
                  >
                    {isLoading ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                      >
                        <circle
                          cy="12"
                          cx="12"
                          r="10"
                          fill="transparent"
                          stroke="#d1d5db"
                          strokeWidth="2px"
                        ></circle>
                        <circle
                          cy="12"
                          cx="12"
                          r="10"
                          fill="transparent"
                          stroke="#116cd6"
                          strokeWidth="2px"
                          strokeDasharray={30}
                        ></circle>
                      </svg>
                    ) : (
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {question?.type === "MULTI_CHOICE" ? (
                  <EditMultipleChoice question={question} />
                ) : question?.type === "QNA" ? (
                  <EditQNA question={question} />
                ) : (
                  ""
                )}
              </div>
            )
          )}

        {view?.status && view?.type === "multiple-choice" ? (
          <MultipleChoice
            handleClose={closeQuestionView}
            questions={singleDeck?.data?.questions}
          />
        ) : view?.type === "qna" ? (
          <QNA
            handleClose={closeQuestionView}
            questions={singleDeck?.data?.questions}
          />
        ) : (
          ""
        )}

        <div
          className={`flex gap-4 items-center ${
            singleDeck?.data && singleDeck?.data?.questions?.length > 0
              ? "justify-center"
              : "justify-start"
          } mt-6 w-full`}
        >
          <QuestionsMenu setView={setViewType} />
          <p>Or</p>
          <Button.Primary
            title={"Generate questions with AI"}
            className="px-8 outline-none"
            style={{ borderRadius: "50px" }}
            onClick={() => setOpenPrompt(true)}
          />
        </div>
      </>

      <EditDeckModal
        open={open}
        setClose={closeModal}
        deck={singleDeck?.data && singleDeck?.data}
      />
      {/* <GenerateDeckModal
        open={openPrompt}
        setClose={closePromptModal}
        questions={singleDeck?.data?.questions}
      /> */}
      {/* <AddImageModal open={openPrompt} setClose={closePromptModal} /> */}
      {/* <AddAudioModal open={openPrompt} setClose={closePromptModal} /> */}
      <AddVideoModal open={openPrompt} setClose={closePromptModal} />
    </div>
  );
};

export default AddDeckQuestions;
