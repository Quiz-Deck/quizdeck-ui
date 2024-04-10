import React, { useState } from "react";
import { ReactComponent as Plus } from "assets/icons/plus.svg";

// Explicitly import the types for JSX
type CreateQuizProps = {
  setView: (e: string) => void;
};

const menuItems = [
  {
    name: "Multiple Choice",
    icon: "",
    href: "multiple-choice",
    type: "MULTI_CHOICE",
  },
  {
    name: "QNA",
    icon: "",
    href: "qna",
    type: "QNA",
  },
];

const QuestionsMenu: React.FC<CreateQuizProps> = ({ setView }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-primary p-2 my-4 w-fit rounded-md">
      {showMenu ? (
        <ul className="flex gap-4 items-center">
          <button onClick={() => setShowMenu(false)} className="text-white">
            <Plus className="w-[20px] h-[20px] fill-[#ffffff]" />
          </button>
          {menuItems?.length > 0 &&
            menuItems.map((menu, index) => (
              <li
                key={index + menu?.name}
                className="px-3 py-2 bg-white hover:bg-[#fafaff] hover:shadow-md rounded-md cursor-pointer"
                onClick={() => {
                  setView(menu?.href);
                  setShowMenu(false);
                }}
              >
                {menu?.name}
              </li>
            ))}
        </ul>
      ) : (
        <button onClick={() => setShowMenu(true)} className="text-white flex gap-3 items-center px-2">
          <Plus className="w-[16px] h-[16px] fill-[#ffffff]" /> Add New
          Question
        </button>
      )}
    </div>
  );
};

export default QuestionsMenu;
