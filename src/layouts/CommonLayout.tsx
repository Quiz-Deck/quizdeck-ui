import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import NavbarCommon from "../components/navigation/NavbarCommon";
import FooterCommon from "../components/navigation/FooterCommon";
// Pages
import Landing from "../pages/common/Landing";
// import NotFound from "../pages/common/NotFound";
import CreateQuiz from "../pages/dashboard/create";

export default function CommonLayout() {
  return (
    <React.Fragment>
      <main className="relative bg-white min-h-screen">
        <NavbarCommon />
        <section>
          {/* Body */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/admin/create" element={<CreateQuiz />} />
            <Route
              path="/*"
              element={<Navigate to="/landing/not-found" replace />}
            />
          </Routes>
          <FooterCommon />
        </section>
      </main>
    </React.Fragment>
  );
}
