import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
import PageLoader from "utils/PageLoader";
import { _getUser } from "utils/Auth";
import { useGetUserDeckQuery } from "../../../features/api/deck/deckApi";
import { useGetPublicDecksQuery } from "../../../features/api/deck/deckApi";
import { getDecks } from "storage/indexedDBStorage";
import { SingleDeck } from "features/api/deck/deckSliceTypes";

export default function Explore() {
  const user = _getUser();
  const navigate = useNavigate();
  const { data, isLoading } = useGetPublicDecksQuery("1");
  const { data: userDecks } = useGetUserDeckQuery("1");
  const [publicDeck, setPublicDeck] = useState<SingleDeck[]>([]);
  const [privateDeck, setPrivateDeck] = useState<SingleDeck[]>([]);

  // There might be a better way to handle this but giving up for now, if we can get it sent from the API, will be a better outcome 
  useEffect(() => {
    const fetchData = async () => {
      let decks = await getDecks('PUBLIC');
      setPublicDeck(decks);
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      let decks = await getDecks('PRIVATE');
      setPrivateDeck(decks);
    };
    fetchData();
  }, [userDecks]);

  return (
    <div>
      <div className="mb-12">
        <h1 className='mb-12 text-3xl font-bold'>Hello {user?.data?.userName},</h1>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold">My Recent Decks</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {privateDeck &&
            privateDeck?.length > 0 &&
            privateDeck.slice(0, 2).map((item, index) => (
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

        {(isLoading && publicDeck.length === 0) ? (
          <div className="h-full w-full flex items-center justify-center">
            <PageLoader />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {publicDeck &&
                publicDeck.length > 0 &&
                publicDeck?.slice(0, 8).map((item, index) => (
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
