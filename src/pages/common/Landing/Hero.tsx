import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/buttons";
import Curve from "assets/decorations/curve.svg";
import Question from "assets/decorations/question-mark.png";
import LeftImg from "assets/images/landing/hero-left.png";
import RightImg from "assets/images/landing/hero-right.png";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <div className="max-w-7xl mx-auto bg-white flex flex-col sm:flex-row justify-center items-center min-h-[75vh] relative">
        <div className="pb-8 sm:pb-16 md:pb-20 lg:max-w-[730px] lg:w-full lg:pb-24 xl:pb-24">
          <div className="mt-4 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-20">
            <div className="sm:text-center mt-16 sm:mt-3">
              <h1 className="text-[50px] sm:text-[64px] text-[#0A0A0B] tracking-tight mb-6 sm:mb-10 font-bold">
                <span className="block xl:inline">
                  Have fun studying with engaging quizzes!
                </span>
              </h1>
              <p className="mt-3 text-base sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Explore, Create, and Share Questions on Quiryfy. Craft your quiz
                or let our AI do the heavy lifting. Your journey starts here.
              </p>
              <div className="mt-5 sm:mt-8 flex justify-center">
                <Button.Primary
                  title={"Get started"}
                  className="rounded-full px-7 py-2 h-[50px]"
                  style={{ borderRadius: "50px" }}
                  onClick={() => navigate("/auth/register")}
                />
              </div>
            </div>
          </div>
        </div>
        <img
          src={LeftImg}
          alt="design"
          className="absolute left-0 top-[10%] h-[200px] w-[200px]"
        />
        <img
          src={RightImg}
          alt="design"
          className="absolute right-0 bottom-[10%] h-[200px] w-[200px]"
        />
      </div>

      {/* Background design images */}
      <img src={Curve} alt="design" className="absolute left-0 bottom-[10%]" />
      <img
        src={Question}
        alt="design"
        className="h-[130px] w-[130px] absolute right-[8%] top-[10%]"
      />
    </div>
  );
}
