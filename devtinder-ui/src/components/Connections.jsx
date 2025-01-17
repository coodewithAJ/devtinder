import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { useEffect, useState } from "react";

const Connections = () => {
  const [connection, setConnections] = useState([]);
  const getAllConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      setConnections(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllConnections();
  }, []);
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-base-800 my-10">
        Connections
      </h1>
      <div className="flex flex-wrap justify-evenly m-5">
        {connection?.map((singleConnection) => {
          return (
            <div
              className="card bg-neutral text-neutral-content w-fit"
              key={singleConnection?._id}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {singleConnection?.firstName} {singleConnection?.lastName}
                </h2>
                <div className="flex gap-2">
                  {singleConnection?.age && (
                    <span>Age: {singleConnection?.age}</span>
                  )}
                  {singleConnection?.gender && (
                    <span>Gender: {singleConnection?.gender}</span>
                  )}
                </div>
                <div className="card-actions justify-end mt-2">
                  <button className="btn btn-primary">Remove</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Connections;
