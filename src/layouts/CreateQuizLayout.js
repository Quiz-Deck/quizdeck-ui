import React from "react";
import { Routes, Route } from "react-router-dom";
// import QuizNavbar from "../pages/dashboard/create/Navbar";
// import Explore from "../pages/dashboard/explore/Explore";
import CreateQuiz from "../pages/dashboard/create";
import NavbarDashboard from "../components/navigation/NavbarDashboard";

export default function CreateQuizLayout() {
  return (
    <div className="relative w-full">
      <div className="flex w-full">
        <div className="flex max-w-[300px] w-full px-2 lg:px-0 h-14">
          <div className="flex-shrink-0 flex w-full items-center justify-center py-3">
            <div className="block lg:hidden h-8 w-auto text-primary text-3xl font-bold">
              QuizDeck
            </div>
            <div className="hidden lg:block h-8 w-auto text-primary text-3xl font-bold">
              QuizDeck
            </div>
          </div>
        </div>
        <NavbarDashboard />
      </div>
      <div className="pr-8 mt-6">
        <Routes>
          <Route path="*" exact element={<CreateQuiz />} />
          <Route path="/:page" element={<CreateQuiz />} />
        </Routes>
      </div>
    </div>
  );
}
