import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PageLoader from "utils/PageLoader";
import Button from "components/button/buttons";
import Pagination from "components/pagination";
import Dummy from "assets/images/quiz-default1.jpeg";
import EmptyState from "assets/images/empty-state.svg";
import { ReactComponent as LikeOutline } from "assets/icons/like-outline.svg";
import { ReactComponent as StarOutline } from "assets/icons/star-outline.svg";
import { ReactComponent as PlayOutline } from "assets/icons/play-outline.svg";
import { useGetUserDeckQuery } from "features/api/deck/deckApi";

interface TimeAgoProps {
  time: string; // Accepts a string representation of the time
}

export const TimeAgo: React.FC<TimeAgoProps> = ({ time }) => {
  const timeAgo = moment(time).fromNow(); // Calculate the time difference
  return <span>{timeAgo}</span>; // Display the calculated time difference
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function PublishedQuiz() {
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || "1";

  const { data, isLoading } = useGetUserDeckQuery(page);

  return (
    <div>
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <PageLoader />
        </div>
      ) : (
        <>
          {data?.data && data?.data?.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data?.data?.map((deck, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/dashboard/question/${deck?._id}`)}
                    className="bg-[#F2F2F3] rounded-lg cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={Dummy}
                        alt="Dummy"
                        className="h-[190px] w-full object-cover rounded-t-lg"
                      />
                      <div className="mb-2 w-fit absolute top-3 left-3">
                        <div
                          className={`flex justify-between px-3 py-0.5 rounded-full bg-[#FFFFFFa3]`}
                        >
                          <span className={`text-xs text-primary capitalize`}>
                            {deck?.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-3 py-4">
                      <div className="mb-2 w-fit">
                        <div
                          className={`flex justify-between px-3 py-1 rounded-full ${
                            deck?.status === "PUBLISHED"
                              ? "bg-[#d5fed5e6]"
                              : "bg-[#126CD626]"
                          }`}
                        >
                          <span
                            className={`text-xs ${
                              deck?.status === "PUBLISHED"
                                ? "text-[#008000]"
                                : "text-primary"
                            }`}
                          >
                            {deck?.status}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl text-black font-semibold mb-3">
                        {deck?.title}
                      </h3>

                      <div className="flex justify-between pb-2 w-full">
                        <div className="flex items-center gap-2">
                          <StarOutline className="w-[15px] h-[15px]" />
                          <p className="text-sm text-[#757575]">
                            {deck?.questions?.length} Questions
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <LikeOutline className="w-[15px] h-[15px]" />
                            <p className="text-xs text-[#757575]">
                              {deck?.likeCount}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <PlayOutline className="w-[15px] h-[15px]" />
                            <p className="text-xs text-[#757575]">
                              {deck?.playCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination data={data} route={"/dashboard/my-library"} />
            </div>
          ) : (
            <div className="text-center h-full">
              <img
                src={EmptyState}
                alt="EmptyState"
                className="max-h-[260px] mx-auto mb-10"
              />

              <p className="mb-4">
                You have not created any deck. Create your first deck here
              </p>

              <Button.Primary
                title={"Create Deck"}
                className="px-8 mt-4"
                onClick={() => navigate(`/deck/create`)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
