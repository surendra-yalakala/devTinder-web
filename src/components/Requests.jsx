import React, { useEffect } from "react";
import { addRequests } from "../utils/requestsReducer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.requests?.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      const requestsData = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(requestsData?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const doReviewRequest = async (_id, status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <h1 className="flex justify-center my-10">No requests found!</h1>;
  }

  return (
    <div>
      <h1 className=" my-10 text-3xl font-sans text-center">
        Requests Received
      </h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, about, age, gender, photoUrl } =
          request?.fromUserId;
        return (
          <div
            key={_id}
            className="card m-5 p-5 shadow-md bg-base-300 flex items-center flex-row max-w-1/2 m-auto"
          >
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  alt="Connection Avatar"
                  src={
                    photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <div className="ml-5">
              <p className="font-bold text-xl font-sans">
                {firstName + " " + lastName}
              </p>
              {age && gender && (
                <p className="font-sans text-sm">{age + ", " + gender}</p>
              )}
              <p className="font-sans text-sm mt-2">{about}</p>

              <div className="mt-2">
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => doReviewRequest(request._id, "rejected")}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => doReviewRequest(request._id, "accepted")}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
