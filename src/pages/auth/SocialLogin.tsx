import * as React from "react";
import { ReactComponent as GoogleIcon } from "assets/icons/google.svg";

const SocialLogin = (): JSX.Element => {
  return (
    <form className="max-w-[350px] mx-auto w-full">
      <button
        type="button"
        className="w-full flex items-center justify-between border border-white h-[65px] rounded-[50px] px-5"
      >
        <span className="text-lg text-white">Sign up with Google</span>
        <GoogleIcon className="w-[24px] h-[24px] " />
      </button>
      {/* <button className="border border-[#D0D0D0] rounded-md p-3 mb-6 w-full text-[#505050] font-bold">
          Facebook
        </button> */}
    </form>
  );
};

export default SocialLogin;
