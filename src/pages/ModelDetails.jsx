import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";

const ModelDetails = () => {
  const axiosInstance = useAxios();
  const [model, setModel] = useState({});
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance.get(`/models/${id}`).then((data) => {
      console.log(data.data);
      setModel(data.data);
    });
  }, [axiosInstance, id]);

  const handlePurchasedCount = (e) => {
    e.preventDefault();

    const newPurchase = {
      modelId: model._id,
      name: model.name,
      framework: model.framework,
      useCase: model.useCase,
      createdBy: model.createdBy,
      purchasedBy: user.email,
      image: model.image,
    };

    axiosInstance.post("/purchased", newPurchase).then((data) => {
      console.log(data.data);

      if (data.data.insertedId) {
        axiosInstance.patch(`/models/${id}`).then((data) => {
          console.log(data.data);

          if (data.data.modifiedCount) {
            setModel((currentModel) => ({
              ...currentModel,
              purchased: currentModel.purchased + 1,
            }));
          }
        });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto lg:min-h-screen my-[30px]">
      <h1 className="text-3xl font-semibold mb-[30px]">About The Model</h1>
      <div className="card bg-base-100 lg:w-[800px] w-auto shadow-xl mx-auto">
        <figure>
          <img
            className="lg:w-[800px] w-auto lg:h-[472px] h-auto"
            src={model.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="text-xl">
            <span className="font-semibold">Name:</span> {model.name}
          </h2>
          <h2 className="text-xl">
            <span className="font-semibold">Framework:</span> {model.framework}
          </h2>
          <h2 className="text-xl">
            <span className="font-semibold">Use Case:</span> {model.useCase}
          </h2>
          <h2 className="text-xl">
            <span className="font-semibold">Dataset:</span> {model.dataset}
          </h2>
          <h2 className="text-xl">
            <span className="font-semibold">Description:</span>{" "}
            {model.description}
          </h2>
          <h2 className="text-xl">
            <span className="font-semibold">Purchased Count:</span>{" "}
            {model.purchased}
          </h2>

          <div className="card-actions justify-center gap-5 mt-4">
            <button onClick={handlePurchasedCount} className="btn btn-primary">
              Purchase Model
            </button>

            {user.email === model.createdBy && (
              <>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-error">Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
