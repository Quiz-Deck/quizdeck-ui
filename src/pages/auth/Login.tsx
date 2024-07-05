import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/buttons";
// import SocialLogin from "./SocialLogin";
import errorHandler from "handlers/errorHandler";
// import successHandler from "handlers/successHandler";
import { useLogInMutation } from "../../features/api/authSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const [logIn, { isLoading }] = useLogInMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    logIn(data)
      .unwrap()
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        // successHandler(res, true);
        navigate("/dashboard/explore");
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

  return (
    <div className="max-w-[350px] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-2xl">Login</h2>
        <Link to="/auth/register" className="text-primary">
          Sign up
        </Link>
      </div>
      <form>
        <Input.Label
          title={""}
          name="email"
          placeholder={"Enter your email"}
          className="rounded-md"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        <Input.Password
          title={""}
          name="password"
          placeholder={"Password"}
          className="rounded-md"
          onChange={(e: any) => handleChange(e)}
        />
        <Button.Primary
          title={"Login"}
          onClick={handleSubmit}
          className="w-full mt-4"
          loading={isLoading}
        />

        <div className="flex gap-1 mt-6">
          <span>Don't have an account?</span>{" "}
          <Link to="/auth/register" className="text-primary">
            Sign up
          </Link>
        </div>
      </form>

      {/* <SocialLogin /> */}
    </div>
  );
};

export default Login;
