import React from "react";
import { useNavigate } from "react-router-dom";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const menuItems = [
  { name: "Multiple Choice", icon: "", href: "multiple-choice" },
  { name: "Poll", icon: "", href: "" },
  { name: "Fill-in-the-blank", icon: "", href: "" },
  { name: "Open-ended", icon: "", href: "" },
];

const QuestionsMenu: React.FC<CreateQuizProps> = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-3 text-center">
        <h2 className="mb-1 text-lg">Add Questions</h2>
        <p className="text-sm">
          Which type of questions would you like to set?
        </p>
      </div>
      <ul>
        {menuItems?.length > 0 &&
          menuItems.map((menu, index) => (
            <li
              key={index + menu?.name}
              className="p-3 hover:bg-white hover:shadow-md rounded-md"
              onClick={() => navigate(`/dashboard/create/${menu?.href}`)}
            >
              {menu?.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default QuestionsMenu;
