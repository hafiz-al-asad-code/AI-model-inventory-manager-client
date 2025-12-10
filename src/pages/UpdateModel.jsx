import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateModel = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [model, setModel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/models/${id}`).then((data) => {
      console.log(data.data);
      setModel(data.data);
    });
  }, [axiosInstance, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const framework = e.target.framework.value;
    const useCase = e.target.useCase.value;
    const dataset = e.target.dataset.value;
    const description = e.target.description.value;
    const image = e.target.image.value;

    console.log(name, framework, useCase, dataset, description, image);

    const updatedModel = {
      name,
      framework,
      useCase,
      dataset,
      description,
      image,
    };

    axiosInstance.patch(`/update-model/${id}`, updatedModel).then((data) => {
      console.log(data.data);
      if (data.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Model has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/models/${id}`);
      }
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex flex-col justify-center gap-6 py-[30px]">
      <div>
        <h1 className="text-4xl text-center font-semibold">Update Model</h1>
      </div>
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="AI model name"
                defaultValue={model.name}
              />
              {/* framework */}
              <label className="label">Framework</label>
              <input
                type="text"
                name="framework"
                className="input w-full"
                placeholder="Framework"
                defaultValue={model.framework}
              />
              {/* use case */}
              <label className="label">Use Case</label>
              <input
                type="text"
                name="useCase"
                className="input w-full"
                placeholder="Use Case"
                defaultValue={model.useCase}
              />
              {/* dataset */}
              <label className="label">Dataset</label>
              <input
                type="text"
                name="dataset"
                className="input w-full"
                placeholder="Dataset"
                defaultValue={model.dataset}
              />
              {/* description */}
              <label className="label">Description</label>
              <textarea
                type="text"
                name="description"
                className="input w-full h-20"
                placeholder="Write short description"
                defaultValue={model.description}
              />
              {/* imageURL */}
              <label className="label">Image URL</label>
              <input
                type="text"
                name="image"
                className="input w-full"
                placeholder="Image URL"
                defaultValue={model.image}
              />

              <button className="btn bg-[#1875FF] text-white shadow-md mt-4 w-full">
                Update
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
