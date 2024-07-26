import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <UserTable users={users} />
    </div>
  );
};

export default Users;
