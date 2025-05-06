import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";
import EditModal from "./components/EditModal";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [modalUser, setModalUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [page, setPage] = useState(1);

  const perPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const searchFiltered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = [...searchFiltered].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.email.localeCompare(b.email);
    });
    setFiltered(sorted);
    setPage(1);
  }, [search, sortBy, users]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const updateUser = (updated) => {
    const updatedUsers = users.map(u => u.id === updated.id ? updated : u);
    setUsers(updatedUsers);
    setModalUser(null);
    setEditUser(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Directory</h2>
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="email">Sort by Email</option>
      </select>

      {paginated.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onView={() => setModalUser(user)}
          onEdit={() => setEditUser(user)}
        />
      ))}

      <div>
        {Array.from({ length: Math.ceil(filtered.length / perPage) }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      {modalUser && (
        <UserModal user={modalUser} onClose={() => setModalUser(null)} />
      )}
      {editUser && (
        <EditModal user={editUser} onClose={() => setEditUser(null)} onSave={updateUser} />
      )}
    </div>
  );
};

export default App;

