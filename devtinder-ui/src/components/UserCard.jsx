import { spread } from "axios";
import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, skills } = user;
  return (
    <div className="card bg-base-900 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p className="flex gap-3">
          {age && <span>Age: {age}</span>}
          {gender && <span>Gender: {gender}</span>}
        </p>
        <div className="card-actions justify-start mt-2">
          <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
