import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { _getUser } from "utils/Auth";
import PageLoader from "utils/PageLoader";
import Button from "components/button/buttons";
import Placeholder from "../../../assets/images/quiz-default1.jpeg";
import Avatar from "../../../assets/images/rectangle.jpg";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { ClockIcon, HeartIcon, PlayIcon } from "@heroicons/react/24/outline";
import errorHandler from "handlers/errorHandler";
import { DeleteDeckModal } from "components/modals/DeleteDeckModal";
import {
  useGetSingleDeckQuery,
  useLikeSingleDeckMutation,
} from "../../../features/api/deck/deckApi";

interface TimeAgoProps {
  time?: string; // Accepts a string representation of the time
}

export const TimeAgo: React.FC<TimeAgoProps> = ({ time }) => {
  const timeAgo = moment(time).fromNow(); // Calculate the time difference
  return <span>{timeAgo}</span>; // Display the calculated time difference
};

export default function Question() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = _getUser();

  const [likeSingleDeck] = useLikeSingleDeckMutation();
  const { data, isLoading } = useGetSingleDeckQuery(id || "");

  const [openModal, setOpenModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const toggleLiked = () => {
    setIsLiked(!isLiked);
  };

  console.log("isLoading", isLoading);

  const handleLike = (id: string) => {
    likeSingleDeck(id)
      .unwrap()
      .then((res: any) => {
        console.log("res", res);
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <PageLoader />
        </div>
      ) : (
        <Fragment>
          <div className="border border-[#D6E4FD] rounded-lg flex justify-between p-3">
            <div className="flex gap-3">
              <img
                src={Placeholder}
                alt="Placeholder"
                className="h-[220px] w-[240px] object-cover rounded-lg"
              />
              <div className="px-2 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {data?.data?.title}
                  </h3>
                  <div className="flex justify-between pb-2">
                    <p className="text-sm font-semibold">
                      {data?.data?.questions?.length} Questions
                    </p>

                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" aria-hidden="true" />
                      <p className="text-sm font-semibold">
                        {data?.data?.timer && data?.data?.timer > 0
                          ? Math.floor(Number(data?.data?.timer) / 60) + " mins"
                          : "No timer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <PlayIcon className="h-4 w-4" aria-hidden="true" />
                    <p className="text-xs">{data?.data?.playCount} Plays</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className={`like-button ${isLiked ? "active" : ""}`}
                      onClick={() => {
                        toggleLiked();
                        handleLike(id || "");
                      }}
                    >
                      {data?.data?.userLiked ? (
                        <SolidHeart className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <HeartIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>

                    <p className="text-xs">
                      {" "}
                      {data?.data?.likeCount}{" "}
                      {data && data?.data?.likeCount > 1 ? "Likes" : "Like"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 gap-2">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="h-[36px] w-[36px] object-cover rounded-full"
                  />
                  <p className="text-sm">{data?.data?.createdBy?.userName}</p>
                  <div className="bg-[#126CD6] w-[8px] h-[8px] rounded-full" />
                  <p className="text-sm">
                    {<TimeAgo time={data?.data?.createdOn} />}
                  </p>
                </div>
              </div>
            </div>
            {user?.data?._id === data?.data?.createdBy?._id && (
              <div className="px-2 flex flex-col justify-between">
                <div className="flex justify-between pb-2 gap-2">
                  <Button.Secondary
                    title={"Delete Deck"}
                    className="px-8 mt-4"
                    onClick={() => setOpenModal(true)}
                  />
                  <Button.Primary
                    title={"Edit Deck"}
                    className="px-8 mt-4"
                    onClick={() => navigate(`/deck/create/${id}`)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="my-10 md:max-w-[80%]">
            <h3 className="font-semibold text-lg mb-3">Description:</h3>
            <p>{data?.data?.description}</p>
          </div>

          {data?.data && data?.data?.questions?.length > 0 && (
            <button
              type="button"
              onClick={() => navigate(`/deck/practise/${data?.data?._id}`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary focus:outline-none"
            >
              Take Quiz
            </button>
          )}
        </Fragment>
      )}
      <DeleteDeckModal
        open={openModal}
        setClose={closeModal}
        deck_id={id || ""}
      />
    </div>
  );
}
