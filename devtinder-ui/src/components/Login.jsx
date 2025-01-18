import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../constants/constant";

const Login = () => {
  const [email, setEmail] = useState("ashok@gmail.com");
  const [password, setPassword] = useState("Ashok@123");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res?.data?.user));
      navigate("/feed");
    } catch (err) {
      setLoginError(err?.response?.data || "Something went wrong");
    }
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
              type="password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500">{loginError}</p>
          <button
            className="btn btn-outline mt-3"
            onClick={handleLogin}
          >
            Login
          </button>
          <p>OR</p>
          <p>Don't have an account? <Link to="/signup" className="underline text-red-400">Create Account</Link> </p> 
        </div>
      </div>
    </>
  );
};
export default Login;
