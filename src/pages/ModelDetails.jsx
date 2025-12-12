import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import Loader from "../components/Loader/Loader";

const ModelDetails = () => {
  const axiosInstance = useAxios();
  const [model, setModel] = useState({});
  const [purchasedModel, setPurchasedModel] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/models/${id}`).then((data) => {
      console.log(data.data);
      setModel(data.data);
    });

    axiosInstance.get(`/purchased/${id}?email=${user.email}`).then((data) => {
      console.log("purchased data", data.data);
      setPurchasedModel(data.data);
      setLoading(false);
    });
  }, [axiosInstance, id, user.email, loading]);

  const handlePurchasedCount = () => {
    setLoading(true);

    const newPurchase = {
      modelId: model._id,
      purchasedBy: user.email,
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
            setLoading(false);
          }
        });
      }
    });
  };

  const handleModelDelete = () => {
    setLoading(true);

    axiosInstance.delete(`/models/${id}`).then((data) => {
      console.log(data.data);
      if (data.data.success) {
        setLoading(false);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "The model has been deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/models");
      }
    });
  };

  if (loading) {
    return <Loader></Loader>;
  }

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
            <button
              onClick={handlePurchasedCount}
              className={`btn btn-primary ${
                purchasedModel?.purchasedBy === user.email &&
                "pointer-events-none opacity-60"
              }`}
            >
              {purchasedModel?.purchasedBy === user.email
                ? "Purchased"
                : "Purchase Model"}
            </button>

            {user.email === model.createdBy && (
              <>
                <Link to={`/update-model/${id}`}>
                  <button className="btn btn-warning">Edit</button>
                </Link>
                <button onClick={handleModelDelete} className="btn btn-error">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
