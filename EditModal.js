import React, { useState } from "react";

const EditModal = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = () => {
    onSave({ ...user, name, email });
  };

  return (
    <div style={{ border: "1px solid black", padding: 20, background: "white" }}>
      <h3>Edit User</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditModal;
