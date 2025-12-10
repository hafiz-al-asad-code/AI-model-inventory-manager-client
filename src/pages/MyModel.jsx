import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import MyModelCard from "../components/MyModelCard/MyModelCard";

const MyModel = () => {
  const axiosInstance = useAxios();
  const [models, setModels] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance.get("/models").then((data) => {
      console.log(data.data);
      setModels(data.data);
    });
  }, [axiosInstance]);

  const modelCreatedByUser = models.filter(
    (model) => model.createdBy === user.email
  );
  console.log("model created by user", modelCreatedByUser);

  return (
    <div className="w-11/12 mx-auto my-[30px]">
      <h1 className="text-3xl font-semibold mb-[30px]">My Models</h1>
      <div className="space-y-5">
        {modelCreatedByUser.map((model) => (
          <MyModelCard key={model._id} model={model}></MyModelCard>
        ))}
      </div>
    </div>
  );
};

export default MyModel;
