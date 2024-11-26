import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import { _getUser } from "utils/Auth";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Logo from "assets/icons/logo.png";
import QNA from "./questionTypes/QNA";
import MultipleChoice from "./questionTypes/MultipleChoice";
import QuestionsMenu from "./QuestionsMenu";
import Button from "../../../components/button/buttons";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
import { EditDeckModal } from "components/modals/EditDeckModal";
import { AddVideoModal } from "components/modals/AddVideoModal";
import { fetchSingleDeck } from "features/store/deckSlice";
import { deckActions } from "features/store/deckSlice";
import { useEditDeckMutation } from "features/api/deck/deckApi";
import { useGetSingleDeckQuery } from "features/api/deck/deckApi";
import { useAddQuestionMutation } from "features/api/question/questionApi";
import {
  SingleDeckResponse,
  DeckQuestion,
  CreateDeckRequest,
} from "features/api/deck/deckSliceTypes";
import SingleDeckQuestion from "./questionTypes";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";

const AddDeckQuestions: React.FC = () => {
  const user = _getUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<SingleDeckResponse, any, AnyAction> =
    useDispatch();

  const [editDeck, { isLoading }] = useEditDeckMutation();
  const [addQuestion, { isLoading: loading }] = useAddQuestionMutation();

  const [open, setOpen] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [view, setView] = useState({ status: false, type: "" });
  const [deckQuestions, setDeckQuestions] = useState<any>([]);

  const [data, setData] = useState<CreateDeckRequest>({
    title: "",
    description: "",
    type: "",
    status: "",
    timer: 0,
  });

  const { data: singleDeck } = useGetSingleDeckQuery({
    id: id || "",
    userId: user?.data?._id,
  });

  useEffect(() => {
    if (singleDeck && singleDeck?.data && singleDeck?.data?.questions) {
      setDeckQuestions(singleDeck?.data?.questions);
    }
  }, [singleDeck]);

  useEffect(() => {
    if (singleDeck?.data) {
      const min_timer = Math.floor(Number(singleDeck?.data?.timer) / 60);
      setData({
        title: singleDeck?.data?.title,
        description: singleDeck?.data?.description,
        type: singleDeck?.data?.type,
        status: "DRAFT",
        timer: min_timer,
      });
    }
  }, [singleDeck?.data]);

  useEffect(() => {
    dispatch(fetchSingleDeck(id || "")); // Dispatch the result of fetchSingleDeck
  }, [dispatch, id]);

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

  console.log("deckQuestions", deckQuestions);

  const handleSubmitDraft = () => {
    const timer_to_seconds = data.timer && Number(data.timer * 60);
    const new_data = { ...data, timer: timer_to_seconds };
    editDeck({
      deckId: id,
      payload: new_data,
    })
      .unwrap()
      .then((res: any) => {
        dispatch(deckActions.editADeck(res?.data));
        addQuizQuestions(deckQuestions);
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

  const addQuizQuestions = (questionSetsArray: any[]) => {
    console.log("ddddd");

    addQuestion({
      deckId: id,
      payload: [...questionSetsArray],
    })
      .unwrap()
      .then((res: any) => {
        dispatch(deckActions.addADeckQuestion(res?.data));
        successHandler(res, true);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        className="border-b border-[#FFFFFF1A] py-4"
        style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
      >
        <div className="flex justify-between w-full max-w-7xl mx-auto">
          <div className="cursor-pointer">
            <div
              onClick={() => navigate("/dashboard/explore")}
              className="flex-shrink-0 flex w-full items-center justify-center py-1"
            >
              <div className="block lg:hidden h-8 w-auto text-primary text-3xl font-bold">
                <img src={Logo} alt="Logo" className="max-w-[150px]" />
              </div>
              <div className="hidden lg:block h-8 w-auto text-primary text-3xl font-bold">
                <img src={Logo} alt="Logo" className="max-w-[150px]" />
              </div>
            </div>
          </div>
          <div>
            <QuizActions
              openModal={openModal}
              handleSubmitDraft={handleSubmitDraft}
              isLoading={isLoading}
              loading={loading}
            />
          </div>
        </div>
      </div>
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
          {deckQuestions &&
            deckQuestions?.length > 0 &&
            deckQuestions.map((question: DeckQuestion, index: number) => (
              <SingleDeckQuestion
                key={index}
                question={question}
                index={index}
                deckQuestions={deckQuestions}
                setDeckQuestions={setDeckQuestions}
              />
            ))}

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

          <div className={`flex gap-4 items-center justify-center mt-6 w-full`}>
            <QuestionsMenu
              setView={setViewType}
              deckQuestions={deckQuestions}
              setDeckQuestions={setDeckQuestions}
            />
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
          deckQuestions={deckQuestions}
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
    </div>
  );
};

export default AddDeckQuestions;

const QuizActions = ({
  openModal,
  handleSubmitDraft,
  isLoading,
  loading,
}: any) => {
  return (
    <div className="flex gap-4">
      <Button.Secondary
        title={"Save as draft"}
        className="px-8 outline-none"
        loading={isLoading || loading}
        style={{ borderRadius: "50px" }}
        onClick={() => handleSubmitDraft()}
      />
      <Button.Primary
        title={"Publish"}
        className="px-8 outline-none"
        style={{ borderRadius: "50px" }}
        onClick={() => openModal()}
      />
    </div>
  );
};
