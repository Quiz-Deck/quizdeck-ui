import * as React from "react";

const SocialLogin = (): JSX.Element => {
  return (
    <div className="max-w-[350px] mx-auto">
      <div className="flex gap-8 items-center my-12">
        <div className="border border-t border-[#D0D0D0] w-full" />
        <span className="text-[#D0D0D0]">OR</span>
        <div className="border border-t border-[#D0D0D0] w-full" />
      </div>
      
      <form>
        <button className="border border-[#D0D0D0] rounded-md p-3 mb-6 w-full text-[#505050] font-bold">
          Google
        </button>
        <button className="border border-[#D0D0D0] rounded-md p-3 mb-6 w-full text-[#505050] font-bold">
          Facebook
        </button>
      </form>
    </div>
  );
};

export default SocialLogin;
