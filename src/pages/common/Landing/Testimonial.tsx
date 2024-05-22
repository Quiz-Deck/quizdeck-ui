import React from "react";

export default function Testimonial() {
  return (
    <div className="py-12 max-w-7xl mx-auto bg-primary rounded-2xl mb-12 lg:mb-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-2 text-3xl sm:text-4xl leading-8 font-extrabold tracking-tight text-white">
            Get in touch!
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="max-w-3xl text-xl text-white lg:mx-auto">
            Reach out to us — we're here to help you every step of the way.
            Whether you have questions, feedback, or just want to say hello,
            we'd love to hear from you. Get in touch today!
          </p>
        </div>
        <div className="text-center mt-8">
          <a
            href="mailto:hello@quiryfy.com"
            className="text-md text-primary rounded-xl bg-white w-[180px] h-[80px] inline-flex items-center justify-center"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
