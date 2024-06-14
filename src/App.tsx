import React from "react";

// Toasts Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store";
import { isAuthenticatedUser } from "utils/Auth";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import CommonLayout from "./layouts/CommonLayout";
import CreateQuizLayout from "./layouts/CreateQuizLayout";
import QuizTaker from "./pages/quiz/index";
import PrivateRoute from "utils/privateRoute";

function App() {
  const isAuth = isAuthenticatedUser();
  return (
    <Provider store={store}>
      {/* <Provider> */}
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
        />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<CommonLayout />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            />
            <Route
              path="/deck/create/*"
              element={
                <PrivateRoute>
                  <CreateQuizLayout />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                isAuth ? <Navigate to="/dashboard/explore" /> : <CommonLayout />
              }
            />
           
            <Route path="/deck/practise/:id" element={<QuizTaker />} />
          </Routes>
        </BrowserRouter>
      </>
    </Provider>
  );
}

export default App;
