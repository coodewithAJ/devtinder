import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [showToast, setShowToast] = useState({ showToast: false, message: "" });
  const getConnectionRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      setRequests(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      setShowToast({ showToast: true, message: res?.data?.message });

      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, showToast: false }));
        const filterRequests = requests?.filter(
          (request) => request?._id !== requestId
        );
        setRequests(filterRequests);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getConnectionRequests();
  }, []);
  if (requests.length === 0)
    return (
      <h1 className="text-4xl font-bold text-center text-base-800 my-10">
        No Connection Requests found
      </h1>
    );
  return (
    <>
      {showToast?.showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{showToast?.message}</span>
          </div>
        </div>
      )}
      <h1 className="text-4xl font-bold text-center text-base-800 my-10">
        Connection Requests
      </h1>
      <div className="flex flex-wrap justify-evenly m-5">
        {requests?.map((request) => {
          return (
            <div
              className="card bg-neutral text-neutral-content w-fit"
              key={request?._id}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {request?.fromUserId?.firstName}{" "}
                  {request?.fromUserId?.lastName}
                </h2>
                <div className="flex gap-2">
                  {request?.fromUserId?.age && (
                    <span>Age: {request?.fromUserId?.age}</span>
                  )}
                  {request?.fromUserId?.gender && (
                    <span>Gender: {request?.fromUserId?.gender}</span>
                  )}
                </div>
                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      reviewRequest("accepted", request._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => {
                      reviewRequest("rejected", request._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Requests;
