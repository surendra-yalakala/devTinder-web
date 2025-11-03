import React from "react";

const UserCard = (props) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={props?.data?.photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {props?.data?.firstName + " " + props?.data?.lastName}
          </h2>
          {props?.data?.gender && props?.data?.age && (
            <p>{props?.data?.gender + ", " + props?.data?.age}</p>
          )}
          <p>{props?.data?.about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
