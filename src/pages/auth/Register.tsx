import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../components/input/Input";
import Button from "../../components/button/buttons";
import SocialLogin from "./SocialLogin";
import { useSignUpMutation } from "../../features/api/authSlice";

const Register = (): JSX.Element => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "", userName: "" });
  const [errMsg, setErr] = useState<string>("");

  const [registerUser, { isLoading }] = useSignUpMutation();
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    registerUser(data)
    .unwrap()
    .then((res)=>{
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res, 'i am the res here')
    })
    .catch((err)=>{
      setErr(err?.data?.message || "Something went wrong")
    })
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
        <p className="error"> {errMsg}</p>
        <Button.Primary
          title={"Sign Up"}
          className="w-full mt-4"
          onClick={handleSubmit}
        />
        <div className="flex gap-1 mt-6">
          <span>Already have an account?</span>{" "}
          <a href="/auth/login" className="text-primary">
            Sign in
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

export default Register;
