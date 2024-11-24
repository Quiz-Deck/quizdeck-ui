import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/buttons";
import { ReactComponent as Bulb } from "assets/decorations/light-bulb.svg";

export default function UserGroups() {
  const navigate = useNavigate();
  return (
    <div className="py-20 bg-[#F5F0FF] relative mb-8">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-center items-center text-center w-full">
          <p className="mt-2 text-3xl leading-8 font-semibold text-[#0A0A0B] sm:text-[48px]">
            We have made quirify for
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-primary rounded-[50px] grid grid-cols-2 items-center gap-8 py-20 px-12">
            <div>
              <label className="block text-lg text-white px-4 bg-[#FFFFFF1A] rounded-[50px] w-fit">
                Quirify for Educators
              </label>
              <p className="text-[36px] text-white leading-tight mt-8">
                Stay up at your game as an educator
              </p>
            </div>
            <div>
              <ul className="text-white text-lg mb-8 flex flex-col gap-3 mb-12">
                <li className="flex items-center gap-2">
                  <Bulb className="h-[40px] w-[40px]" />{" "}
                  <span>
                    Lorem ipsum dolor sit amet consectetur. Sed libero
                  </span>{" "}
                </li>
                <li className="flex items-center gap-2">
                  <Bulb className="h-[40px] w-[40px]" />{" "}
                  <span>
                    Lorem ipsum dolor sit amet consectetur. Sed libero
                  </span>{" "}
                </li>
                <li className="flex items-center gap-2">
                  <Bulb className="h-[40px] w-[40px]" />{" "}
                  <span>
                    Lorem ipsum dolor sit amet consectetur. Sed libero
                  </span>{" "}
                </li>
              </ul>
              <Button.Secondary
                title={"Create quiz"}
                className="rounded-full px-7 py-2 h-[50px]"
                style={{ borderRadius: "50px" }}
                onClick={() => navigate("/auth/register")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
