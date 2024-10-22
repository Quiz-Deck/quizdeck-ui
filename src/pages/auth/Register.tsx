import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "components/input/TextInput";
import Button from "../../components/button/buttons";
import errorHandler from "handlers/errorHandler";
import SocialLogin from "./SocialLogin";
import { ReactComponent as MailIcon } from "assets/icons/mail-filled.svg";
import { ReactComponent as Waving } from "assets/icons/waving_hand_emoji.svg";
import { useSignUpMutation } from "../../features/api/authSlice";

const Register = (): JSX.Element => {
  const [view, setView] = useState("welcome");
  return (
    <>
      {view === "welcome" && (
        <div>
          <div className="flex justify-center items-center gap-2 mb-8">
            <Waving className="h-[36px]" />
            <h2 className="font-bold text-white text-[40px]">Welcome!</h2>
          </div>

          <div className="border border-white rounded-[50px] py-10 ">
            <p className="text-xl text-center text-white mb-8">
              Create an account in few steps
            </p>

            <div className="max-w-[350px] mx-auto">
              <SocialLogin />

              <button
                type="button"
                onClick={() => setView("register")}
                className="w-full flex items-center justify-between border border-white h-[65px] rounded-[50px] px-5 mt-5"
              >
                <span className="text-lg text-white">Sign up with Email</span>
                <MailIcon className="w-[24px] h-[24px] " />
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-6">
            <span className="text-white">I Already have an account</span>{" "}
            <a href="/auth/login" className="text-secondary">
              Login
            </a>
          </div>
        </div>
      )}
      {view === "register" && <RegistrationForm setView={setView} />}
    </>
  );
};

export default Register;

const RegistrationForm = ({ setView }: any) => {
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
    <div>
      <button
        type="button"
        onClick={() => setView("welcome")}
        className="text-white mb-12"
      >
        Go Back
      </button>
      <div className="flex justify-center items-center gap-2 mb-10">
        <Waving className="h-[36px]" />
        <h2 className="font-bold text-white text-[2rem]">Sign up with Email</h2>
      </div>

      <div className="border border-white rounded-[50px] py-12 ">
        <form className="px-8">
          <TextInput
            title={"Tell us your first  & last name"}
            placeholder={"Enter your names here"}
            name="userName"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          />
          <TextInput
            title={"What’s your email address"}
            placeholder={"Enter email address here"}
            name="email"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          />
          <TextInput
            title={"Password"}
            placeholder={"Enter password here"}
            name="password"
            onChange={(e: any) => handleChange(e)}
          />

          <div className="flex justify-center items-center mt-10">
            <Button.White
              title={"Get Started"}
              className="h-[55px] min-w-[160px] px-5 text-lg"
              style={{ borderRadius: "50px" }}
              onClick={handleSubmit}
              loading={isLoading}
            />
          </div>
        </form>
      </div>

      <div className="flex justify-center gap-1 mt-6">
        <span className="text-white">I Already have an account</span>{" "}
        <a href="/auth/login" className="text-secondary">
          Login
        </a>
      </div>
    </div>
  );
};
