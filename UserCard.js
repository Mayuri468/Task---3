import React from "react";

const UserCard = ({ user, onView, onEdit }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <button onClick={onView}>View</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default UserCard;
