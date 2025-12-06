import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";
import AIModelCard from "../components/AIModelCard/AIModelCard";

const AllModels = () => {
  const axiosInstance = useAxios();
  const [models, setModels] = useState([]);

  useEffect(() => {
    axiosInstance.get("/models").then((data) => {
      console.log(data.data);
      setModels(data.data);
    });
  }, [axiosInstance]);

  return (
    <div className="w-11/12 mx-auto my-[30px]">
      <h1 className="text-3xl font-semibold mb-[30px]">Explore AI Models</h1>
      <div className="space-y-5">
        {models.map((model) => (
          <AIModelCard key={model._id} model={model}></AIModelCard>
        ))}
      </div>
    </div>
  );
};

export default AllModels;
