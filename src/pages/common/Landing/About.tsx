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
                About Quiryfy
              </h2>
              <h4 className="text-3xl text-primary mb-4">
                Collaborative learning experiences that rival{" "}
                <span className="text-secondary">traditional classroom dynamics.</span>
              </h4>
              <p className="text-xl tracking-wide">
                Quiryfy revolutionizes quiz creation and collaboration, 
                offering a seamless platform for individuals and teams alike. 
                With intuitive features and user-friendly design, we empower users to craft, share, and enhance quizzes effortlessly. 
                Whether you're studying, training, or simply looking to test your knowledge, 
                Quiryfy makes learning enjoyable and effective. 
                Join us and elevate your learning experience today!"
              </p>
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
