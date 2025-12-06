import React, { useEffect, useState } from "react";
import FeaturedAIModelCard from "../FeaturedAIModelCard/FeaturedAIModelCard";
import useAxios from "../../hooks/useAxios";

const FeaturedAIModels = () => {
  const axiosInstance = useAxios();
  const [models, setModels] = useState([]);

  useEffect(() => {
    axiosInstance.get("/latest-models").then((data) => {
      setModels(data.data);
    });
  }, [axiosInstance]);

  return (
    <div>
      <h1 className="text-3xl font-semibold my-[30px]">Featured AI Models</h1>
      <div className="grid md:grid-cols-3 gap-5">
        {models.map((model) => (
          <FeaturedAIModelCard
            key={model._id}
            model={model}
          ></FeaturedAIModelCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAIModels;
