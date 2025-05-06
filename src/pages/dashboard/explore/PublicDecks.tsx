import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import moment from "moment";
// import { ClockIcon } from "@heroicons/react/24/outline";
import PageLoader from "utils/PageLoader";
import Button from "components/button/buttons";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
// import Avatar from "../../../assets/images/rectangle.jpg";
import EmptyState from "../../../assets/images/empty-state.svg";
import Pagination from "components/pagination";
import NavbarDashboard from "components/navigation/NavbarDashboard";
import { ReactComponent as LikeOutline } from "assets/icons/like-outline.svg";
import { ReactComponent as StarOutline } from "assets/icons/star-outline.svg";
import { ReactComponent as PlayOutline } from "assets/icons/play-outline.svg";

import { useGetPublicDecksQuery } from "../../../features/api/deck/deckApi";
import { useGetCategoriesQuery } from "../../../features/api/category/categoryApi";

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

export default function PublicDecks() {
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || "1";
  const [active_tab, setActiveTab] = useState("all");
  const { data, isLoading } = useGetPublicDecksQuery(page);
  const { data: categoryData, isLoading: loading } = useGetCategoriesQuery(page);

  console.log("categoryData", categoryData);
  console.log("loading", loading);

  return (
    <div>
      <NavbarDashboard />
      <div className="pt-10 mb-6 max-w-[480px] mx-auto sm:mb-20">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Explore Other Exciting Quizes made by Others
        </h2>

        <div className="flex px-2 lg:px-0 max-w-2xl w-full bg-[#F6F6F5] h-[40px] rounded-[50px]">
          <input
            placeholder="Search"
            type="search"
            className="bg-[#F6F6F5] rounded-[50px] h-[40px] w-full px-4"
          />
          <Button.Primary
            title={"Search"}
            className="px-5"
            style={{ borderRadius: "30px" }}
            // disabled={isLoading}
            // loading={isLoading}
            // onClick={handleSubmit}
          />
        </div>
      </div>

      <nav className="flex items-center gap-8 rounded-[2rem] py-4 h-[60px] mb-8 overflow-x-scroll overflow-y-hidden sm:overflow-hidden">
        <select className="rounded-[10px] px-4 h-[32px] text-[14px] text-[#ACACAC] border border-[#ACACAC]">
          <option>Popular</option>
          <option>Popular</option>
          <option>Popular</option>
          <option>Popular</option>
        </select>
        <div className="flex items-center gap-4">
          <div
            className={`${
              active_tab === "all"
                ? "text-primary bg-[#E0D4FC] btn-shadow"
                : "text-[#84848E] bg-[#F3F3F6]"
            } rounded-[10px] px-6 h-[32px] text-[14px] flex items-center justify-center gap-1 cursor-pointer`}
            onClick={() => setActiveTab("all")}
          >
            <p className="capitalize">{"all"}</p>
          </div>
          {categoryData &&
            categoryData?.data?.length > 0 &&
            categoryData?.data?.map((tab, index) => (
              <div
                key={index}
                className={`${
                  active_tab === tab
                    ? "text-primary bg-[#E0D4FC] btn-shadow"
                    : "text-[#84848E] bg-[#F3F3F6]"
                } rounded-[10px] px-6 h-[32px] text-[14px] flex items-center justify-center gap-1 cursor-pointer`}
                onClick={() => setActiveTab(tab)}
              >
                <p className="capitalize">{tab}</p>
              </div>
            ))}
        </div>
      </nav>

      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <PageLoader />
        </div>
      ) : (
        <>
          {data?.data && data?.data?.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
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
              <Pagination data={data} route={"/dashboard/explore"} />
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
