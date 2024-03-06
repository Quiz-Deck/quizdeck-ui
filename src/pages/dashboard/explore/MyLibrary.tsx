import React from "react";
import Dummy from "../../../assets/images/rectangle.jpg";
import { useGetUserDeckQuery } from "../../../features/api/deck/deckSlice";

export default function MyLibrary() {
  const { data, error, isLoading } = useGetUserDeckQuery();

  console.log("data", data);

  return (
    <div>
      <div className="mt-10 mb-6">
        <h2 className="text-2xl font-semibold">My Library</h2>
      </div>

      {Array(8)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="border border-[#D6E4FD] rounded-lg flex justify-between p-3 mb-4"
          >
            <div className="flex gap-3">
              <img
                src={Dummy}
                alt="Dummy"
                className="h-[120px] w-[120px] object-cover rounded-lg"
              />
              <div className="px-2 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Quiz name</h3>
                  <div className="flex justify-between pb-2">
                    <p className="text-sm font-semibold">25 Questions</p>
                    <p className="text-sm font-semibold">15 mins</p>
                    <p className="text-sm font-semibold">125 plays</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 gap-2">
                  <img
                    src={Dummy}
                    alt="Avatar"
                    className="h-[36px] w-[36px] object-cover rounded-full"
                  />
                  <p className="text-sm">Author’s Name</p>
                  <div className="bg-[#126CD6] w-[8px] h-[8px] rounded-full" />
                  <p className="text-sm">1 week ago</p>
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="flex justify-between bg-[#126CD626] px-3 py-1 rounded-full">
                <span className="text-xs text-primary"> Published</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
