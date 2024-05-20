import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/buttons";
import errorHandler from "handlers/errorHandler";
// import successHandler from "handlers/successHandler";
import { useSignUpMutation } from "../../features/api/authSlice";

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "", userName: "" });

  const [registerUser, { isLoading }] = useSignUpMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    registerUser(data)
      .unwrap()
      .then((res) => {
        // successHandler(res, true);
        navigate("/auth/login");
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

  return (
    <div className="max-w-[350px] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-2xl">Sign up</h2>
        <a href="/auth/login" className="text-primary">
          Login
        </a>
      </div>
      <form>
        <Input.Label
          title={""}
          placeholder={"Enter your username"}
          name="userName"
          className="rounded-md"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        <Input.Label
          title={""}
          placeholder={"Enter your email"}
          name="email"
          className="rounded-md"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        <Input.Password
          title={""}
          placeholder={"Password"}
          name="password"
          className="rounded-md"
          onChange={(e: any) => handleChange(e)}
        />

        <Button.Primary
          title={"Sign Up"}
          className="w-full mt-4"
          onClick={handleSubmit}
          loading={isLoading}
        />
        <div className="flex gap-1 mt-6">
          <span>Already have an account?</span>{" "}
          <a href="/auth/login" className="text-primary">
            Sign in
          </a>
        </div>
      </form>

      {/* <SocialLogin /> */}
    </div>
  );
};

export default Register;
