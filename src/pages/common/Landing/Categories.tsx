import React from "react";

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
            <div className="bg-[#DFDFDF] rounded-[50px]">
              <p className="text-white">
                Upload a document, and our AI will assist you in quiz creation.
              </p>
              <img />
            </div>
            {/* Grid 2 */}
            <div>
              <div className="bg-primary rounded-[50px]">
                <p className="text-white">
                  Generate quizzes from your chosen topic.
                </p>
                <img />
                <img />
              </div>
              <div className="bg-[#885AF2] rounded-[50px]">
                <p className="text-white">Create a quiz using audio.</p>
                <img />
                <img />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
