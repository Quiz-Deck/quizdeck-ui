import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CreateQuiz from "../pages/dashboard/create";
import Logo from "../assets/icons/logo-black.png";
import CreateDeckQuestions from "pages/dashboard/create/AddDeckQuestions";
import NavbarDashboard from "../components/navigation/NavbarDashboard";

export default function CreateQuizLayout() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <div
        className="border-b border-[#FFFFFF1A] "
        style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
      >
        <div className="flex w-full max-w-7xl mx-auto">
          <div className="h-14 cursor-pointer">
            <div
              onClick={() => navigate("/dashboard/explore")}
              className="flex-shrink-0 flex w-full items-center justify-center py-3"
            >
              <div className="block lg:hidden h-8 w-auto text-primary text-3xl font-bold">
                <img src={Logo} alt="Logo" className="max-w-[150px]" />
              </div>
              <div className="hidden lg:block h-8 w-auto text-primary text-3xl font-bold">
                <img src={Logo} alt="Logo" className="max-w-[150px]" />
              </div>
            </div>
          </div>
          <NavbarDashboard />
        </div>
      </div>

      <div className="mt-6">
        <Routes>
          <Route path="*" element={<CreateQuiz />} />
          <Route path="/:id" element={<CreateDeckQuestions />} />
        </Routes>
      </div>
    </div>
  );
}
