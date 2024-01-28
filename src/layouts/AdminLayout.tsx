import React from "react";
import { Routes, Route } from "react-router-dom";
import Explore from "../pages/dashboard/explore/Explore";
import Question from "../pages/dashboard/explore/Question";
import MyLibrary from "../pages/dashboard/explore/MyLibrary";
import NavbarDashboard from "../components/navigation/NavbarDashboard";
import SidenavDashboard from "../components/navigation/SidenavDashboard";

export default function AdminLayout() {
  return (
    <div className="relative">
      <SidenavDashboard />
      <div className="w-full xl:w-[95%] flex-auto sm:pl-[340px]">
        <NavbarDashboard />
        <div className="pr-8 mt-6">
          <Routes>
            <Route path="*" exact element={<Explore />} />
            <Route path="/explore" exact element={<Explore />} />
            <Route path="/question/:id" exact element={<Question />} />
            <Route path="/my-library" exact element={<MyLibrary />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
