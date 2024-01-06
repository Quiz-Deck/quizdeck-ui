import React from "react";
import { useNavigate } from "react-router-dom";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const menuItems = [
  { name: "Quiz description", icon: "", href: "details" },
  { name: "Quiz time", icon: "", href: "time" },
];
const SettingsMenu: React.FC<CreateQuizProps> = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default SettingsMenu;
