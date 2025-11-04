import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {gender && age && <p>{gender + ", " + age}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
