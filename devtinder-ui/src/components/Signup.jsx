import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../constants/constant";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/feed");
      }, 1000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };
  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Account created sucessfully</span>
          </div>
        </div>
      )}
      <div className="card bg-neutral text-neutral-content w-96 my-5 mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Create Account</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">FirstName</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value), setError("");
              }}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">LastName</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value), setError("");
              }}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value), setError("");
              }}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value), setError("");
              }}
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}

          <button
            className="btn btn-outline mt-3"
            onClick={handleSignup}
          >
            Create Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
