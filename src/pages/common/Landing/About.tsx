import React from "react";
import PurpleIcon from "assets/decorations/circle-purple.png";
import YellowIcon from "assets/decorations/circle-yellow.png";

export default function About() {
  return (
    <div className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <img src={PurpleIcon} alt="design" className="h-[94px] w-[96px]" />
          <div className="py-16 w-full max-w-[1000px] w-full mx-auto text-center">
            <h4 className="text-[48px] font-semibold leading-tight text-secondary mb-8">
              Collaborative learning experiences{" "}
              <span className="text-white">
                that rival traditional classroom dynamics.
              </span>
            </h4>
            <p className="text-lg text-white">
              Quiryfy revolutionizes quiz creation and collaboration, offering a
              seamless platform for individuals and teams alike. With intuitive
              features and user-friendly design, we empower users to craft,
              share, and enhance quizzes effortlessly. Whether you're studying,
              training, or simply looking to test your knowledge, Quiryfy makes
              learning enjoyable and effective. Join us and elevate your
              learning experience today!"
            </p>
          </div>
          <div className="w-full flex justify-end">
            <img src={YellowIcon} alt="design" className="h-[94px] w-[96px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
