import React, { useState } from "react";
import moment from "moment";
// import { useLocation } from "react-router-dom";
import NavbarDashboard from "components/navigation/NavbarDashboard";
import DraftQuiz from "./components/Draft";
import SharedQuiz from "./components/Shared";
import PublishedQuiz from "./components/Published";

interface TimeAgoProps {
  time: string; // Accepts a string representation of the time
}

export const TimeAgo: React.FC<TimeAgoProps> = ({ time }) => {
  const timeAgo = moment(time).fromNow(); // Calculate the time difference
  return <span>{timeAgo}</span>; // Display the calculated time difference
};

const tabs = [
  {
    title: "Published",
    href: "published",
  },
  {
    title: "Draft",
    href: "draft",
  },
  {
    title: "Shared with me",
    href: "shared",
  },
];
export default function MyLibrary() {
  const [active_tab, setActiveTab] = useState("published");

  return (
    <div>
      <NavbarDashboard />
      <div className="pt-5 mb-6">
        <h2 className="text-2xl font-semibold">My Library</h2>
        <nav className="flex items-center gap-3 rounded-[2rem] py-4 h-[60px] mb-4">
          {tabs?.length > 0 &&
            tabs?.map((tab, index) => (
              <div
                key={index}
                className={`${
                  active_tab === tab?.href
                    ? "text-white bg-primary btn-shadow font-semibold"
                    : "text-[#84848E] bg-[#F3F3F6]"
                } rounded-[10px] px-6 h-[32px] text-[14px] flex items-center justify-center gap-1 cursor-pointer`}
                onClick={() => setActiveTab(tab?.href)}
              >
                <p>
                  {tab?.href === "referrals" ? `${tab?.title}` : tab?.title}
                </p>
              </div>
            ))}
        </nav>
      </div>

      {active_tab === "published" && <PublishedQuiz />}
      {active_tab === "draft" && <DraftQuiz />}
      {active_tab === "shared" && <SharedQuiz />}
    </div>
  );
}
