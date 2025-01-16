import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants/constant";

const Login = () => {
  const [email, setEmail] = useState("ashok@gmail.com");
  const [password, setPassword] = useState("Ashok@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const res = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        emailId: email,
        password,
      },
      { withCredentials: true }
    );
    dispatch(addUser(res.data));
    navigate("/feed");
  };
  return (
    <>
      <div className="card bg-neutral text-neutral-content w-96 mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title">LOGIN</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="btn btn-outline mt-3"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
