import React from "react";

const FeaturedAIModelCard = ({ model }) => {
  const { name, framework, description } = model;

  return (
    <div className="card max-w-full bg-base-100 card-lg shadow-md border border-gray-300">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3>{framework}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default FeaturedAIModelCard;
