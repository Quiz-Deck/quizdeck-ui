import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
// import Categories from "./Categories";
import Quizes from "./Quizes";
import Testimonial from "./Testimonial";

export default function Landing() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      {/* <Categories /> */}
      <Quizes />
      <Testimonial />
    </>
  );
}
