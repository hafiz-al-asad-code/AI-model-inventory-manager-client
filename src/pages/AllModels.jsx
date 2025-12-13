import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import AIModelCard from "../components/AIModelCard/AIModelCard";
import Loader from "../components/Loader/Loader";
import { FaSearch } from "react-icons/fa";

const AllModels = () => {
  const axiosInstance = useAxios();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [framework, setFramework] = useState("select_framework");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    axiosInstance.get(`/models?search=${debouncedSearch}`).then((data) => {
      console.log(data.data);
      setModels(data.data);
      setLoading(false);
    });
  }, [axiosInstance, debouncedSearch]);

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

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-11/12 mx-auto my-[30px]">
      <div className="flex justify-between items-center mb-[30px]">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-semibold">Explore AI Models</h1>
          {/* select framework bar */}
          <select
            value={framework}
            onChange={handleSelectFramework}
            className="border border-gray-300 rounded-sm px-2 py-1"
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

        {/* search bar */}
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 rounded-sm pl-7 py-1"
            type="search"
            name=""
            id=""
            placeholder="Search Models"
          />
          <FaSearch
            className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={15}
          />
        </div>
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
