import React from "react";
import errorImg from "../assets/error-6482984_1280.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-6 px-4">
      <img className="h-[500px] mx-auto" src={errorImg} alt="" />
      <h1 className="text-2xl md:text-5xl font-semibold text-center">
        Oops! Doesn't found your desire
      </h1>
      <div className="flex justify-center items-center">
        <Link
          to="/"
          className="btn px-10 py-6 bg-[#1875FF] text-white text-xl shadow-md"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
