import React from "react";
import Create1 from "assets/images/landing/create-1.png";
import Create2 from "assets/images/landing/create-2.png";
import Create3 from "assets/images/landing/create-3.png";
import Create4 from "assets/images/landing/create-4.png";

export default function Categories() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-[48px]">
            Create Quiz faster & Easier
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-2 justify-between gap-8">
            {/* Grid 1 */}
            <div className="bg-[#DFDFDF] rounded-[50px] px-12 py-8">
              <p className="text-[#1F1F1F] text-[40px] leading-tight mb-12">
                Upload a document, and our AI will assist you in quiz creation.
              </p>
              <div className="py-20 px-8 bg-white rounded-[32px]">
                <img src={Create1} alt="" />
              </div>
            </div>
            {/* Grid 2 */}
            <div className="h-full flex flex-col gap-5 flex-auto">
              <div className="bg-primary rounded-[50px] px-12 py-8">
                <p className="text-white text-[40px] leading-tight mb-12">
                  Generate quizzes from your chosen topic.
                </p>
                <img src={Create2} className='mb-3' alt="" />
                <img src={Create3} alt="" />
              </div>
              <div className="bg-[#885AF2] rounded-[50px] px-12 py-8">
                <p className="text-white text-[40px] leading-tight mb-12">
                  Create a quiz using audio.
                </p>
                <img src={Create4} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
