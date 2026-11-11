import React from 'react';

export function UserCard({ elem, delUser, editUser, editStatus }) {
  return (
    <tr className="box">
      <td>{elem.name}</td>
      <td>{elem.status ? "active" : "inactive"}</td>
      <td>{elem.age}</td>
      <td>{elem.contry}</td>
      <td>
        <button onClick={() => delUser(elem.id)}>Delete</button>
        <button onClick={() => editUser(elem.id)}>Edit</button>
        <input 
          type="checkbox" 
          checked={elem.status} 
          onChange={() => toggleStatus(elem.id)} 
        />
      </td>
    </tr>
  );
}