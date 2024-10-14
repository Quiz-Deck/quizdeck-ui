import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/buttons";
import PageLoader from "utils/PageLoader";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
import createQuiz from "../../../assets/icons/create-quiz.svg";
import generateDocument from "../../../assets/icons/generate-document.svg";
import { ReactComponent as StarOutline } from "../../../assets/icons/star-outline.svg";
import { CreateDeckModal } from "components/modals/CreateDeckModal";
import { useGetUserDeckQuery } from "../../../features/api/deck/deckApi";
import { useGetPublicDecksQuery } from "../../../features/api/deck/deckApi";

export default function Explore() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetPublicDecksQuery("1");
  const { data: userDecks } = useGetUserDeckQuery("1");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-end justify-between gap-4 purple-gradient py-10 px-8 rounded-[30px]">
          <div className="pb-4 text-white lg:w-[60%]">
            <h2 className="text-[2rem] mb-3">This would be a headline here</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur. Sed libero tellus ornare
              est nLorem ipsum dolor sit amet consectetu sit amet consectetu.
            </p>
          </div>
          <Button.Secondary
            title={"Create first quiz"}
            className="rounded-[50px] px-4 ml-auto"
            onClick={() => navigate(`/deck/create`)}
            // disabled={false}
            // loading={isLoading}
          />
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6">
          <div
            onClick={() => openModal()}
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

      <CreateDeckModal open={open} setClose={closeModal} />
    </div>
  );
}
