import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/explore/Dashboard";
import MyLibrary from "../pages/dashboard/explore/MyLibrary";
import PublicDecks from 'pages/dashboard/explore/PublicDecks';
// import NavbarDashboard from "../components/navigation/NavbarDashboard";
import SidenavDashboard from "../components/navigation/SidenavDashboard";

export default function AdminLayout() {
  return (
    <div className="relative">
      <SidenavDashboard />
      <div className="w-full lg:w-full xl:w-[95%] flex-auto sm:pl-[340px]">
        {/* <NavbarDashboard /> */}
        <div className="lg:pr-8 px-4">
          <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-library" element={<MyLibrary />} />
            <Route path="/explore" element={<PublicDecks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
