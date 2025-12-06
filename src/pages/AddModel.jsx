import React from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddModel = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleAddNewModel = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const framework = e.target.framework.value;
    const useCase = e.target.useCase.value;
    const dataSet = e.target.dataset.value;
    const description = e.target.description.value;
    const imageURL = e.target.image.value;
    console.log(name, framework, useCase, dataSet, description, imageURL);

    const newModel = {
      name,
      framework,
      useCase,
      dataSet,
      description,
      imageURL,
      createdBy: user.email,
      createdAt: new Date().toISOString(),
      purchased: 0,
    };

    axiosInstance.post("/models", newModel).then((data) => {
      console.log("after save to mongodb", data.data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/models");
      }
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex flex-col justify-center gap-6 my-[30px]">
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
              />
              {/* framework */}
              <label className="label">Framework</label>
              <input
                type="text"
                name="framework"
                className="input w-full"
                placeholder="Framework"
              />
              {/* use case */}
              <label className="label">Use Case</label>
              <input
                type="text"
                name="useCase"
                className="input w-full"
                placeholder="Use Case"
              />
              {/* dataset */}
              <label className="label">Dataset</label>
              <input
                type="text"
                name="dataSet"
                className="input w-full"
                placeholder="Dataset"
              />
              {/* description */}
              <label className="label">Description</label>
              <textarea
                type="text"
                name="description"
                className="input w-full h-20"
                placeholder="Write short description"
              />
              {/* imageURL */}
              <label className="label">Image URL</label>
              <input
                type="text"
                name="image"
                className="input w-full"
                placeholder="Image URL"
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
