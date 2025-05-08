import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
// import Rings from "../assets/decorations/auth-rings.svg";
import Curve from "assets/decorations/curve.svg";
import { ReactComponent as Spirals } from "assets/decorations/spirals.svg";
import Question from "assets/decorations/question-mark.png";

export default function AuthLayout() {
  return (
    <div className="relative p-5 flex items-center w-full h-screen bg-primary">
      <div className="w-full max-w-[920px] mx-auto">
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <img
          src={Curve}
          alt="design"
          className="absolute left-0 bottom-[40%]"
        />

        <img
          src={Question}
          alt="design"
          className="h-130px] w-[130px] absolute right-[8%] top-[10%]"
        />

        <Spirals className="absolute right-[4%] bottom-[20%] w-[92px] h-[92px]" />
      </div>
    </div>
  );
}
