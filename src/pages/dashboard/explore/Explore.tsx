import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/buttons";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
import PageLoader from "utils/PageLoader";
import { _getUser } from "utils/Auth";
import { useGetUserDeckQuery } from "../../../features/api/deck/deckApi";
import { useGetPublicDecksQuery } from "../../../features/api/deck/deckApi";

export default function Explore() {
  const user = _getUser();
  const navigate = useNavigate();
  const { data, isLoading } = useGetPublicDecksQuery("1");
  const { data: userDecks } = useGetUserDeckQuery("1");

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-end justify-between gap-4 bg-primary py-8 px-5 mb-8">
          <div className="pb-4 text-white">
            <h2 className="text-[2rem]">This would be a headline here</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur. Sed libero tellus ornare
              est nLorem ipsum dolor sit amet consectetu
            </p>
          </div>
          <Button.Secondary
            title={"Create first quiz"}
            className="rounded-[50px] px-4 ml-auto"
            // disabled={false}
            // loading={isLoading}
            // onClick={handleSubmit}
          />
        </div>

        <h1 className="mb-12 text-3xl font-bold">
          Hello {user?.data?.userName},
        </h1>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold">My Recent Decks</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userDecks?.data &&
            userDecks?.data?.length > 0 &&
            userDecks?.data.slice(0, 2).map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/dashboard/question/${item?._id}`)}
                className="border border-[#D6E4FD] rounded-lg cursor-pointer"
              >
                <img
                  src={Dummy}
                  alt="Dummy"
                  className="h-[190px] w-full mb-2 object-cover rounded-t-lg"
                />
                <div className="px-2">
                  <h3 className="text-md mb-1">{item?.title}</h3>
                  <div className="flex justify-between pb-2">
                    <p className="text-xs">
                      {item.questions?.length} Questions
                    </p>
                    <p className="text-xs">{item.playCount}</p>
                  </div>
                </div>
              </div>
            ))}

          <div
            onClick={() => navigate(`/deck/create`)}
            className="border border-4 border-[#D6E4FD] border-dotted rounded-lg cursor-pointer h-[250px] mx-auto w-full flex items-center justify-center"
          >
            <div>
              <svg
                fill="#D6E4FD"
                height="80px"
                width="80px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 455 455"
                className="mx-auto mb-4"
              >
                <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 455,242.5 " />
              </svg>
              <p className="text-center text-[#444444] py-2">
                Create a new deck
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold">
            Explore Public Decks
          </h3>
          <button
            type="button"
            className="text-primary"
            onClick={() => navigate("/dashboard/public-decks")}
          >
            See all
          </button>
        </div>

        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <PageLoader />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data?.data &&
                data?.data?.length > 0 &&
                data?.data?.slice(0, 8).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/dashboard/question/${item?._id}`)}
                    className="border border-[#D6E4FD] rounded-lg cursor-pointer"
                  >
                    <img
                      src={Dummy}
                      alt="Dummy"
                      className="h-[190px] w-full mb-2 object-cover rounded-t-lg"
                    />
                    <div className="px-2">
                      <h3 className="text-md mb-1">{item?.title}</h3>
                      <div className="flex justify-between pb-2">
                        <p className="text-xs">
                          {item.questions?.length} Questions
                        </p>
                        <p className="text-xs">{item.playCount}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
