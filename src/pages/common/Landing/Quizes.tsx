import React from "react";
import { useNavigate } from "react-router-dom";
import Girl from "../../../assets/images/landing/girl.png";
import Dummy from "../../../assets/images/quiz-default1.jpeg";
// import { ReactComponent as Wavy } from "../../../assets/decorations/wavy-lines.svg";
import { useGetPublicDecksQuery } from "features/api/deck/deckApi";
import PageLoader from "utils/PageLoader";

export default function Quizes() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPublicDecksQuery();
  return (
    <div className="py-12 bg-white relative mb-8">
      {/* <Wavy className="absolute" /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Most popular quizzes
          </p>
        </div>

        <div className="mt-10">
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
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
