import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { ClockIcon } from "@heroicons/react/24/outline";
import PageLoader from "utils/PageLoader";
import Button from "components/button/buttons";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
import Avatar from "../../../assets/images/rectangle.jpg";
import EmptyState from "../../../assets/images/empty-state.svg";
import Pagination from "components/pagination";
import { useGetUserDeckQuery } from "../../../features/api/deck/deckApi";
import { SingleDeck } from "features/api/deck/deckSliceTypes";
import { getDecks } from "storage/indexedDBStorage";

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

export default function MyLibrary() {
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || "1"; ;
  const { data, isLoading } = useGetUserDeckQuery(page);


  const [allDecks, setAllDecks] = useState<SingleDeck[]>([]);

  // There might be a better way to handle this but giving up for now, if we can get it sent from the API, will be a better outcome 
  useEffect(() => {
    const fetchData = async () => {
      let decks = await getDecks();
      setAllDecks(decks);
    };
    fetchData();
  }, [data]);

  return (
    <div>
      <div className="mt-10 mb-6">
        <h2 className="text-2xl font-semibold">My Library</h2>
      </div>

      {isLoading && allDecks.length === 0 ? (
        <div className="h-screen w-full flex items-center justify-center">
          <PageLoader />
        </div>
      ) : (
        <>
          {allDecks && allDecks?.length > 0 ? (
            <div>
              {allDecks?.map((deck, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/dashboard/question/${deck?._id}`)}
                  className="border border-[#D6E4FD] rounded-lg flex justify-between p-3 mb-5 cursor-pointer hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <img
                      src={Dummy}
                      alt="Dummy"
                      className="h-[120px] w-[120px] object-cover rounded-lg"
                    />
                    <div className="px-2 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">
                          {deck?.title}
                        </h3>
                        <div className="flex justify-between pb-2 max-w-[240px] min-w-[240px] w-full">
                          <p className="text-sm font-semibold">
                            {deck?.questions?.length} Questions
                          </p>
                          <p className="text-sm font-semibold">
                            {Math.floor(Number(deck?.timer) / 60)} mins
                          </p>
                          <p className="text-sm font-semibold">
                            {deck?.playCount} plays
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pb-2 gap-2 max-w-[240px] min-w-[240px] w-full">
                        <div className="flex justify-between items-center gap-1">
                          <img
                            src={Avatar}
                            alt="Avatar"
                            className="h-[28px] w-[28px] object-cover rounded-full"
                          />
                          <p className="text-sm">{deck?.createdBy?.userName}</p>
                        </div>

                        <div className="bg-[#126CD6] w-[8px] h-[8px] rounded-full" />
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" aria-hidden="true" />
                          <p className="text-sm">
                            {<TimeAgo time={deck?.createdOn} />}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
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
                </div>
              ))}
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
