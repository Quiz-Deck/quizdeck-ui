import React from "react";
import {
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import Girl from "../../../assets/images/landing/girl.png";
import { ReactComponent as Wavy } from "../../../assets/decorations/wavy-lines.svg";

const features = [
  {
    name: "React JS for beginners",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    name: "React JS for beginners",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    name: "React JS for beginners",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
  },
];

export default function Quizes() {
  return (
    <div className="py-12 bg-white relative">
      {/* <Wavy className="absolute" /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 items-center">
            <div>
              <h2 className="mt-2 mb-8 text-[70px] font-extrabold tracking-tight text-primary capitalize">
                Ready, Set, Go! 
              </h2>
              <p className="max-w-[540px] text-lg">
                It's Time to Unleash Your Full Potential.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="/"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primaryDark md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
              </div>
            </div>

            </div>

            <div className="flex justify-center">
              <img src={Girl} alt="girl" className="max-h-[670px]" />
            </div>
          </dl>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Most popular quizzes
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-10">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="shadow-lg px-5 rounded-lg pb-6"
              >
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg leading-6 font-medium text-gray-900 mt-6">
                    {feature.name}
                  </h4>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  {feature.description}
                </dd>
                <div className="flex justify-end mt-4">
                  <p>500+ students</p>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
