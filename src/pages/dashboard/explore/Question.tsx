import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Button from "components/button/buttons";
import Dummy from "../../../assets/images/rectangle.jpg";
import { EditDeckModal } from "components/modals/EditDeckModal";
import {
  useGetSingleDeckQuery,
  useDeleteSingleDeckMutation,
} from "../../../features/api/deck/deckSlice";

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
  const [open, setOpen] = useState(false);
  const [deleteSingleDeck] = useDeleteSingleDeckMutation();
  const { data, error, isLoading } = useGetSingleDeckQuery(id || "");

  const handleDelete = (id: string) => {
    deleteSingleDeck(id)
      .unwrap()
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log("i am err", err);
        // errorHandler(err?.data?.message || "Something went wrong", true);
      });
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="border border-[#D6E4FD] rounded-lg flex justify-between p-3">
        <div className="flex gap-3">
          <img
            src={Dummy}
            alt="Dummy"
            className="h-[220px] w-[240px] object-cover rounded-lg"
          />
          <div className="px-2 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                {data?.data?.[0]?.title}
              </h3>
              <div className="flex justify-between pb-2">
                <p className="text-sm font-semibold">
                  {data?.data?.[0]?.questions?.length} Questions
                </p>
                <p className="text-sm font-semibold">
                  {data?.data?.[0]?.timer && data?.data?.[0]?.timer > 0
                    ? data?.data?.[0]?.timer
                    : "No timer"}
                </p>
              </div>
              <p className="text-xs">{data?.data?.[0]?.playCount} plays</p>
            </div>

            <div className="flex justify-between items-center pb-2 gap-2">
              <img
                src={Dummy}
                alt="Avatar"
                className="h-[52px] w-[52px] object-cover rounded-full"
              />
              <p className="text-sm">Author’s Name</p>
              <div className="bg-[#126CD6] w-[8px] h-[8px] rounded-full" />
              <p className="text-sm">
                {<TimeAgo time={data?.data?.[0]?.createdOn} />}
              </p>
            </div>
          </div>
        </div>
        <div className="px-2 flex flex-col justify-between">
          <div className="flex justify-between pb-2 gap-2">
            <p className="text-sm"> {data?.data?.[0]?.likeCount} Likes</p>
            <p className="text-sm">Save</p>
          </div>
          <p className="text-sm text-right">Share</p>
        </div>
        <Button.Secondary
          title={"Delete Deck"}
          className="px-8 mt-4"
          onClick={() => handleDelete(id || "")}
        />
        <Button.Primary
          title={"Edit Deck"}
          className="px-8 mt-4"
          onClick={() => openModal()}
        />
      </div>

      <div className="my-10 md:max-w-[80%]">
        <h3 className="font-semibold text-lg mb-3">Description:</h3>
        <p>{data?.data?.[0]?.description}</p>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/deck/practise/${data?.data?.[0]?._id}`)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary focus:outline-none"
      >
        Take Quiz
      </button>

      <EditDeckModal
        open={open}
        setClose={closeModal}
        deck={data?.data && data?.data?.[0]}
      />
    </div>
  );
}
