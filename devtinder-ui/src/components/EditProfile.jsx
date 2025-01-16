import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constant";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.user?.firstName || "");
  const [lastName, setLastName] = useState(user?.user?.lastName || "");
  const [age, setAge] = useState(user?.user?.age || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/update`,
        { firstName, lastName, age },
        { withCredentials: true }
      );
      dispatch(addUser, res?.data, { withCredentials: true });
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
      console.error(err.message);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}

      <div className="flex justify-evenly my-10">
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            gender: user?.user?.gender,
          }}
        />
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Edit Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">FirstName</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => {
                  setError("");
                  setFirstName(e.target.value);
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
                  setError("");
                  setLastName(e.target.value);
                }}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={age}
                onChange={(e) => {
                  setError("");
                  setAge(e.target.value);
                }}
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}

            <button
              className="btn btn-outline mt-3"
              onClick={handleEditProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
