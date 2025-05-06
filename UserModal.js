import React from "react";

const UserModal = ({ user, onClose }) => (
  <div style={{ border: "1px solid black", padding: 20, background: "white" }}>
    <h3>{user.name}</h3>
    <p><b>Username:</b> {user.username}</p>
    <p><b>Email:</b> {user.email}</p>
    <p><b>Phone:</b> {user.phone}</p>
    <p><b>Website:</b> {user.website}</p>
    <p><b>Company:</b> {user.company.name}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export default UserModal;
