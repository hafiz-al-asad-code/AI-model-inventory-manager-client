import React, { useEffect, useState } from "react";
import AIModelCard from "../AIModelCard/AIModelCard";
import useAxios from "../../hooks/useAxios";

const FeaturedAIModels = () => {
  const axiosInstance = useAxios();
  const [models, setModels] = useState([]);

  useEffect(() => {
    axiosInstance.get("/latest-models").then((data) => {
      console.log("inside the axios instance", data.data);
      setModels(data.data);
    });
  }, [axiosInstance]);

  return (
    <div>
      <h1 className="text-3xl font-semibold my-[30px]">Featured AI Models</h1>
      <div className="grid md:grid-cols-3 gap-5">
        {models.map((model) => (
          <AIModelCard key={model._id} model={model}></AIModelCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAIModels;
