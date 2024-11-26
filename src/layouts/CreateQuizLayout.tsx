import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Button from "../components/button/buttons";
import CreateQuiz from "../pages/dashboard/create";
// import Logo from "../assets/icons/logo-black.png";
// import Logo from "../assets/icons/logo.png";
import CreateDeckQuestions from "pages/dashboard/create/AddDeckQuestions";

export default function CreateQuizLayout() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <div className="mt-6">
        <Routes>
          <Route path="*" element={<CreateQuiz />} />
          <Route path="/:id" element={<CreateDeckQuestions />} />
        </Routes>
      </div>
    </div>
  );
}
