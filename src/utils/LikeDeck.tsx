import React, { useState } from "react";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import errorHandler from "handlers/errorHandler";
import { useLikeSingleDeckMutation } from "features/api/deck/deckApi";

interface Props {
  id: string;
  data: any;
}

export const LikeDeck = ({ id, data }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeSingleDeck] = useLikeSingleDeckMutation();
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
  return (
    <button
      type="button"
      className={`like-button ${isLiked ? "active" : ""}`}
      onClick={() => {
        toggleLiked();
        handleLike(id || "");
      }}
    >
      {data?.userLiked ? (
        <SolidHeart className="h-4 w-4" aria-hidden="true" />
      ) : (
        <HeartIcon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
};
