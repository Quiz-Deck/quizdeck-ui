import * as React from "react";

const SocialLogin = (): JSX.Element => {
  return (
    <div className="max-w-[350px] mx-auto">
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
