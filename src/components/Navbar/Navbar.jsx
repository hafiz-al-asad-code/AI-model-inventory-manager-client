import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink
          className="hover:border-b-2 border-[#1875FF] hover:font-medium"
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-model"
          className="hover:border-b-2 border-[#1875FF] hover:font-medium"
        >
          Add Model
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/models"
          className="hover:border-b-2 border-[#1875FF] hover:font-medium"
        >
          All Models
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-xl">
            <span className="text-[#1875FF] text-4xl font-semibold">AI</span>{" "}
            Model
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal space-x-5">{links}</ul>
        </div>
        <div className="navbar-end flex items-center gap-7">
          <ThemeToggle></ThemeToggle>

          {user ? (
            //  profile picture
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user
                        ? user.photoURL
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-[300px] md:w-[400px] p-2 shadow"
              >
                <div className="border-l-4 border-[#1875FF] mb-4">
                  <li>
                    <h3 className="md:text-[18px]">
                      displayName: {user.displayName}
                    </h3>
                  </li>
                  <li>
                    <h3 className="md:text-[18px]">Email: {user.email}</h3>
                  </li>
                </div>
                <li>
                  <Link
                    to="/myModelPurchase"
                    className="flex gap-2 items-center md:text-[16px]"
                  >
                    <span className="hover:border-b-2 border-[#1875FF] hover:font-medium">
                      Model Purchase page
                    </span>
                    <span className="text-[10px] md:text-[12px]">
                      <FaExternalLinkAlt />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myModel"
                    className="flex gap-2 items-center md:text-[16px]"
                  >
                    <span className="hover:border-b-2 border-[#1875FF] hover:font-medium">
                      My Models page
                    </span>
                    <span className="text-[10px] md:text-[12px]">
                      <FaExternalLinkAlt />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogOut} className="md:text-[16px]">
                    <span className="hover:border-b-2 border-[#1875FF] hover:font-medium">
                      Log Out
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn bg-[#1875FF] text-white shadow-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
