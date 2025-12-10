import React from "react";
import { Link } from "react-router";

const MyModelPurchaseCard = ({ model }) => {
  return (
    <div className="card max-w-full bg-base-100 shadow-md border border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center px-5">
        <div className="flex justify-between items-center">
          <div className="">
            <img
              className="md:w-[70px] md:h-[160px] h-[210px]"
              src={model.modelDetails.image}
              alt=""
            />
          </div>

          <div className="card-body">
            <h2 className="text-[16px] md:text-xl">
              <span className="font-semibold">Name:</span>{" "}
              {model.modelDetails.name}
            </h2>
            <h3 className="text-[16px] md:text-[18px]">
              <span className="font-semibold">Framework: </span>
              {model.modelDetails.framework}
            </h3>
            <h3 className="text-[16px] md:text-[18px]">
              <span className="font-semibold">Use Case: </span>
              {model.modelDetails.useCase}
            </h3>
            <h3 className="text-[16px] md:text-[18px]">
              <span className="font-semibold">Created by: </span>
              {model.modelDetails.createdBy}
            </h3>
            <h3 className="text-[16px] md:text-[18px]">
              <span className="font-semibold">Purchased by: </span>
              {model.purchasedBy}
            </h3>
          </div>
        </div>

        <div className="mb-6 md:mb-0 w-full md:w-auto">
          <Link
            to={`/models/${model.modelId}`}
            className="btn bg-[#1875FF] text-white shadow-md w-full md:w-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyModelPurchaseCard;
