import React, { useState, useEffect } from 'react';
import ChatMessageModal from '../../../Model/ChatMessageModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatList.css'; // Make sure to create this CSS file


const ChatList: React.FC = () => {
    const [chats, setChats] = useState<ChatMessageModal[]>([]);
    const [newChat, setNewChat] = useState({ sender: '', reciver: '', content: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentChat, setCurrentChat] = useState<ChatMessageModal | null>(null);

    const API_URL = 'http://localhost:8080/api/chatMessages';

    const getChats = async () => {
        const response = await fetch(`${API_URL}/messages`);
        if (!response.ok) {
            throw new Error('Failed to fetch chats');
        }
        return response.json();
    };

    const addChat = async (chat: { sender: string, reciver: string, content: string }) => {
        const response = await fetch(`${API_URL}/add/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chat),
        });
        if (!response.ok) {
            throw new Error('Failed to add chat');
        }
        return response.text();
    };

    const editChat = async (id: number, chat: { sender: string, reciver: string, content: string }) => {
        const response = await fetch(`${API_URL}/edit/chats/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chat),
        });
        if (!response.ok) {
            throw new Error('Failed to edit chat');
        }
        return response.text();
    };

    const deleteChat = async (id: number) => {
        const response = await fetch(`${API_URL}/delete/chats/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete chat');
        }
        return response.text();
    };


    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const data = await getChats();
            setChats(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddChat = async () => {
        try {
            await addChat(newChat);
            setNewChat({ sender: '', reciver: '', content: '' });
            loadChats();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditChat = async () => {
        if (currentChat) {
            try {
                await editChat(currentChat.id, currentChat);
                setCurrentChat(null);
                setEditMode(false);
                loadChats();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDeleteChat = async (id: number) => {
        try {
            await deleteChat(id);
            loadChats();
        } catch (error) {
            console.error(error);
        }
    };

    const startEditChat = (chat: ChatMessageModal) => {
        setCurrentChat(chat);
        setEditMode(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentChat((prevChat) => prevChat ? { ...prevChat, [name]: value } : null);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Chat Messages</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Sender"
                    name="sender"
                    value={editMode && currentChat ? currentChat.sender : newChat.sender}
                    onChange={(e) => editMode ? handleChange(e) : setNewChat({ ...newChat, sender: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Reciver"
                    name="reciver"
                    value={editMode && currentChat ? currentChat.reciver : newChat.reciver}
                    onChange={(e) => editMode ? handleChange(e) : setNewChat({ ...newChat, reciver: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Content"
                    name="content"
                    value={editMode && currentChat ? currentChat.content : newChat.content}
                    onChange={(e) => editMode ? handleChange(e) : setNewChat({ ...newChat, content: e.target.value })}
                />
                <div className="input-group-append">
                    {editMode ? (
                        <button className="btn btn-warning" onClick={handleEditChat}>Update Chat</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleAddChat}>Add Chat</button>
                    )}
                </div>
            </div>
            <table className="table table-striped table-hover table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Sender</th>
                        <th>Reciver</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {chats.map((chat) => (
                        <tr key={chat.id} className="table-row">
                            <td>{chat.sender}</td>
                            <td>{chat.reciver}</td>
                            <td>{chat.content}</td>
                            <td>
                                <button className="btn btn-info mr-2" onClick={() => startEditChat(chat)}>Edit</button>
                                <button className="btn dlt-btn" onClick={() => handleDeleteChat(chat.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChatList;
