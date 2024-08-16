import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { _getUser } from "utils/Auth";
import PageLoader from "utils/PageLoader";
import Button from "components/button/buttons";
import Placeholder from "../../../assets/images/quiz-default1.jpeg";
import Avatar from "../../../assets/images/rectangle.jpg";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import {
  ClockIcon,
  HeartIcon,
  PlayIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import errorHandler from "handlers/errorHandler";
import { DeleteDeckModal } from "components/modals/DeleteDeckModal";
import { InviteDeckUserModal } from "components/modals/InviteDeckUserModal";
import {
  useGetSingleDeckQuery,
  useLikeSingleDeckMutation,
} from "../../../features/api/deck/deckApi";
import { SingleDeck } from "features/api/deck/deckSliceTypes";
import { loadDeckFromLocalForage } from "storage/indexedDBStorage";

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
  const { data, isLoading } = useGetSingleDeckQuery({
    id: id || "",
    userId: user?.data?._id,
  });

  const [openModal, setOpenModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const closeShareModal = () => {
    setOpenShareModal(false);
  };

  const toggleLiked = () => {
    setIsLiked(!isLiked);
  };

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

  const [oneDeck, setDeck] = useState<SingleDeck>();

  // There might be a better way to handle this but giving up for now, if we can get it sent from the API, will be a better outcome 
  useEffect(() => {
    const fetchData = async () => {
      let deck = await loadDeckFromLocalForage(id as string) as SingleDeck;
      setDeck(deck);
    };
    fetchData();
  }, [data]);
  

  return (
    <div>
      {isLoading && !oneDeck ? (
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
                    {oneDeck?.title}
                  </h3>
                  <div className="flex justify-between pb-2">
                    <p className="text-sm font-semibold">
                      {oneDeck?.questions?.length} Questions
                    </p>

                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" aria-hidden="true" />
                      <p className="text-sm font-semibold">
                        {oneDeck?.timer && oneDeck?.timer > 0
                          ? Math.floor(Number(oneDeck?.timer) / 60) + " mins"
                          : "No timer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <PlayIcon className="h-4 w-4" aria-hidden="true" />
                    <p className="text-xs">{oneDeck?.playCount} Plays</p>
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
                      {oneDeck?.userLiked ? (
                        <SolidHeart className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <HeartIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>

                    <p className="text-xs">
                      {oneDeck?.likeCount}{" "}
                      {(oneDeck?.likeCount as number) > 1 ? "Likes" : "Like"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 gap-2">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="h-[36px] w-[36px] object-cover rounded-full"
                  />
                  <p className="text-sm">{oneDeck?.createdBy?.userName}</p>
                  <div className="bg-[#126CD6] w-[8px] h-[8px] rounded-full" />
                  <p className="text-sm">
                    {<TimeAgo time={oneDeck?.createdOn} />}
                  </p>
                </div>
              </div>
            </div>
            {user?.data?._id === oneDeck?.createdBy?._id && (
              <div className="px-2 flex flex-col justify-between items-end">
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
                <button
                  type="button"
                  onClick={() => setOpenShareModal(true)}
                  className="flex gap-2 items-center w-fit bg-secondary px-3 py-1 mb-2 rounded-xl text-white"
                >
                  <UsersIcon className="h-4 w-4" aria-hidden="true" />
                  Invite
                </button>
              </div>
            )}
          </div>

          <div className="my-10 md:max-w-[80%]">
            <h3 className="font-semibold text-lg mb-3">Description:</h3>
            <p>{oneDeck?.description}</p>
          </div>

          {oneDeck && (oneDeck?.questions?.length || 0) > 0 && (
            <button
              type="button"
              onClick={() => navigate(`/deck/practise/${oneDeck?._id}`)}
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
      <InviteDeckUserModal
        open={openShareModal}
        setClose={closeShareModal}
        data={oneDeck}
      />
    </div>
  );
}
