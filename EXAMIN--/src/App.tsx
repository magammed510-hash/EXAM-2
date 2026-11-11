import { useState } from "react";
import { UserCard } from "./Components/card1";
import './App.css';

const User = [
  {
    id: 1,
    name: "Muhammad",
    status: false,
    age: 16,
    contry: "Dushanbe"
  },
  {
    id: 2,
    name: "Ali",
    status: false,
    age: 17,
    contry: "Kulob"
  }
];

function App() {
  const [user, setUser] = useState(User);
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contry, setContry] = useState("");
  const [status, setStatus] = useState(true);

  const [name2, setName2] = useState("");
  const [age2, setAge2] = useState("");
  const [contry2, setContry2] = useState("");
  const [status2, setStatus2] = useState(false);
  const [editId, setID] = useState(null);

  const [search, setSearch] = useState("");

  function editStatus(id) {
    setUser(user.map((elem) => 
      elem.id === id ? { ...elem, status: !elem.status } : elem
    ));
  }

  function delUser(id) {
    setUser(user.filter((elem) => elem.id !== id));
  }

  function editUser(id) {
    const founded = user.find((elem) => elem.id === id);
    if (founded) {
      setName2(founded.name);
      setAge2(founded.age);
      setContry2(founded.contry);
      setStatus2(founded.status);
      setID(founded.id);
    }
  }

  const filteredUsers = user.filter((elem) =>
    elem.name.toLowerCase().includes(search.toLowerCase()) ||
    elem.contry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        value={search} type="search" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />

      <form className="addForm" onSubmit={(e) => {
        e.preventDefault();
        setUser([
          ...user, 
          { id: Date.now(), name: name, age: Number(age), contry: contry, status: status }
        ]);
        setName("");
        setAge("");
        setContry("");
        setStatus(true);
      }}>
        <input type="text" placeholder="Name...." value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Country..." value={contry} onChange={(e) => setContry(e.target.value)} required />
        <input type="number" placeholder="Age...." value={age} onChange={(e) => setAge(e.target.value)} required />
        <select onChange={(e) => setStatus(e.target.value === "active")}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Save</button>
      </form>

      {editId !== null && (
        <form className="editForm" onSubmit={(e) => {
          e.preventDefault();
          setUser(user.map((elem) => (
            elem.id === editId ? { ...elem, name: name2, age: Number(age2), contry: contry2, status: status2 } : elem
          )));
          setName2("");
          setAge2("");
          setContry2("");
          setID(null);
        }}>
          
          <h3>Edit User</h3>
          <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} required />
          <input type="text" value={contry2} onChange={(e) => setContry2(e.target.value)} required />
          <input type="number" value={age2} onChange={(e) => setAge2(e.target.value)} required />
          <select value={status2 ? "active" : "inactive"} onChange={(e) => setStatus2(e.target.value === "active")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit" className="btnaddSave">Save Changes</button>
          <button type="button" onClick={() => setID(null)}>Cancel</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Age</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="div">
          {filteredUsers.map((elem) => (
            <tr className="box" key={elem.id}>
              <td>{elem.name}</td>
              <td>{elem.status ? "active" : "inactive"}</td>
              <td>{elem.age}</td>
              <td>{elem.contry}</td>
              <td>
                <button onClick={() => delUser(elem.id)}>Delete</button>
                <button onClick={() => editUser(elem.id)}>Edit</button>
                <input 
                  type="checkbox" checked={elem.status} onChange={() => editStatus(elem.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;