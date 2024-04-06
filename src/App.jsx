import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';




const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const addUser = () => {
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '' });
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  // Display users in UI
  return (
    <div className="container">
      <header>  <h1 className="header">Users List</h1> </header>
    
      <div>
        <h2>Add User</h2>
        <div className='email'> 
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        </div>
        <button className="adduser" onClick={addUser}>Add User</button>
      </div>
      <div>
        <h2>Existing Users</h2>
        {users.map(user => (
          <div className='userbox' key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <div className='delete'><button onClick={() => deleteUser(user.id)}>Delete User</button></div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
