import React from "react";
import FeaturedAIModels from "../components/FeaturedAIModels/FeaturedAIModels";
import AboutAIModels from "../components/AboutAIModels/AboutAIModels";
import GetStarted from "../components/GetStarted/GetStarted";

const Home = () => {
  return (
    <div>
      <FeaturedAIModels></FeaturedAIModels>
      <AboutAIModels></AboutAIModels>
      <GetStarted></GetStarted>
    </div>
  );
};

export default Home;
