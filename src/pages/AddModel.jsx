import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loader from "../components/Loader/Loader";

const AddModel = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddNewModel = (e) => {
    setLoading(true);
    e.preventDefault();
    const name = e.target.name.value;
    const framework = e.target.framework.value;
    const useCase = e.target.useCase.value;
    const dataset = e.target.dataset.value;
    const description = e.target.description.value;
    const image = e.target.image.value;

    const newModel = {
      name,
      framework,
      useCase,
      dataset,
      description,
      image,
      createdBy: user.email,
      createdAt: new Date().toISOString(),
      purchased: 0,
    };

    axiosInstance.post("/models", newModel).then((data) => {
      if (data.data.insertedId) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "AI model has been added",
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
    <div className="hero bg-base-200 md:min-h-screen flex flex-col justify-center gap-6 py-[30px]">
      <div>
        <h1 className="text-4xl text-center font-semibold">Add New Model</h1>
      </div>
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleAddNewModel}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="AI model name"
                required
              />
              {/* framework */}
              <label className="label">Framework</label>
              <input
                type="text"
                name="framework"
                className="input w-full"
                placeholder="Framework"
                required
              />
              {/* use case */}
              <label className="label">Use Case</label>
              <input
                type="text"
                name="useCase"
                className="input w-full"
                placeholder="Use Case"
                required
              />
              {/* dataset */}
              <label className="label">Dataset</label>
              <input
                type="text"
                name="dataset"
                className="input w-full"
                placeholder="Dataset"
                required
              />
              {/* description */}
              <label className="label">Description</label>
              <textarea
                type="text"
                name="description"
                className="input w-full h-20"
                placeholder="Write short description"
                required
              />
              {/* imageURL */}
              <label className="label">Image URL</label>
              <input
                type="text"
                name="image"
                className="input w-full"
                placeholder="Image URL"
                required
              />
              {/* created by */}
              <label className="label">Created By</label>
              <input
                type="text"
                name="createdBy"
                className="input w-full"
                defaultValue={user.email}
                readOnly
              />

              <button className="btn bg-[#1875FF] text-white shadow-md mt-4 w-full">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
