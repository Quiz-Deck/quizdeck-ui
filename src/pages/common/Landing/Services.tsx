import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/buttons";
import Background from "assets/images/landing/about.png";
// import { ReactComponent as Create } from "assets/icons/create-quiz.svg";
// import { ReactComponent as Take } from "assets/icons/take-quiz.svg";
// import { ReactComponent as Publish } from "assets/icons/publish-quiz.svg";
import Create from "assets/decorations/service-1.svg";
import Invite from "assets/decorations/service-2.svg";
import Practice from "assets/decorations/service-3.svg";

const service = [
  {
    name: "Create Your Quiz",
    bgColor: "#DEC8FE",
    description:
      "Craft questions and customize settings effortlessly with Quiryfy's intuitive interface. Plus, generate quizzes from your content in minutes!",
    imageUrl: Create,
  },
  {
    name: "Invite Others to join you",
    bgColor: "#885AF2",
    description:
      "Collaborate Seamlessly: Invite Friends to Join, Create Questions Together, Take Quizzes Together, and Study Anywhere, Anytime.",
    imageUrl: Invite,
  },
  {
    name: "Practice Quiz seamlessly",
    bgColor: "#F8C159",
    description:
      "Refine Your Skills: Practice Quizzes Anytime, Track Progress, and Improve Your Weak Areas- Even with Limited Internet Access!",
    imageUrl: Practice,
  },
];

export default function Services() {
  const navigate = useNavigate();
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-8">
          <h2 className="mt-2 text-[48px] leading-8 font-bold tracking-tight text-[#0A0A0B] sm:text-4xl">
            How it works
          </h2>
        </div>

        <div className="pt-16">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-20 sm:gap-6">
            {service.map((item, index) => (
              <li
                key={index}
                className={`col-span-1 flex flex-col text-left text-black rounded-[50px] min-h-[450px]`}
                style={{ backgroundColor: item.bgColor }}
              >
                <div className="flex-1 relative flex flex-col p-8">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-32 absolute top-0 right-0 flex-shrink-0 mx-auto"
                  />
                  <h3 className="mt-24 mb-5 text-text-primaryDark text-[48px] leading-tight">
                    {item.name}
                  </h3>
                  <dl className="mt-1">
                    <dt className="sr-only">description</dt>
                    <dd className="text-[#1E1C23] text-lg">
                      {item.description}
                    </dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-16 w-full">
          <div
            className="min-h-[520px] w-full rounded-[50px] bg-center bg-cover px-10 flex items-end"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(53, 11, 149, 0) 0%, #000000 100%), url(${Background})`,
            }}
          >
            <h3 className="max-w-[530px] text-white text-[48px] font-medium leading-tight pb-12">
              Create quiz and share with study groups
            </h3>
          </div>
        </div>

        <div className="mt-5 sm:mt-8 flex justify-center">
          <Button.Primary
            title={"Get started"}
            className="rounded-full px-7 py-2 h-[50px]"
            style={{ borderRadius: "50px" }}
            onClick={() => navigate("/auth/register")}
          />
        </div>
      </div>
    </div>
  );
}
