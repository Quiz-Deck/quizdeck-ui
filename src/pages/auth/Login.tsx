import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/buttons";
import SocialLogin from "./SocialLogin";
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
        console.log("user", res);

        // successHandler(res, true);
        navigate("/dashboard/explore");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-[350px] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-2xl">Login</h2>
        <a href="/auth/register" className="text-primary">
          Sign up
        </a>
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
          <a href="/auth/register" className="text-primary">
            Sign up
          </a>
        </div>
      </form>

      <div className="flex gap-8 items-center my-12">
        <div className="border border-t border-[#D0D0D0] w-full" />
        <span className="text-[#D0D0D0]">OR</span>
        <div className="border border-t border-[#D0D0D0] w-full" />
      </div>

      <SocialLogin />
    </div>
  );
};

export default Login;
function successHandler(response: any, arg1: boolean) {
  throw new Error("Function not implemented.");
}
