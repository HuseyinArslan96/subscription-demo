import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the Users!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">User List</h1>
      {users.length > 0 ? (
        <ul className="list-group">
          {users.map(user => (
            <li key={user.id} className="list-group-item">
              {user.user_name} - {user.company_name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No users available.</p>
      )}
    </div>
  );
}

export default UserList;
