import React from "react";

const GetStarted = () => {
  return (
    <div className="mb-[30px]">
      <h1 className="text-3xl font-semibold my-[30px]">Get Started</h1>
      <div className="space-y-2.5">
        <p>
          Take the first step toward managing, organizing, and exploring AI
          models with ease. Our platform provides a simple and intuitive
          interface that helps you store model details, track updates, and
          streamline your workflow. Whether you're a developer, researcher, or
          enthusiast, getting started is quick and effortless.
        </p>
        <p>
          To begin, simply{" "}
          <span className="font-semibold">create an account</span> or{" "}
          <span className="font-semibold">log in</span>. Once you're in, you'll
          be able to add new AI models, update existing ones, and access all
          features designed to make AI model management smooth and efficient.
        </p>
        <div className="flex justify-center">
          <button className="btn px-10 text-[18px] bg-[#1875FF] text-white shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
