import React from "react";
import HeroImg from "../../../assets/images/landing/hero-right.svg";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto bg-white flex flex-col sm:flex-row items-center">
      <div className="pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-24 xl:pb-24">
        <div className="mt-4 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-20">
          <div className="sm:text-center lg:text-left mt-16 sm:mt-3">
            <p className="mb-4 sm:mb-8 text-base sm:text-lg text-[#444444] sm:max-w-xl sm:mt-5 md:mt-5 sm:mx-auto lg:mx-0">
              Create and Learn with Our AI-powered Quiz Platform
            </p>
            <h1 className="text-[50px] sm:text-[60px] text-primary tracking-tight mb-6 sm:mb-10 font-extrabold">
              <span className="block xl:inline">
                Discover Yourself with Personalized Quizzes!
              </span>
            </h1>
            <p className="mt-3 text-base sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Dive into the world of knowledge exploration with our innovative
              quiz app. Whether you want to craft your own quiz or let our AI
              generate one for you, we've got you.
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
        </div>
      </div>

      <div className="flex justify-center">
        <img src={HeroImg} className="h-full w-full" alt="" />
      </div>
    </div>
  );
}
