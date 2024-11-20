import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import Categories from "./Categories";
import Quizes from "./Quizes";
import UserGroups from "./UserGroups";
import Testimonial from "./Testimonial";
import { Fade } from "react-awesome-reveal";

export default function Landing() {
  return (
    <>
      <Fade cascade damping={0.1} triggerOnce={true}>
        <Hero />
        <About />
        <Services />
        <Quizes />
        <UserGroups />
        <Categories />
        <Testimonial />
      </Fade>
    </>
  );
}
