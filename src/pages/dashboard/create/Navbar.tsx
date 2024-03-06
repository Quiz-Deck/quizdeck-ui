import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import QuestionsMenu from "./QuestionsMenu";

const tabs = [
  { name: "Settings", href: "settings" },
  { name: "Questions", href: "questions" },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  setView: (e: string) => void;
}

const QuizNavbar: React.FC<Props> = ({ setView }) => {
  // const navigate = useNavigate();
  const [active_tab, setActiveTab] = useState("settings");

  const toggle = (tab: any) => {
    if (active_tab !== tab) {
      setActiveTab(tab.href);
    }
  };
  return (
    <div className="bg-[#D9D9D9] w-full rounded-md min-h-[70vh]">
      <div className="mb-4">
        <nav className="-mb-px flex gap-2 justify-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                toggle(tab);
              }}
              className={classNames(
                tab.href === active_tab
                  ? "border-primary bg-primary text-white font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center w-full rounded-t-md"
              )}
              aria-current={tab.href === active_tab ? "page" : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-5 px-4">
        {active_tab === "settings" && <SettingsMenu setView={setView} />}
        {active_tab === "questions" && <QuestionsMenu setView={setView} />}
      </div>
    </div>
  );
};

export default QuizNavbar;
