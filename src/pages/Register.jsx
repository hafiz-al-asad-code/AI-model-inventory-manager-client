import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import Loader from "../components/Loader/Loader";

const Register = () => {
  const { signUpUser, signInWithGoogle, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    setLoading(true);
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photo.value;
    const password = e.target.password.value;

    const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegEx.test(password)) {
      toast(
        "Password must be atleast 6 characters long, must have atleast one uppercase letter and atleast one lowercase letter"
      );
      setLoading(false);
      return;
    }

    const updatedUserInfo = {
      displayName: name,
      photoURL: photoURL,
    };

    signUpUser(email, password)
      .then((result) => {
        updateProfile(result.user, updatedUserInfo)
          .then(() => {
            setUser({ ...result.user, updatedUserInfo });
            setLoading(false);
            navigate("/");
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast(error.code);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast(error.code);
      });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="hero bg-base-200 min-h-screen flex flex-col justify-center gap-6">
      <div>
        <h1 className="text-4xl text-center font-semibold">
          Register for AI Model Inventory Manager
        </h1>
      </div>

      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="Enter Your Name"
                required
              />
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Enter Your Email"
                required
              />
              {/* photo URL */}
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input w-full"
                placeholder="Photo URL"
                required
              />
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input w-full"
                placeholder="Password"
                required
              />

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] mt-1"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Sign In with Google
          </button>

          <p className="mt-4">
            Already have an account? Please{" "}
            <Link
              to="/login"
              className="hover:text-[#1875FF] hover:font-semibold hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
