import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { _getUser } from "utils/Auth";
import PageLoader from "utils/PageLoader";
import Button from "components/button/buttons";
import Placeholder from "../../../assets/images/quiz-default1.jpeg";
// import Avatar from "../../../assets/images/rectangle.jpg";
import Logo from "../../../assets/icons/logo.png";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  ClockIcon,
  HeartIcon,
  PlayIcon,
  // UsersIcon,
} from "@heroicons/react/24/outline";
import errorHandler from "handlers/errorHandler";
import { DeleteDeckModal } from "components/modals/DeleteDeckModal";
import { InviteDeckUserModal } from "components/modals/InviteDeckUserModal";
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

  return (
    <div>
      <div
        className="border-b border-[#FFFFFF1A] py-4 mb-10"
        style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
      >
        <div className="w-full max-w-7xl mx-auto">
          <div onClick={() => navigate("/dashboard/explore")} className="py-1">
            <div className="block lg:hidden h-8 w-auto text-primary text-3xl font-bold">
              <img src={Logo} alt="Logo" className="max-w-[150px]" />
            </div>
            <div className="hidden lg:block h-8 w-auto text-primary text-3xl font-bold">
              <img src={Logo} alt="Logo" className="max-w-[150px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-3">
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium mb-5 flex items-center gap-2"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          {"Back"}
        </button>

        {isLoading ? (
          <div className="h-screen w-full flex items-center justify-center">
            <PageLoader />
          </div>
        ) : (
          <Fragment>
            {/* <div className="border border-[#D6E4FD] rounded-lg flex justify-between p-3">
              {user?.data?._id === data?.data?.createdBy?._id && (
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
                </div>
              )}
            </div> */}

            {/* new */}
            <div className="mb-12 bg-[#F3EFFC] border border-[#FFFFFF33] rounded-[10px] px-3 py-4 sm:px-5 sm:py-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-8">
                <div className="flex items-start gap-4">
                  <figure>
                    <img
                      src={Placeholder}
                      alt="Placeholder"
                      className="w-[100px] h-[95px] sm:w-[164px] sm:h-[133px] rounded-[5px] border border-white object-cover"
                    />
                  </figure>

                  <div>
                    <div
                      className={`flex justify-between px-3 py-0.5 rounded-full bg-primary200 w-fit`}
                    >
                      <span className={`text-xs text-[#84848E] capitalize`}>
                        {data?.data?.type}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold my-2">
                      {data?.data?.title}
                    </h2>
                    <h2>{data?.data?.description}</h2>

                    <div className="flex justify-between items-center gap-3 mt-5">
                      <div className="flex justify-between gap-3">
                        <p className="text-sm font-semibold text-primary">
                          {data?.data?.questions?.length} Questions
                        </p>

                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" aria-hidden="true" />
                          <p className="text-sm font-semibold">
                            {data?.data?.timer && data?.data?.timer > 0
                              ? Math.floor(Number(data?.data?.timer) / 60) +
                                " mins"
                              : "No timer"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <PlayIcon className="h-4 w-4" aria-hidden="true" />
                        <p className="text-xs">{data?.data?.playCount}</p>
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
                            <SolidHeart
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          ) : (
                            <HeartIcon className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>

                        <p className="text-xs">{data?.data?.likeCount}</p>
                      </div>
                    </div>

                    {/* <div className="flex justify-between items-center pb-2 gap-2">
                        <img
                          src={Avatar}
                          alt="Avatar"
                          className="h-[36px] w-[36px] object-cover rounded-full"
                        />
                        <p className="text-sm">
                          {data?.data?.createdBy?.userName}
                        </p>
                        <div className="bg-[#126CD6] w-[8px] h-[8px] rounded-full" />
                        <p className="text-sm">
                          {<TimeAgo time={data?.data?.createdOn} />}
                        </p>
                      </div> */}
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  {user?.data?._id === data?.data?.createdBy?._id && (
                    <button
                      type="button"
                      onClick={() => setOpenShareModal(true)}
                      style={{ borderRadius: "50px" }}
                      className="px-8 outline-none flex w-fit bg-[#E0D4FC] px-3 py-1 text-primary"
                    >
                      Invite
                    </button>
                  )}

                  {user?.data?._id === data?.data?.createdBy?._id && (
                    <button
                      type="button"
                      onClick={() => navigate(`/deck/create/${id}`)}
                      style={{ borderRadius: "50px" }}
                      className="px-8 outline-none flex w-fit bg-[#E0D4FC] px-3 py-1 text-primary"
                    >
                      Edit
                    </button>
                  )}

                  {data?.data && data?.data?.questions?.length > 0 && (
                    <Button.Primary
                      title={"Take Quiz"}
                      className="px-8 outline-none"
                      style={{ borderRadius: "50px" }}
                      onClick={() =>
                        navigate(`/deck/practise/${data?.data?._id}`)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>

      <DeleteDeckModal
        open={openModal}
        setClose={closeModal}
        deck_id={id || ""}
      />
      <InviteDeckUserModal
        open={openShareModal}
        setClose={closeShareModal}
        data={data?.data}
      />
    </div>
  );
}
