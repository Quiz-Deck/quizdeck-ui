import React from "react";

const streaks = [
  {
    icon: "",
    description: "Win daily Streaks that can earn you credits",
  },
  {
    icon: "",
    description: "Become a star based on your performance",
  },
  {
    icon: "",
    description: "Gain badges for every stage",
  },
];
export default function Testimonial() {
  return (
    <div className="bg-[#F2F0F6] w-full">
      <div className="max-w-7xl mx-auto py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-[48px]">
              Great Stuff to keep you going
            </p>
          </div>
          <div className="mt-10 text-center">
            {streaks &&
              streaks.map((streak, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-auto items-center gap-4 py-6 px-10 rounded-[10px] border-2 border-transparent hover:border-primary"
                >
                  <div className="w-64">
                    <img alt="" />
                  </div>

                  <p className="text-[1.5rem] text-[#323237] text-left flex-1">
                    {streak?.description}
                  </p>
                  <button className="text-primary text-lg">Start Now</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
