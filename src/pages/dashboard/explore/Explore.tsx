import React from "react";
import { useNavigate } from "react-router-dom";
import Dummy from "../../../assets/images/rectangle.jpg";
import { useGetUserDeckQuery } from "../../../features/api/deck/deckSlice";
import { useGetPublicDecksQuery } from "../../../features/api/deck/deckSlice";

export default function Explore() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPublicDecksQuery();
  const { data: userDecks } = useGetUserDeckQuery();

  return (
    <div>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold">My recent decks</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {userDecks?.data &&
            userDecks?.data?.length > 0 &&
            userDecks?.data.slice(0, 4).map((item, index) => (
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

      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold">All public decks</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data?.data &&
            data?.data?.length > 0 &&
            data?.data?.map((item, index) => (
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
    </div>
  );
}
