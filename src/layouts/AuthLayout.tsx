import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Rings from "../assets/decorations/auth-rings.svg";
import Girl from "../assets/images/auth/girl.png";

export default function AuthLayout() {
  return (
    <div className="p-5 flex items-center w-full h-screen">
      <div className="grid grid-cols-2 items-center w-full">
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <div
          className="bg-primary rounded-2xl px-5 py-10 bg-no-repeat bg-left-bottom max-w-[720px]"
          style={{ backgroundImage: `url(${Rings}) ` }}
        >
          <div className="max-w-[600px] mx-auto glass px-8 pt-10 flex flex-col justify-between items-end flex-wrap">
            <h3 className="text-white text-[45px] font-medium">
              Start your journey by one click, explore beautiful world!
            </h3>
            <img src={Girl} alt="girl" />
          </div>
        </div>
      </div>
    </div>
  );
}
