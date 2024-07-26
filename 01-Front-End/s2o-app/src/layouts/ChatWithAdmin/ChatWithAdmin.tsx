import React, { useState } from 'react';
import AdminChat from '../Admin/ChatWithClient/AdminChat';
import Chat from './Chat';


const ChatWithAdmin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <div className="App">
      <h1>Chat Application</h1>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        Switch to {isAdmin ? 'Admin' : 'Client'} View
      </button>
      {isAdmin ? <AdminChat sender='Admin' reciver='Client'/> : <Chat sender="Client" reciver='Admin' />}
    </div>
  );
};

export default ChatWithAdmin;
