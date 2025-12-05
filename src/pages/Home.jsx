import React from "react";
import FeaturedAIModels from "../components/FeaturedAIModels/FeaturedAIModels";
import AboutAIModels from "../components/AboutAIModels/AboutAIModels";
import GetStarted from "../components/GetStarted/GetStarted";
import Slider from "../components/Slider/Slider";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Slider></Slider>
      <FeaturedAIModels></FeaturedAIModels>
      <AboutAIModels></AboutAIModels>
      <GetStarted></GetStarted>
    </div>
  );
};

export default Home;
