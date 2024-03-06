import React from "react";
import { useNavigate } from "react-router-dom";
import Dummy from "../../../assets/images/rectangle.jpg";
import { useGetPublicDecksQuery } from "../../../features/api/deck/deckSlice";

// const data = [
//   {
//     title: "Algebra",
//     questions: 10,
//     plays: 10000,
//   },
//   {
//     title: "Algebra",
//     questions: 10,
//     plays: 10000,
//   },
//   {
//     title: "Algebra",
//     questions: 10,
//     plays: 10000,
//   },
//   {
//     title: "Algebra",
//     questions: 10,
//     plays: 10000,
//   },
//   {
//     title: "Algebra",
//     questions: 10,
//     plays: 10000,
//   },
// ];
export default function Explore() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPublicDecksQuery();

  console.log("data", data);
  return (
    <div>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold">Popular Quiz</h3>
          {/* <a href="/" className="text-primary">
            View more
          </a> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data?.data &&
            data?.data?.length > 0 &&
            data?.data.slice(0, 4).map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/dashboard/question/${item?._id}`)}
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
      </div>
    </div>
  );
}
