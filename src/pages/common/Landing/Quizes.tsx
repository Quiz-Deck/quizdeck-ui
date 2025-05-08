import React from "react";
import PageLoader from "utils/PageLoader";
import { useNavigate } from "react-router-dom";
import Button from "components/button/buttons";
import Dummy from "assets/images/quiz-default1.jpeg";
import { useGetPublicDecksQuery } from "features/api/deck/deckApi";
import { HeartIcon, PlayIcon } from "@heroicons/react/24/outline";

import { ReactComponent as StarOutline } from "assets/icons/star-outline.svg";

export default function Quizes() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPublicDecksQuery("1");
  return (
    <div className="py-20 bg-white relative mb-8">
      {/* <Wavy className="absolute" /> */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 items-center">
            <div>
              <h2 className="mt-2 mb-8 text-[70px] font-extrabold tracking-tight text-primary capitalize">
                Ready, Set, Go!
              </h2>
              <p className="max-w-[540px] text-lg">
                It's Time to Unleash Your Full Potential.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/auth/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primaryDark md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <img src={Girl} alt="girl" className="max-h-[480px]" />
            </div>
          </dl>
        </div>
      </div> */}

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-center items-center text-center w-full">
          <p className="mt-2 text-3xl leading-8 font-semibold text-[#0A0A0B] sm:text-[48px]">
            Start quiz from our range of templates
          </p>
        </div>

        <div className="mt-16">
          {/* <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-10"> */}
          <dl>
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <PageLoader />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data?.data &&
                  data?.data?.length > 0 &&
                  data?.data?.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/deck/practise/${item?._id}`)}
                      className="bg-[#F4F2F7] rounded-[50px] cursor-pointer"
                    >
                      <img
                        src={Dummy}
                        alt="Dummy"
                        className="h-[250px] w-full object-cover rounded-t-[50px]"
                      />
                      <div className="px-5 py-8">
                        <h3 className="text-[1.5rem] mb-2">{item?.title}</h3>

                        <div className="flex justify-between pb-8">
                          <div className="flex items-center gap-2">
                            <StarOutline className="w-[18px] h-[18px]" />
                            <p className="text-base text-[#5B5B63]">
                              {item.questions?.length} Questions
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <HeartIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                              <p className="text-base text-[#5B5B63]">
                                {item.likeCount}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <PlayIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                              <p className="text-base text-[#5B5B63]">
                                {item.playCount}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button.Secondary
                          title={"Start Quiz"}
                          className="rounded-full px-7 py-2 h-[50px]"
                          style={{ borderRadius: "50px" }}
                          onClick={() =>
                            navigate(`/deck/practise/${item?._id}`)
                          }
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </dl>

          <div className="text-center mt-12">
            <a className="text-primary underline text-[2rem]" href="/">
              Explore other quizzes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
