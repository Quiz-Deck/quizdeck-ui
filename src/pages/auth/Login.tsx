import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "components/input/TextInput";
import Button from "../../components/button/buttons";
import { ReactComponent as Waving } from "assets/icons/waving_hand_emoji.svg";
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
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-white mb-12"
      >
        Go Back
      </button>
      <div className="flex justify-center items-center gap-2 mb-10">
        <Waving className="h-[36px]" />
        <h2 className="font-bold text-white text-[2rem]">
          We are glad to have you back
        </h2>
      </div>

      <div className="border border-white rounded-[50px] py-12 ">
        <form className="px-8">
          <TextInput
            title={"Email address"}
            placeholder={"Enter email address here"}
            name="email"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          />
          <TextInput
            title={"Password"}
            placeholder={"Enter password here"}
            name="password"
            autoComplete="off"
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
        <span className="text-white">Don't have an account?</span>{" "}
        <a href="/auth/register" className="text-secondary">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;
