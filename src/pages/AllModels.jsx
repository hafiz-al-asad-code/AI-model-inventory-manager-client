import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import AIModelCard from "../components/AIModelCard/AIModelCard";
import Loader from "../components/Loader/Loader";

const AllModels = () => {
  const axiosInstance = useAxios();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [framework, setFramework] = useState("select_framework");

  useEffect(() => {
    axiosInstance.get("/models").then((data) => {
      console.log(data.data);
      setModels(data.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  const handleSelectFramework = (e) => {
    console.log("value of select", e.target.value);
    const value = e.target.value;
    setFramework(value);
  };

  const uniqueFrameworks = [...new Set(models.map((model) => model.framework))];

  const filteredModels =
    framework === "select_framework"
      ? models
      : models.filter((model) => model.framework === framework);

  console.log("filtered models from filter", filteredModels);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-11/12 mx-auto my-[30px]">
      <div className="flex items-center gap-5 mb-[30px]">
        <h1 className="text-3xl font-semibold">Explore AI Models</h1>
        <select
          value={framework}
          onChange={handleSelectFramework}
          className="border border-gray-300 rounded-xs px-2 py-1"
          name=""
          id=""
        >
          <option value="select_framework">Select Framework</option>
          {[...uniqueFrameworks].sort().map((framework) => (
            <option key={framework} value={framework}>
              {framework}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-5">
        {filteredModels.map((model) => (
          <AIModelCard key={model._id} model={model}></AIModelCard>
        ))}
      </div>
    </div>
  );
};

export default AllModels;
