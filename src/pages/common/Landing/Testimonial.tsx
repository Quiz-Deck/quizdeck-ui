import React from "react";
import HeroImg from "../../../assets/images/landing/hero-right.svg";

export default function Testimonial() {
  return (
    <div className="py-12 bg-white max-w-7xl mx-auto  bg-white flex items-center">
      <div className="px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Transactions
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What they say?
          </p>
        </div>

        <div className="mt-10">
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={HeroImg} className="h-full w-full" alt="" />
      </div>
    </div>
  );
}
