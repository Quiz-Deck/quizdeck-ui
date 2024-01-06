import React from "react";
import { useNavigate } from "react-router-dom";
import Dummy from "../../../assets/images/rectangle.jpg";

export default function Question() {
  const navigate = useNavigate();
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
              <h3 className="text-2xl font-semibold mb-2">Quiz name</h3>
              <div className="flex justify-between pb-2">
                <p className="text-sm font-semibold">25 Questions</p>
                <p className="text-sm font-semibold">15 mins</p>
              </div>
              <p className="text-xs">125 plays</p>
            </div>

            <div className="flex justify-between items-center pb-2 gap-2">
              <img
                src={Dummy}
                alt="Avatar"
                className="h-[52px] w-[52px] object-cover rounded-full"
              />
              <p className="text-sm">Author’s Name</p>
              <div className="bg-[#126CD6] w-[8px] h-[8px] rounded-full" />
              <p className="text-sm">1 week ago</p>
            </div>
          </div>
        </div>
        <div className="px-2 flex flex-col justify-between">
          <div className="flex justify-between pb-2 gap-2">
            <p className="text-sm"> 61 Likes</p>
            <p className="text-sm">Save</p>
          </div>
          <p className="text-sm text-right">Share</p>
        </div>
      </div>

      <div className="my-10 md:max-w-[80%]">
        <h3 className="font-semibold text-lg mb-3">Description:</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate("/quiz/20")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary focus:outline-none"
      >
        Take Quiz
      </button>
    </div>
  );
}
