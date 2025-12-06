import React from "react";
import { Link } from "react-router";

const AIModelCard = ({ model }) => {
  return (
    <div className="card max-w-full bg-base-100 shadow-md border border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center px-5">
        <div className="flex justify-between items-center">
          <div className="">
            <img className="w-[70px] h-[100px]" src={model.image} alt="" />
          </div>

          <div className="card-body">
            <h2 className="text-xl">
              <span className="font-semibold">Model:</span> {model.name}
            </h2>
            <h3 className="text-[18px]">
              <span className="font-semibold">Framework: </span>
              {model.framework}
            </h3>
            <h3 className="text-[18px]">
              <span className="font-semibold">Use Case: </span>
              {model.useCase}
            </h3>
          </div>
        </div>

        <div className="mb-6 md:mb-0 w-full md:w-auto">
          <Link
            to={`/models/${model._id}`}
            className="btn bg-[#1875FF] text-white shadow-md w-full md:w-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIModelCard;
