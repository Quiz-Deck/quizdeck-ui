import React, { useState } from "react";

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
        <ul className="flex gap-4">
          {menuItems?.length > 0 &&
            menuItems.map((menu, index) => (
              <li
                key={index + menu?.name}
                className="p-3 hover:bg-white hover:shadow-md rounded-md"
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
        <button onClick={() => setShowMenu(true)} className="text-white">
          {" "}
          + Add New Question
        </button>
      )}
    </div>
  );
};

export default QuestionsMenu;
