import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import QNA from "./questionTypes/QNA";
import MultipleChoice from "./questionTypes/MultipleChoice";
import QuestionsMenu from "./QuestionsMenu";
import EditMultipleChoice from "../editQuestionTypes/EditMultipleChoice";
import EditQNA from "../editQuestionTypes/EditQNA";
import Button from "../../../components/button/buttons";
import { EditDeckModal } from "components/modals/EditDeckModal";
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

  const [deleteQuestion] = useDeleteQuestionMutation();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ status: false, type: "" });

  useEffect(() => {
    dispatch(fetchSingleDeck(id || "")); // Dispatch the result of fetchSingleDeck
  }, [dispatch, id]);

  const handleDelete = (id: string) => {
    deleteQuestion(id)
      .unwrap()
      .then((res: any) => {
        dispatch(deckActions.deleteADeckQuestion(res?.data));
      })
      .catch((err) => {
        console.log("i am err", err);
        // errorHandler(err?.data?.message || "Something went wrong", true);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-primary font-medium mb-5"
      >
        {'<  Back'}
      </button>

      <div className="mb-12 border border-[#D6E4FD] rounded-md px-4 py-4">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{singleDeck?.data?.[0]?.title}</h2>
          <Button.Primary
            title={"Edit Deck"}
            className="px-8 mt-4"
            onClick={() => openModal()}
          />
        </div>

        <div className="mb-8">
          <label className="text-sm text-[#444444]">Deck description:</label>
          <h2>{singleDeck?.data?.[0]?.description}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-[#444444]">Deck type:</label>
            <h2>{singleDeck?.data?.[0]?.type}</h2>
          </div>
          <div>
            <label className="text-sm text-[#444444]">Deck status:</label>
            <h2>{singleDeck?.data?.[0]?.status}</h2>
          </div>
          <div>
            <label className="text-sm text-[#444444]">Deck timer:</label>
            <h2>{singleDeck?.data?.[0]?.timer} minutes</h2>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold">Deck Questions</h2>
      </div>

      <>
        {singleDeck?.data && singleDeck?.data?.[0]?.questions?.length > 0 ? (
          singleDeck?.data?.[0]?.questions.map(
            (question: DeckQuestion, index: number) => (
              <div key={question?._id} className="border w-full mb-8">
                <div className="p-5 flex items-center justify-between border-b py-2">
                  <p>{index + 1}</p>
                  <button onClick={() => handleDelete(question?._id)}>
                    del
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
          )
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
      </>

      <EditDeckModal
        open={open}
        setClose={closeModal}
        deck={singleDeck?.data && singleDeck?.data?.[0]}
      />
    </div>
  );
};

export default AddDeckQuestions;
