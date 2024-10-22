import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "utils/PageLoader";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
import Spirals from "../../../assets/decorations/spirals.svg";
import Question from "../../../assets/decorations/question-mark.png";
import createQuiz from "../../../assets/icons/create-quiz.svg";
import generateDocument from "../../../assets/icons/generate-document.svg";
import { ReactComponent as StarOutline } from "../../../assets/icons/star-outline.svg";
import { CreateDeckModal } from "components/modals/CreateDeckModal";
import { CreateDeckTypesModal } from "components/modals/CreateDeckTypesModal";
import { useGetUserDeckQuery } from "../../../features/api/deck/deckApi";
import { useGetPublicDecksQuery } from "../../../features/api/deck/deckApi";

export default function Explore() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetPublicDecksQuery("1");
  const { data: userDecks } = useGetUserDeckQuery("1");

  const [modal, setModal] = useState({ isOpen: false, type: "", modalObj: {} });
  const modalOpen = (type: string, modalObj?: any) =>
    setModal({ isOpen: true, type: type, modalObj });
  const modalClose = (e?: boolean) =>
    setModal({ isOpen: e || false, type: "", modalObj: {} });

  return (
    <div>
      <div className="mb-12">
        <div className="relative flex items-end justify-between gap-4 purple-gradient py-10 px-8 rounded-[30px]">
          <div className="pb-4 ml-2 text-white lg:w-[70%]">
            <h2 className="text-[2rem] mb-3">This would be a headline here</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur. Sed libero tellus ornare
              est nLorem ipsum dolor sit amet consectetu sit amet consectetu.
            </p>
            <img
              src={Spirals}
              alt="design"
              className="absolute left-4 bottom-4"
            />
          </div>
          <div>
            <img
              src={Question}
              alt="design"
              className="h-130px] w-[130px] absolute top-3 right-2"
            />
            <button
              type="button"
              // onClick={() => navigate(`/deck/create`)}
              onClick={() => modalOpen("quiz-types")}
              className="h-[55px] min-w-[160px] rounded-[50px] border border-white outline-none px-5 text-white text-lg "
            >
              Create Quiz
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6">
          <div
            onClick={() => modalOpen("create-standard")}
            className="flex items-center gap-3 border border-[#C6C6CB] rounded-lg py-3 px-3"
          >
            <img
              src={createQuiz}
              alt="createQuiz"
              className="h-[42px] w-[42px] object-cover"
            />
            <p className="text-[1rem] text-[#46464D]">
              Create quiz from scratch
            </p>
          </div>

          <div className="flex items-center gap-3 border border-[#C6C6CB] rounded-lg py-3 px-3">
            <img
              src={generateDocument}
              alt="generateDocument"
              className="h-[42px] w-[42px] object-cover"
            />
            <div>
              <label className="text-[10px] text-[#885AF2] bg-[#F2F2F3] px-3 mb-1 w-fit block rounded-full">
                AI powered
              </label>
              <p className="text-[1rem] text-[#46464D]">
                Generate quiz from document
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-[#C6C6CB] rounded-lg py-3 px-3">
            <img
              src={createQuiz}
              alt="createQuiz"
              className="h-[42px] w-[42px] object-cover"
            />
            <div>
              <label className="text-[10px] text-[#885AF2] bg-[#F2F2F3] px-3 mb-1 w-fit block rounded-full">
                AI powered
              </label>
              <p className="text-[1rem] text-[#46464D]">
                Generate quiz from topics
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-black text-2xl font-bold">Created by me</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {userDecks?.data &&
            userDecks?.data?.length > 0 &&
            userDecks?.data.slice(0, 2).map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/dashboard/question/${item?._id}`)}
                className="bg-[#F2F2F3] rounded-lg cursor-pointer"
              >
                <img
                  src={Dummy}
                  alt="Dummy"
                  className="h-[190px] w-full object-cover rounded-t-lg"
                />
                <div className="px-3 py-4">
                  <h3 className="text-xl text-black font-semibold mb-1.5">
                    {item?.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <StarOutline className="w-[15px] h-[15px]" />
                    <p className="text-xs text-[#757575]">
                      {item.questions?.length} Questions
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-16 mb-12">
        <div className="mb-8">
          <h3 className="text-black text-2xl font-bold mb-3">Explore Quiz</h3>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/public-decks")}
              className="px-4 py-1 border border-[#ACACAC] bg-primary rounded-lg text-[1rem] text-white"
            >
              All
            </button>
            <button
              type="button"
              className="px-4 py-1 border border-[#ACACAC] rounded-lg text-[1rem] text-[#ACACAC]"
            >
              Game quiz
            </button>
            <button
              type="button"
              className="px-4 py-1 border border-[#ACACAC] rounded-lg text-[1rem] text-[#ACACAC]"
            >
              Academic quiz
            </button>
            <button
              type="button"
              className="px-4 py-1 border border-[#ACACAC] rounded-lg text-[1rem] text-[#ACACAC]"
            >
              Jamb questions
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <PageLoader />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {data?.data &&
                data?.data?.length > 0 &&
                data?.data?.slice(0, 8).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/dashboard/question/${item?._id}`)}
                    className="bg-[#F2F2F3] rounded-lg cursor-pointer"
                  >
                    <img
                      src={Dummy}
                      alt="Dummy"
                      className="h-[190px] w-full object-cover rounded-t-lg"
                    />
                    <div className="px-3 py-4">
                      <h3 className="text-xl text-black font-semibold mb-1.5">
                        {item?.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <StarOutline className="w-[15px] h-[15px]" />
                        <p className="text-xs text-[#757575]">
                          {item.questions?.length} Questions
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {modal && modal?.type === "create-standard" && (
        <CreateDeckModal open={modal?.isOpen} setClose={modalClose} />
      )}
      {modal && modal?.type === "quiz-types" && (
        <CreateDeckTypesModal open={modal?.isOpen} setOpen={modalOpen} setClose={modalClose} />
      )}
    </div>
  );
}
