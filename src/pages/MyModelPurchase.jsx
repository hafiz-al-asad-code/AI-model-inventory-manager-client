import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import MyModelPurchaseCard from "../components/MyModelPurchaseCard/MyModelPurchaseCard";
import Loader from "../components/Loader/Loader";

const MyModelPurchase = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [purchasedModels, setPurchasedModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/models-purchased-joined").then((data) => {
      setPurchasedModels(data.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  const purchasedModelsByUser = purchasedModels.filter(
    (purchasedModel) => purchasedModel.purchasedBy === user.email
  );

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-11/12 mx-auto my-[30px]">
      <h1 className="text-3xl font-semibold mb-[30px]">My Purchased Models</h1>
      <div className="space-y-5">
        {purchasedModelsByUser.map((model) => (
          <MyModelPurchaseCard
            key={model._id}
            model={model}
          ></MyModelPurchaseCard>
        ))}
      </div>
    </div>
  );
};

export default MyModelPurchase;
