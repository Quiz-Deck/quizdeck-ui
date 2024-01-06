import React from "react";
import Video from "../../../assets/images/landing/about.jpg";

export default function About() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="max-w-[560px]">
              <h2 className="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-primary sm:text-4xl">
                About QuizDeck
              </h2>
              <h4 className="text-3xl text-primary mb-4">
                Everything you can do in a physical classroom,{" "}
                <span className="text-secondary">you can do with Skilline</span>
              </h4>
              <p className="text-xl tracking-wide">
                Skilline’s school management software helps traditional and
                online schools manage scheduling, attendance, payments and
                virtual classrooms all in one secure cloud-based system.
              </p>

              <div className="mt-6">
                <a href="/" className="underline">
                  Learn more
                </a>
              </div>
            </div>

            <div>
              <img alt="video" src={Video} />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
